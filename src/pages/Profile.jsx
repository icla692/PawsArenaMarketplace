import React, { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QRCodeCanvas as QRCode } from "qrcode.react";
import pawsarena from "../assets/pawsarena.png"; // Placeholder for profile picture
import { AiOutlineCopy } from "react-icons/ai"; // Import copy icon
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { computeExtTokenIdentifier } from "../Utils/tid";
import UnlistUpdate from "./Unlist";
import ListNFT from "../components/ListNFT";
import { useNavigate } from "react-router-dom";
import TransferNFT from "../components/TransferNFT";
import TransferICP from "../components/TransferICP";
import { useAgent, useIdentity, useIdentityKit } from "@nfid/identitykit/react";
import UpdatePrice from "./ListedNFT/UpdatePrice";
import { ClipLoader } from "react-spinners";
import SearchP from "./Profile/SearchP";
import NftDisplay from "./Profile/DisplayNFTs";
import ActivityTable from "./Profile/ActivityTable";
import { BsCopy } from "react-icons/bs";
import {
  copyToClipboard,
  MARKETPLACE_CANISTER,
  PAWS_ARENA_CANISTER,
  shortenAddress,
} from "../Utils/constants";
import Balance from "../components/Balance";
import { IoIosArrowBack } from "react-icons/io";
import { HttpAgent } from "@dfinity/agent";
import { idlFactory as marketIDL } from "../Utils/markeptlace.did";
import { createActor } from "../Utils/createActor";
import { idlFactory as PawsIDL } from "../Utils/paws.did";
const style = {
  wrapper: `flex mt-[80px] min-h-screen bg-[#121212] flex-col w-full items-center px-[1.2rem] md:px-[4.2rem] py-4 text-white`,
  profileSection: `flex flex-col border rounded-lg w-full max-w-3xl max-h-2xl mb-6 `,
  addressContainer: `flex flex-row gap-2 items-center justify-center mt-8`,
  address: `  mt-20 mb-2 text-center`,
  balance: `text-md text-[#8a939b] mb-4`,
  qrCodeContainer: `flex flex-col items-center`,
  qrCodeLabel: `text-md font-semibold mb-2`,
  nftsSection: `w-full  rounded-lg p-4`,
  nftGrid: `flex flex-wrap justify-center gap-1`, // Grid layout for NFTs

  nftCard: `bg-[#212121] w-[200px] mb-3 rounded-md  overflow-hidden relative`, // Added relative positioning
  nftImg: `w-[200px] h-48 ml-[3px] mt-[3px] rounded-t-md cursor-pointer object-cover`, // Removed redundant w-full
  info: `flex justify-between text-white drop-shadow-xl ml-2 mr-2`,
  infoLeft: `flex-0.6 flex-wrap`,
  assetName: `font-bold mt-1`, // Responsive text sizes
  buttonsContainer: `absolute bottom-6 left-0 right-0 flex flex-row  justify-center items-center`, // Hidden by default
};

const agent = new HttpAgent({ host: "https://ic0.app", retryTimes: 10 });
let marketplaceActor = createActor(MARKETPLACE_CANISTER, marketIDL, agent);
const nftActor = createActor(PAWS_ARENA_CANISTER, PawsIDL, agent);

const Profile = () => {
  const [collectedNFTS, setCollectedNFTS] = useState([]);
  const [listedNFTS, setListedNFTS] = useState([]);
  const [trigger, setTrigger] = useState("");

  const [selectedTab, setSelectedTab] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(
    "rw7qm-eiaaa-aaaak-aaiqq-cai"
  );

  const { user } = useIdentityKit();

  const identity = useIdentity();
  const authenticatedAgent = HttpAgent.createSync({
    host: "https://ic0.app",
    identity: identity,
  });

  const navigate = useNavigate();

  const { data: refreshData } = useQuery({
    queryKey: ["refreshData"],
  });

  const { data: bulkData } = useQuery({
    queryKey: ["bulkData"],
  });

  useEffect(() => {
    const fetchUserListedNFTS = async () => {
      try {
        let collected = [];
        let listed = [];

        if (!user || !marketplaceActor) return;

        let res = await marketplaceActor?.get_all_user_listed_nfts(
          user?.principal
        );

        console.log("heeee :", res.data[0]);

        if (
          res.status == 200 &&
          res.status_text == "Ok" &&
          res.data[0].length > 0
        ) {
          for (const data of res.data[0]) {
            if (data.isConfirmed === true) {
              listed.push({
                nftid: data.nft_id,
                type: "Listed",
                canister_id: data.nft_canister,
                collectionName: Object.keys(data.nft_category)[0],
              });
            }
          }
        }

        let accIdentifier = AccountIdentifier.fromPrincipal({
          principal: user.principal,
          subAccount: undefined,
        }).toHex();

        let ownedTokens = await nftActor?.tokens(accIdentifier);

        let tokens = Array.from(ownedTokens?.ok);

        if (tokens && tokens.length > 0) {
          for (const data of tokens) {
            collected.push({
              nftid: data,
              type: "Owned",
              canister_id: "rw7qm-eiaaa-aaaak-aaiqq-cai",
              collectionName: "Kitties",
            });
          }
        }
        setCollectedNFTS(collected);
        setListedNFTS(listed);
      } catch (error) {
        console.log("error in fetching user listed NFTs", error);
      }
    };

    fetchUserListedNFTS();
  }, [user, trigger, refreshData]);

  const handleTrigger = (e) => setTrigger(Math.random());

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const sortDisplayNFTs = useMemo(() => {
    console.log("here is the data :", selectedTab);

    if (selectedTab === "Activity") {
      //filter the bulk data to get the transaction for the user account

      let tokenListings = bulkData?.find((det) => det[0] == selectedCollection);

      console.log("token listings :", tokenListings);

      let filteredTransactions = tokenListings[1]?.transactions?.filter(
        (trans) =>
          trans?.buyer ==
            AccountIdentifier.fromPrincipal({
              principal: user?.principal,
              subAccount: undefined,
            }).toHex() || trans?.seller === user?.principal
      );

      console.log("transactions :", filteredTransactions);

      return (
        <ActivityTable
          transactions={filteredTransactions}
          selectedCollection={selectedCollection}
        />
      );
    }

    if (selectedTab === "Collected") {
      let myNfts = collectedNFTS?.map((nft, index) => (
        <div className={`${style.nftCard} ${style.nftCardHover}`}>
          <img
            src={`https://${
              nft.canister_id
            }.raw.icp0.io/?tokenid=${computeExtTokenIdentifier(
              nft.nftid,
              nft.canister_id
            )}&type=thumbnail`}
            alt=""
            onClick={() =>
              navigate(
                // nft.type === "Listed" &&
                "../marketplace/" + nft.canister_id + "/" + nft.nftid
                // : "../nft/" + nft.canister_id + "/" + nft.nftid
              )
            }
            className={style.nftImg}
          />
          <div className={style.info}>
            <div className={style.infoLeft}>
              <div className={style.collectionName}>{nft.collectionName}</div>
            </div>
            <div className={style.infoRight}>
              <div className={style.assetName}>#{Number(nft.nftid) + 1} </div>
            </div>
          </div>
          <div className={style.buttonsContainer}>
            {nft.type == "Owned" && (
              <>
                <ListNFT nft={nft} handleTrigger={handleTrigger} />
                <TransferNFT nft={nft} handleTrigger={handleTrigger} />
              </>
            )}
          </div>
        </div>
      ));
      return myNfts;
    }

    if (selectedTab === "Selling") {
      console.log(listedNFTS);

      let myNfts = listedNFTS?.map((nft, index) => (
        <div key={index} className={`${style.nftCard} ${style.nftCardHover}`}>
          <img
            src={`https://${
              nft.canister_id
            }.raw.icp0.io/?tokenid=${computeExtTokenIdentifier(
              nft.nftid,
              nft.canister_id
            )}&type=thumbnail`}
            alt=""
            onClick={() =>
              navigate(
                nft.type === "Listed" &&
                  "../marketplace/" + nft.canister_id + "/" + nft.nftid
              )
            }
            className={style.nftImg}
          />
          <div className={style.info}>
            <div className={style.infoLeft}>
              <div className={style.collectionName}>{nft.collectionName}</div>
            </div>
            <div className={style.infoRight}>
              <div className={style.assetName}>#{nft.nftid} </div>
            </div>
          </div>
          <div className={style.buttonsContainer}>
            {nft.type == "Owned" && (
              <>
                <ListNFT nft={nft} handleTrigger={handleTrigger} />
                <TransferNFT nft={nft} handleTrigger={handleTrigger} />
              </>
            )}
          </div>
        </div>
      ));

      return myNfts;
    }
  }, [selectedTab, refreshData]);

  return (
    <>
      {user?.principal ? (
        <div className={style.wrapper}>
          <div className="flex w-full">
            <button
              className="flex mb-1 border items-center rounded-md px-2 "
              onClick={() => navigate("/")}
            >
              <IoIosArrowBack />
              Back to Collections
            </button>
          </div>
          <div className={style.profileSection}>
            <div className="flex rounded-t-md text-black font-bold px-4 bg-white">
              Overview
            </div>
            <div className="flex flex-col justify-center md:flex-row gap-2 w-full ">
              <div className=" flex flex-col px-4 py-2 md:py-4 w-full">
                <span className="font-bold">Wallet ID:</span>
                {user?.principal && (
                  <div className="flex flex-row gap-2  items-center">
                    <span className="flex flex-row justify-center  items-center">
                      {shortenAddress(user?.principal?.toString(), 20)}
                    </span>
                    <BsCopy
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(user?.principal?.toText())}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col px-4 py-1  md:py-4 w-full">
                <Balance />
              </div>
            </div>

            <div className=" flex flex-col px-4 py-1  md:py-4 w-full">
              <span className="font-bold">Account Identifier:</span>

              {user?.principal ? (
                <div className="flex flex-row gap-2  items-center">
                  <span>
                    {shortenAddress(
                      AccountIdentifier.fromPrincipal({
                        principal: user.principal,
                      })?.toHex(),
                      18
                    )}
                  </span>

                  <BsCopy
                    className="cursor-pointer"
                    onClick={() =>
                      copyToClipboard(
                        AccountIdentifier.fromPrincipal({
                          principal: user.principal,
                        })?.toHex()
                      )
                    }
                  />
                </div>
              ) : (
                <ClipLoader />
              )}
            </div>
          </div>

          <SearchP selectedTab={selectedTab} handleTabClick={handleTabClick} />
          <NftDisplay results={sortDisplayNFTs} />
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Profile;
