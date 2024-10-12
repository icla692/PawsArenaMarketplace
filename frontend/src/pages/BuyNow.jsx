import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { MARKETPLACE_CANISTER } from "../Utils/constants";
import { Principal } from "@dfinity/principal";
import { ClipLoader } from "react-spinners";
import useFecth from "../Utils/useFecth";

const BuyNow = ({ nftid, nft_price, userP }) => {
 
  const [isLoading, setIsLoading] = useState(false);

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

  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const { data: userIcpBalance } = useQuery({
    queryKey: ["userIcpBalance"],
  });

  const { data: allListings } = useQuery({
    queryKey: ["allListings"],
  });

  const { data: userNFTS } = useQuery({
    queryKey: ["userNFTS"],
  });

  const { data: nftActor } = useQuery({
    queryKey: ["nftActor"],
  });

  const { data: marketplaceActor } = useQuery({
    queryKey: ["marketplaceActor"],
  });

  const { data: IcpActor } = useQuery({
    queryKey: ["IcpActor"],
  });

  const { mutateAsync: HandleBuy } = useMutation({
    mutationFn: () => handleBuy(),
    onSuccess: async () => {
      invalidateListings();
      invalidateUserNfts();
      invalidateUserBalance();
      setIsLoading(false);
    },
  });

  const handleBuy = async () => {
    try {
      if (!marketplaceActor) return;
      // if (!window.confirm("buy this nft?")) return;

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
        onClick={() => HandleBuy()}
        className="flex w-full bg-[#2E8DEE] mt-4 font-bold text-white justify-center items-center p-2"
        disabled={userP == userPrincipal}
      >
        {isLoading ? (
          <ClipLoader size={20} color="white" />
        ) : userP == userPrincipal ? (
          "View"
        ) : (
          "Buy"
        )}
      </button>
    </>
  );
};

export default BuyNow;
