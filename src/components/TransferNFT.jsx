import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useFecth from "../Utils/useFecth";
import { ClipLoader } from "react-spinners";
import { CgClose } from "react-icons/cg";
import { computeExtTokenIdentifier } from "../Utils/tid";
import {
  isPrincipalOrAccount,
  MARKETPLACE_CANISTER,
  PAWS_ARENA_CANISTER,
} from "../Utils/constants";
import { Principal } from "@dfinity/principal";
import { createActor } from "../Utils/createActor";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { idlFactory as PawsIDL } from "../Utils/paws.did";
const TransferNFT = ({ nft, handleTrigger }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const { invalidateListings } = useFecth();
  const authenticatedAgent = useAgent();
  const { user } = useIdentityKit();

  const queryClient = useQueryClient();
  //modals for the notification popup
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"

  //function to toggle the notification on and off display
  const displayNotificationModal = async (_message, _type) => {
    setModalMessage(_message);
    setModalType(_type);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const { mutateAsync: HandleTransfer } = useMutation({
    mutationFn: (e) => handleTransfer(e),
    onSuccess: async () => {
      invalidateListings();
      setButtonLoading(false);
    },
  });

  const handleTransfer = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    console.log("nft :", nft);

    let nftActor = createActor(
      PAWS_ARENA_CANISTER,
      PawsIDL,
      authenticatedAgent
    );

    if (!nftActor || !nft)
      displayNotificationModal("please login first", "success");
    //get the token identifier of the nft
    let tokenIdentifier = computeExtTokenIdentifier(
      Number(nft.nftid),
      nft.canister_id
    );

    //check if the recipient is a valid principal or account identifier

    let isPrincipal = isPrincipalOrAccount(recipient);

    if (isPrincipal === "unkown") {
      alert("invalid recipient");
      return;
    }

    let _reciever =
      isPrincipal === "pa"
        ? { principal: Principal.fromText(recipient) }
        : { address: recipient };

    try {
      let transferResults = await nftActor.transfer({
        amount: parseInt(1),
        from: { principal: user.principal },
        memo: [],
        notify: false,
        subaccount: [],
        to: _reciever,
        token: tokenIdentifier,
      });

      if (transferResults.ok) {
        displayNotificationModal("NFT transfer successful", "success");
      } else {
        displayNotificationModal(transferResults.err, "error");
      }

      console.log("transfer success", transferResults);
    } catch (error) {
      console.log("error in transfering nft :", error);
    }

    queryClient.setQueryData(["refreshData"], Math.random());

    setButtonLoading(false);
    // handleTrigger();
  };

  return (
    <div className="relative flex-row gap-1 flex w-full text-sm  text-white justify-center items-center p-2 ">
      <button
        className="flex border bg-slate-300 w-full mt-4  text-black justify-center items-center p-1"
        onClick={() => setIsModalOpen(true)}
      >
        Transfer
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          {showModal && (
            <div
              className={`absolute top-10 text-xs z-50  left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out ${
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
          <div className="bg-[#252525] rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between ">
              <h2 className="text-sm mb-4">Transfer NFT</h2>
              <CgClose
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <form onSubmit={handleTransfer}>
              <input
                type="text"
                id="recipient"
                placeholder="enter receiver account or principal address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className=" border border-white text-black rounded p-1 w-full mb-4"
                required
              />
              <div className="flex justify-end">
                {buttonLoading ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-black rounded"
                  >
                    Transfer
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferNFT;
