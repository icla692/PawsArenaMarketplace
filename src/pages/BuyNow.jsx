import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  MARKETPLACE_CANISTER,
  MY_LEDGER_CANISTER_ID,
} from "../Utils/constants";
import { Principal } from "@dfinity/principal";
import { ClipLoader } from "react-spinners";
import useFecth from "../Utils/useFecth";
import { useNavigate } from "react-router-dom";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { createActor } from "../Utils/createActor";
import { idlFactory as marketIDL } from "../Utils/markeptlace.did";
import { idlFactory as ICPDL } from "../Utils/icptoken.did";
import { useIdentity } from "@nfid/identitykit/react";
import { HttpAgent } from "@dfinity/agent";

const BuyNow = ({ nftid, nft_price, userP }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const { invalidateListings, invalidateUserNfts, invalidateUserBalance } =
    useFecth();

  const identity = useIdentity();
  const authenticatedAgent = HttpAgent.createSync({
    host: "https://ic0.app",
    identity: identity,
  });

  // const authenticatedAgent = useAgent();

  const { user } = useIdentityKit();

  const displayNotificationModal = async (_message, _type) => {
    setModalMessage(_message);
    setModalType(_type);
    setShowModal(true);
    // setTimeout(() => setShowModal(false), 3000);
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleBuy = async () => {
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
    try {
      if (!user || !authenticatedAgent) {
        displayNotificationModal("Log in first to purchase this NFT", "error");
        return;
      }

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

      if (approveResults.Err) {
        displayNotificationModal("error in approving ICP amount", "error");
        setIsLoading(false);
        return;
      }

      let res = await marketplaceActor.buy_nft(nftid);

      if (res.status == 200 && res.status_text == "Ok") {
        displayNotificationModal(
          "NFT purchase successful. Your NFT will be sent to your wallet shortly",
          "success"
        );
        setIsLoading(false);
        queryClient.setQueryData(["refreshData"], Math.random().toString());
      } else {
        displayNotificationModal(res.error_text, "error");
        setIsLoading(false);
        queryClient.setQueryData(["refreshData"], Math.random().toString());
      }
    } catch (error) {
      console.log("error in buying nft :", error);
    }
    setIsLoading(false);

    // navigate("/profile");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex w-1/2">
      {showModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
          <div
            className={`flex items-center flex-col text-white border p-2 rounded-lg ${
              modalType == "success" ? "bg-green-800" : "bg-red-500"
            }`}
          >
            <p>{modalMessage}</p>
            <button
              className="mt-2 w-[50px] bg-gray-200 text-gray-800 rounded px-1 py-1"
              onClick={handleCloseModal}
            >
              ok
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => handleBuy()}
        className="flex bg-[#2E8DEE] w-full rounded-lg mt-4 text-white justify-center items-center p-2"
      >
        {isLoading ? <ClipLoader size={20} color="white" /> : "Buy"}
      </button>
    </div>
  );
};

export default BuyNow;
