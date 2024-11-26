import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { computeExtTokenIdentifier } from "../../Utils/tid";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../Utils/paws.did";
import {
  MARKETPLACE_CANISTER,
  PAWS_ARENA_CANISTER,
  traitsData,
} from "../../Utils/constants";
import { idlFactory as marketIDL } from "../../Utils/markeptlace.did";
import { createActor } from "../../Utils/createActor";
import { IoEyeSharp } from "react-icons/io5";
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

const style = {
  wrapper: `flex gap-3 mt-[80px] flex-col md:flex-row justify-center bg-[#121212] h-screen p-4 text-white`,
  leftwrapper: `flex flex-col  items-center md:items-start  mb-4 md:mb-0`,
  rightwrapper: `flex flex-col   h-full`,
  nftImg: ` rounded-md ml-3 w-auto cursor-pointer`, // Responsive image height
};

const ListedNFTDetails = () => {
  const { colID, nftID } = useParams();
  const [nftDetails, setNFTDetails] = useState(null);
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

  // const { data: nftActor } = useQuery({
  //   queryKey: ["nftActor"],
  // });

  const agent = useMemo(
    () => new HttpAgent({ host: "https://ic0.app", retryTimes: 10 }),
    []
  );
  const nativeNftActor = useMemo(
    () => createActor(colID, idlFactory, agent),
    [colID, agent]
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
  const [isListed, setIsListed] = useState(false);

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

      let tokenIdentifier = computeExtTokenIdentifier(nftID, colID);

      let saveRes = await marketActor.save_nft_view(tokenIdentifier);
      let _views = await marketActor.get_nft_views(tokenIdentifier);
      console.log("save view res :", saveRes, _views);

      if (_views.status == 200 && _views.status_text == "Ok") {
        setNftViews(Number(_views.data[0]));
      }
    };

    saveView();
  }, [nftID]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!colID || !nftID) return;
        console.log("ddd");

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

        console.log("ccc :", myTokens);
        if (markTrans.data.length > 0) {
          setSaleHistory([...fil, ...markTrans?.data[0]]);
        } else {
          setSaleHistory([...fil]);
        }

        if (nftInfo?.length > 0) {
          console.log("nft info :", nftInfo);

          //  if the nft is not listed
          if (nftInfo[1].hasOwnProperty("nonfungible")) {
            //get the owner of the nft
            //dont display the buy and make offer buttons
            console.log("nft not listed");
            let _owner = await nftActor.bearer(tokenIdentifier);
            console.log("owner :", _owner);
          }

          //if the nft is listed on our marketplace
          if (nftInfo[1].inhouse_sale) {
            //fetch all the details from the marketplace canister
            let details = await marketActor?.get_listed_nft_details(
              tokenIdentifier
            );

            if (details.status === 200 && details.status_text === "Ok") {
              setNFTDetails(details.data[0]);
            }
          }

          // {
          //   console.log("hahahhahh2")

          //   //fetch the details from the nft canister itself
          //   setNFTDetails({
          //     seller_principal: nftInfo[1].seller?.toString(),
          //     nft_price: nftInfo[1]?.price,
          //     token_identifier: computeExtTokenIdentifier(nftInfo[0], colID),
          //   });
          // }
        } else {
          //handle if the nft is not found in the collections fetched from the canister
          console.log("hahahhahh3");
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

  const getColorFromId = (id) => {
    for (const traitData of traitsData) {
      const traitName =
        traitData.trait === "Background"
          ? "bg"
          : traitData.trait.replace(/\s+/g, "").toLowerCase();
      for (let index = 0; index < traitData.colors.length; index++) {
        const colorId = `${traitName}${index + 1}`;
        if (colorId === id) {
          return [traitData.trait, traitData.colors[index]];
        }
      }
    }
    // return null;
  };

  // console.log("traits heeee :",getColorFromId("bg1"))

  const handleUnlist = async (e) => {
    e.preventDefault();
    if (!nftDetails) return;
    setButtonLoading(true);

    try {
      let res = await marketplaceActor.un_list_nft(nftDetails.token_identifier);
      console.log("unlisting res :", res);

      if (res.status == 200 && res.status_text == "Ok") {
        displayNotificationModal("NFT unlisted successfully", "success");
      } else {
        displayNotificationModal(res.error_text[0], "error");
      }
    } catch (error) {
      console.log("error in unlisting token :", error);
    }
  };

  const handleUpdatePrice = async (e) => {
    e.preventDefault();

    console.log("new price : ", newPrice);

    if (!newPrice || newPrice == 0) return;
    setListButtonLoading(true);
    let res = await marketplaceActor?.update_nft_price(
      nftDetails.token_identifier,
      parseInt(newPrice * 1e8)
    );

    if (res.status == 200 && res.status_text == "Ok") {
      displayNotificationModal("price updated successfully", "success");
    } else {
      displayNotificationModal(res.error_text, "error");
    }

    console.log("update price results :", res);

    setListButtonLoading(false);
  };

  return (
    <div className="flex w-full min-h-screen gap-4 flex-col text-white mr-6 pr-6 md:px-20 mt-[100px]">
      <div className="flex w-full h-full flex-col md:flex-row gap-2 mx-4">
        <div className="flex flex-col gap-4 w-full md:w-1/2 h-full md:items-start  mb-4 md:mb-0">
          <div className="rounded-lg p-1 w-full flex border border-gray-400 pt-3 flex-col">
            <img
              src={`https://${colID}.raw.icp0.io/?tokenid=${computeExtTokenIdentifier(
                nftID,
                colID
              )}&type=thumbnail`}
              alt=""
              className={style.nftImg}
            />
          </div>

          <div className="flex flex-col w-full items-start">
            <h1 className="font-bold">Traits</h1>
            <div>
              {nftTraits ? (
                nftTraits?.map((trait, index) => (
                  <div key={index}>
                    {trait[0]} : {trait[1]}
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
              {/*  corded nft collection */}
              {nftDetails && "ICKitties"} # {nftID}
            </h1>
            <span>Owned by {nftDetails?.seller_principal?.toString()}</span>
            <div className="flex gap-1  text-sm items-center">
              <span>{<IoEyeSharp size={25} color="gray" />}</span>
              <span>{nftViews && nftViews} views</span>
            </div>

            {nftDetails?.nft_price && (
              <div className="flex flex-col  xs:px-3 md:px-0 gap-4 w-full">
                <div className="flex  flex-col w-full gap-1  bg-[#1B1B1B] border border-gray-400 p-2 rounded-lg">
                  <h3>Current Price</h3>
                  <div className="flex flex-row gap-1">
                    <img src={ICPLogo} height="7px" width="15px" />

                    <span className="flex text-lg">
                      {nftDetails &&
                        (Number(nftDetails?.nft_price) / 1e8).toFixed(2)}
                    </span>
                  </div>

                  {contentLoading ? (
                    <div className="flex w-full justify-center items-center">
                      <ClipLoader size={20} color="white" />
                    </div>
                  ) : user &&
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

                <SaleHistory history={saleHistory} />
                <Offers
                  offers={nftDetails?.offers}
                  nft={nftDetails?.token_identifier}
                  nftOwner={nftDetails?.seller_principal?.toString()}
                  handleTrigger={handleTrigger}
                />
              </div>
            )}
          </div>
        </div>
      </div>

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
