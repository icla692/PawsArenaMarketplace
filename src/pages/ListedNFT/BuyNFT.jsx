import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { MARKETPLACE_CANISTER, MY_LEDGER_CANISTER_ID } from "../../Utils/constants";
import { Principal } from "@dfinity/principal";
import { ClipLoader } from "react-spinners";
import useFecth from "../../Utils/useFecth";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { idlFactory as marketIDL } from "../../Utils/markeptlace.did";
import { idlFactory as ICPDL } from "../../Utils/icptoken.did";
import { createActor } from "../../Utils/createActor";


const BuyNow = ({ nftid, nft_price, userP }) => {
  const [isLoading, setIsLoading] = useState(false);

  const authenticatedAgent = useAgent();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const { invalidateListings, invalidateUserNfts, invalidateUserBalance } =
    useFecth();
  const displayNotificationModal = async (_message, _type) => {
    setModalMessage(_message);
    setModalType(_type);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };


  const {user} = useIdentityKit()


  const { data: nftActor } = useQuery({
    queryKey: ["nftActor"],
  });

  
  
  const handleBuy = async () => {
    console.log("buying nft", nftid, nft_price, userP);
    try {
      if (!user || !authenticatedAgent) {
        displayNotificationModal("Log in first to purchase this NFT", "error");
        return;
      }

      let marketplaceActor = createActor(
        MARKETPLACE_CANISTER,
        marketIDL,
        authenticatedAgent
      );

      const IcpActor = createActor(
        MY_LEDGER_CANISTER_ID,
        ICPDL,
        authenticatedAgent
      );



      setIsLoading(true);
      //approve the marketplace to transfer funds on the user/s behalf
      let approveResults = await IcpActor.icrc2_approve({
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        amount: Number(nft_price) + 20000,
        expected_allowance: [],
        expires_at: [],
        spender: {
          owner: Principal.fromText(MARKETPLACE_CANISTER),
          subaccount: [],
        },
      });

      console.log("approve results :", approveResults);

      let res = await marketplaceActor.buy_nft(nftid);

      if (res.status == 200 && res.status_text == "Ok") {
        displayNotificationModal("NFT purchase successful", "success");
      } else {
        displayNotificationModal(res.error_text, "error");
      }
      console.log("buy results :", res);
    } catch (error) {
      console.log("erro in buying nft :", error);
    }
  };

  //8edb53debf13d254295dbcbf1a888b0723a7f853a181e91e9518ec871fb934a6
  return (
    <>
      {showModal && (
        <div
          className={`absolute top-10 z-50 text-xs  left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out ${
            modalType === "success"
              ? "bg-green-100 text-green-800 border border-green-300 rounded-lg p-1 animate-slide-in"
              : "bg-red-100 text-red-800 border border-red-300 rounded-lg p-1 animate-slide-in"
          }`}
        >
          <div className="modal-message">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}

      <button
        onClick={() => handleBuy()}
        className="flex bg-[#2E8DEE] w-full rounded-b-lg mt-4 font-bold text-white justify-center items-center p-2"
        //  disabled={nft_price != undefined && userP == userPrincipal}
      >
        {
          isLoading ? (
            <ClipLoader size={20} color="white" />
          ) : (
            // userP == userPrincipal ? (
            //   "View"
            // )

            "Buy now"
          )
          // ) :""
        }
      </button>
    </>
  );
};

export default BuyNow;
