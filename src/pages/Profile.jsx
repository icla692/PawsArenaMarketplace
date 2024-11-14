import React, { useEffect, useState } from "react";
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
import { useIdentityKit } from "@nfid/identitykit/react";
import UpdatePrice from "./ListedNFT/UpdatePrice";
import { ClipLoader } from "react-spinners";

const style = {
  wrapper: `flex mt-[80px] h-screen bg-[#121212] flex-col w-full items-center p-4 text-white`,
  profileSection: `flex flex-col border rounded-lg w-full max-w-2xl mb-6`,
  addressContainer: `flex flex-row gap-2 items-center justify-center`,
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
  buttonsContainer: `absolute bottom-5 left-0 right-0 flex flex-row gap-2 justify-center items-center p-2 opacity-0 hover:opacity-100 `, // Hidden by default
};
const Profile = () => {
  const [userNFTList, setuserNFTList] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [trigger, setTrigger] = useState("");
  const { user } = useIdentityKit();
  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const { data: userIcpBalance } = useQuery({
    queryKey: ["userIcpBalance"],
  });

  const { data: marketplaceActor } = useQuery({
    queryKey: ["marketplaceActor"],
  });

  const { data: nftActor } = useQuery({
    queryKey: ["nftActor"],
  });

  const { data: IcpActor } = useQuery({ queryKey: ["IcpActor"] });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userPrincipal) return;
    let res = AccountIdentifier.fromPrincipal({
      principal: Principal.fromText(userPrincipal),
      subAccount: undefined,
    }).toHex();
    console.log(res);
    setUserAccount(res);
  }, [userPrincipal]);

  useEffect(() => {
    const fetchUserListedNFTS = async () => {
      try {
        let NFTArray = [];
        if (!userPrincipal || !marketplaceActor) return;
        let res = await marketplaceActor?.get_all_user_listed_nfts(
          Principal.fromText(userPrincipal)
        );

        console.log("heeee :", res.data[0]);

        if (
          res.status == 200 &&
          res.status_text == "Ok" &&
          res.data[0].length > 0
        ) {
          for (const data of res.data[0]) {
            if (data.isConfirmed === true) {
              NFTArray.push({
                nftid: data.nft_id,
                type: "Listed",
                canister_id: data.nft_canister,
                collectionName: Object.keys(data.nft_category)[0],
              });
            }
          }
        }

        let accIdentifier = AccountIdentifier.fromPrincipal({
          principal: Principal.fromText(userPrincipal),
          subAccount: undefined,
        }).toHex();

        let ownedTokens = await nftActor?.tokens(accIdentifier);

        let tokens = Array.from(ownedTokens?.ok);
        console.log("ahaha :", tokens);

        if (tokens && tokens.length > 0) {
          for (const data of tokens) {
            NFTArray.push({
              nftid: data,
              type: "Owned",
              canister_id: "rw7qm-eiaaa-aaaak-aaiqq-cai",
              collectionName: "Kitties",
            });
          }
        }
        setuserNFTList(NFTArray);
      } catch (error) {
        console.log("error in fetching user listed NFTs", error);
      }
    };

    fetchUserListedNFTS();
  }, [user, trigger]);

  const handleTrigger = (e) => setTrigger(Math.random());

  const handleCopyAddress = (userAddress) => {
    navigator.clipboard.writeText(userAddress);
    alert("Address copied to clipboard!");
  };

  const shortenAddress = (address, nom) => {
    return `${address.slice(0, nom)}...${address.slice(-7)}`;
  };

  // console.log("user here :",user?.principal?.toString());

  return (
    <>
      {user?.principal ? (
        <div className={style.wrapper}>
          <div className={style.profileSection}>
            <div className="flex rounded-t-md text-black font-bold px-4 bg-white">
              Overview
            </div>

            <div className="flex flex-col md:flex-row gap-2 w-full ">
              <div className=" flex flex-col px-4 py-2 w-full">
                <span className="font-bold">Wallet ID:</span>
                {user?.principal && (
                  <div className="flex flex-row gap-2  items-center">
                    <span className="flex flex-row justify-center items-center">
                      {shortenAddress(user?.principal?.toString(), 20)}
                    </span>

                    <AiOutlineCopy
                      size={25}
                      className="cursor-pointer border rounded-md p-1 hover:text-lg"
                      onClick={() =>
                        handleCopyAddress(user?.principal?.toText())
                      }
                    />
                  </div>
                )}
              </div>

              <div className=" flex flex-col px-4 py-2 w-full">
                <span className="font-bold">Balance:</span>
                <div className="flex flex-row gap-2  items-center">
                    <span className="flex justify-center items-center">
                      {userIcpBalance ? userIcpBalance : <ClipLoader size={15} color="white"  />} ICP
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col px-4 py-2 w-full">
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

                  <AiOutlineCopy
                    size={25}
                    className="cursor-pointer border rounded-md p-1 hover:text-lg"
                    onClick={() =>
                      handleCopyAddress(
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

            {/* <TransferICP /> */}

            {/* <div>{userIcpBalance && userIcpBalance} ICP</div> */}
          </div>

          {/* NFTs Section */}
          <div className={style.nftsSection}>
            <h2 className="text-xl font-semibold mb-4 text-center">My NFTs</h2>

            <div className={style.nftGrid}>
              {userNFTList && userNFTList?.length > 0 ? (
                userNFTList?.map((nft, index) => (
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
                          nft.type === "Listed" &&
                            "../marketplace/" +
                              nft.canister_id +
                              "/" +
                              nft.nftid
                          // : "../nft/" + nft.canister_id + "/" + nft.nftid
                        )
                      }
                      className={style.nftImg}
                    />
                    <div className={style.info}>
                      <div className={style.infoLeft}>
                        <div className={style.collectionName}>
                          {nft.collectionName}
                        </div>
                      </div>
                      <div className={style.infoRight}>
                        <div className={style.assetName}>#{nft.nftid} </div>
                      </div>
                    </div>
                    <div className={style.buttonsContainer}>
                      {nft.type == "Owned" ? (
                        <>
                          <ListNFT nft={nft} handleTrigger={handleTrigger} />
                          <TransferNFT nft={nft} handleTrigger={handleTrigger} />
                        </>
                      ) : (
                        <>
                          <UnlistUpdate
                            nft={computeExtTokenIdentifier(
                              nft.nftid,
                              nft.canister_id
                            )}
                            handleTrigger={handleTrigger}
                          />
                          <UpdatePrice
                            nft={computeExtTokenIdentifier(
                              nft.nftid,
                              nft.canister_id
                            )}
                            handleTrigger={handleTrigger}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className={style.profileSection}>
                  <p>No NFTs found.</p>
                  <p>Your NFTS will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Profile;
