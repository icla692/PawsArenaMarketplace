import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { computeExtTokenIdentifier } from "../../Utils/tid";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../Utils/paws.did";
import {
  copyToClipboard,
  getColorFromId,
  MARKETPLACE_CANISTER,
  PAWS_ARENA_CANISTER,
  shortenAddress,
  traitsData,
} from "../../Utils/constants";
import { idlFactory as marketIDL } from "../../Utils/markeptlace.did";
import { createActor } from "../../Utils/createActor";
import { IoCopy, IoEyeSharp } from "react-icons/io5";
import MakeOffer from "./MakeOffer";
// import BuyNow from "./BuyNFT";
import useFecth from "../../Utils/useFecth";
import SaleHistory from "./SaleHistory";
import Offers from "./Offers";
import MoreNfts from "./MoreNfts";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import UnlistUpdate from "../Unlist";
import { useIdentityKit } from "@nfid/identitykit/react";
import UpdatePrice from "./UpdatePrice";
import { idlFactory as PawsIDL } from "../../Utils/paws.did";
import ICPLogo from "../../assets/icplogo.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BuyNow from "../BuyNow";
import genes from "../../genes";
import { BsCopy } from "react-icons/bs";

const ListedNFTDetails = () => {
  const { colID, nftID } = useParams();
  const [nftDetails, setNFTDetails] = useState({});
  const [newPrice, setNewPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [listbuttonLoading, setListButtonLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

  const [listTrigger, setTrigger] = useState("");
  const navigate = useNavigate();

  const { user } = useIdentityKit();

  const { data: marketplaceActor } = useQuery({
    queryKey: ["marketplaceActor"],
  });

  const { data: myTokens, isLoading: dataLoading } = useQuery({
    queryKey: ["myTokens"],
  });

  const { data: bulkData } = useQuery({
    queryKey: ["bulkData"],
  });

  const agent = useMemo(
    () => new HttpAgent({ host: "https://ic0.app", retryTimes: 10 }),
    []
  );

  const marketActor = useMemo(
    () => createActor(MARKETPLACE_CANISTER, marketIDL, agent),
    [agent]
  );

  const [saleHistory, setSaleHistory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const [nftTraits, setNftTraits] = useState(null);
  const [nftViews, setNftViews] = useState(null);
  const { invalidateListings } = useFecth();

  const displayNotificationModal = async (_message, _type) => {
    setModalMessage(_message);
    setModalType(_type);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const handleTrigger = (e) => setTrigger(Math.random());

  const tokenIdentifier = useMemo(() => {
    if (!colID || !nftID) return null;
    return computeExtTokenIdentifier(nftID, colID);
  }, [colID, nftID]);

  const nftInfo = useMemo(() => {
    return myTokens?.find((nft) => nft[0] == nftID);
  }, [myTokens, nftID]);

  //store the nft view in the database
  useEffect(() => {
    const saveView = async () => {
      if (!nftID) return;
      try {
        let tokenIdentifier = computeExtTokenIdentifier(nftID, colID);
        console.log("token identifier :", tokenIdentifier);
        let saveRes = await marketActor.save_nft_view(tokenIdentifier);
        let _views = await marketActor.get_nft_views(tokenIdentifier);

        if (_views.status == 200 && _views.status_text == "Ok") {
          setNftViews(Number(_views.data[0]));
        }
      } catch (error) {
        console.log("error in saving and retrieving total nft view :", error);
      }
    };

    saveView();
  }, [nftID]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!colID || !nftID) return;
        setContentLoading(true);
        // let tokenIdentifier = computeExtTokenIdentifier(nftID, colID);
        // let nftInfo = myTokens?.filter((nft) => nft[0] == nftID);
        let nftActor = createActor(PAWS_ARENA_CANISTER, PawsIDL, agent);
        // const nftInfo = myTokens?.find((nft) => nft[0] == nftID);
        let markTrans = await marketActor?.get_nft_sale_history(
          tokenIdentifier
        );
        let tokenListings = bulkData?.find((det) => det[0] == colID);
        let fil = tokenListings[1]?.transactions?.filter(
          (tran) => tran?.token == tokenIdentifier
        );

        setSaleHistory(
          markTrans.data.length > 0 ? [...fil, ...markTrans.data[0]] : fil
        );

        if (nftInfo?.length > 0) {
          console.log("nft info :", nftInfo);

          //  if the nft is not listed
          if (nftInfo[1].hasOwnProperty("nonfungible")) {
            //get the owner of the nft
            //dont display the buy and make offer buttons
            let _owner = await nftActor.bearer(tokenIdentifier);

            setNFTDetails({
              listed: false,
              tokenIdentifier: computeExtTokenIdentifier(nftID, colID),
              seller_principal: _owner?.ok,
            });
          } else if (nftInfo[1].inhouse_sale) {
            //fetch all the details from the marketplace canister
            let details = await marketActor?.get_listed_nft_details(
              tokenIdentifier
            );
            console.log("inhouse listed nft :", details);
            if (details.status === 200 && details.status_text === "Ok") {
              setNFTDetails({ ...details.data[0], listed: true });
            }
          }
        } else {
          //handle if the nft is not found in the collections fetched from the canister
        }

        const _traits = genes[nftID];

        let DD = [];

        for (const _id of _traits) {
          const res = getColorFromId(_id);
          if (res !== undefined) {
            DD.push(res);
          }
        }

        setNftTraits(DD);

        console.log("traits here :", _traits, DD);
      } catch (error) {
        console.log("error in fetching details :", error);
      }

      setContentLoading(false);
    };

    fetchDetails();
  }, [colID, nftID, listTrigger]);

  return (
    <div className="flex w-full min-h-screen gap-4 flex-col items-center  text-white px-2 md:px-20 mt-[100px]">
      {contentLoading ? (
        <div className="w-full flex justify-center h-screen items-center">
          <ClipLoader color="white" size={25} />
        </div>
      ) : (
        <div className="flex w-full h-full flex-col md:flex-row gap-2 mx-4">
          <div className="flex flex-col gap-4 w-full md:w-1/2 h-full md:items-start  mb-4 md:mb-0">
            <div className="rounded-lg p-1 w-full flex border border-gray-400 pt-3 flex-col">
              <img
                src={`https://${colID}.raw.icp0.io/?tokenid=${computeExtTokenIdentifier(
                  nftID,
                  colID
                )}&type=thumbnail`}
                alt=""
                className="rounded-md ml-3 w-auto cursor-pointer"
              />
            </div>

            <div className="hidden md:flex flex-col w-full items-start">
              <h1 className="font-bold">Traits</h1>
              <div className="flex flex-wrap w-full">
                {nftTraits ? (
                  nftTraits.map((trait, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-1 w-full md:w-1/2 lg:w-1/3"
                    >
                      <span className="font-bold">{trait[0]}</span>
                      <span>{trait[1]}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-sm">Coming Soon ...</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex  justify flex-col w-full md:w-1/2 ">
            <div className="flex flex-col gap-3">
              <h1 className="text-[30px] font-bold">
                {nftDetails && "ICKitties"} # {nftID}
              </h1>

              <div className="flex items-center gap-2">
                <span>
                  Owned by{" "}
                  {shortenAddress(nftDetails?.seller_principal?.toString())}
                </span>

                <BsCopy
                  color="white"
                  className="cursor-pointer"
                  onClick={() =>
                    copyToClipboard(nftDetails?.seller_principal?.toString())
                  }
                />
              </div>

              <div className="flex gap-1  text-sm items-center">
                <span>{<IoEyeSharp size={25} color="gray" />}</span>
                <span>{nftViews && nftViews} views</span>
              </div>

              {/* {nftDetails?.nft_price && ( */}
              <div className="flex flex-col  xs:px-3 md:px-0 gap-4 w-full">
                {nftDetails?.listed && (
                  <div className="flex  flex-col w-full gap-1  bg-[#1B1B1B] border border-gray-400 p-2 rounded-lg">
                    <h3>Current Price</h3>
                    <div className="flex flex-row gap-1">
                      <img src={ICPLogo} height="7px" width="15px" />

                      <span className="flex text-lg">
                        {nftDetails &&
                          (Number(nftDetails?.nft_price) / 1e8).toFixed(2)}
                      </span>
                    </div>
                    {user &&
                    user.principal.toString() ===
                      nftDetails?.seller_principal?.toString() ? (
                      <div className="flex flex-row gap-4 justify-center items-center w-full">
                        <UnlistUpdate nft={nftDetails?.token_identifier} />
                        <UpdatePrice
                          nft={nftDetails?.token_identifier}
                          handleTrigger={handleTrigger}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-row gap-4 w-full">
                        <BuyNow
                          nft_price={Number(nftDetails?.nft_price)}
                          nftid={nftDetails?.token_identifier}
                        />
                        <MakeOffer
                          nft_price={Number(nftDetails?.nft_price)}
                          nftid={nftDetails?.token_identifier}
                          handleTrigger={handleTrigger}
                        />
                      </div>
                    )}
                  </div>
                )}

                <SaleHistory history={saleHistory} />

                <Offers
                  offers={nftDetails?.offers}
                  nft={nftDetails?.token_identifier}
                  nftOwner={nftDetails?.seller_principal?.toString()}
                  handleTrigger={handleTrigger}
                />
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      )}
      {nftDetails && (
        <MoreNfts
          nftDetails={nftDetails}
          collectionID={colID}
          nftID={nftID}
          nftPrice={Number(nftDetails?.nft_price) / 1e8}
        />
      )}
    </div>
  );
};

export default ListedNFTDetails;
