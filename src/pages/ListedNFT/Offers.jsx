import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { createActor } from "../../Utils/createActor";
import { MARKETPLACE_CANISTER } from "../../Utils/constants";
import { idlFactory as marketIDL } from "../../Utils/markeptlace.did";
import { useNavigate } from "react-router-dom";
const Offers = ({ offers, nft, nftOwner, handleTrigger }) => {
  const authenticatedAgent = useAgent();
  const { user } = useIdentityKit();
 const navigate = useNavigate()


  const [cancelModal, setCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [acceptModal, setAcceptModal] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"

  const displayNotificationModal = async (_message, _type) => {
    setModalMessage(_message);
    setModalType(_type);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const handleAccept = async (offer, nft) => {
    try {
      setAcceptLoading(true)
      let marketplaceActor = createActor(
        MARKETPLACE_CANISTER,
        marketIDL,
        authenticatedAgent
      );

      if (!marketplaceActor || !selectedOffer) {
        return;
      }

      console.log("selected offer :",selectedOffer);
      
      let res = await marketplaceActor?.accept_offer(selectedOffer.nft,selectedOffer.offer.offer_id);
      console.log("accept nft sale :", res);

      if (res.status == 200 && res.status_text == "Ok") {
        displayNotificationModal("NFT sold successfully", "success");
      } else {
        displayNotificationModal(res.error_text, "error");
      }
      
    } catch (error) {
      console.log("error in accepting offer :", error);
    }

    setAcceptLoading(false)
     setAcceptModal(false)
     navigate("/")
  };

  const handleCancel = async () => {
    try {
      setCancelLoading(true);

      let marketplaceActor = createActor(
        MARKETPLACE_CANISTER,
        marketIDL,
        authenticatedAgent
      );

      if (!marketplaceActor || !selectedOffer) {
        return;
      }
      console.log(selectedOffer);

      let res = await marketplaceActor?.cancel_offer(
        selectedOffer?.offer.offer_id,
        selectedOffer?.nft
      );
      if (res.status == 200 && res.status_text == "Ok") {
        displayNotificationModal("Offer cancelled successfully", "success");
      } else {
        displayNotificationModal(res.error_text, "error");
      }
      handleTrigger();
    } catch (error) {
      console.log("error in canceling offer :", error);
    }
    setCancelModal(false);
    setCancelLoading(false);
  };

  const convertExpiryDate = (expiry) => {
    const date = new Date(Number(expiry) / 1e6);
    return date.toLocaleString(); // Adjust options as needed for formatting
  };

  const shortenAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <div className="overflow-x-auto mb-10 bg-[#1B1B1B] p-2 rounded-lg border border-gray-400">
      {cancelModal && (
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

          <div className="bg-[#252525] rounded-lg flex flex-col items-center justify-center gap-1 shadow-lg p-6 w-96">
            <div className="flex  w-full justify-between ">
              <h2 className="text-xl font-bold mb-4">Cancel Offer</h2>
              <CgClose
                className="cursor-pointer"
                onClick={() => setCancelModal(false)}
              />
            </div>
            <span>Proceed to cancel offer?</span>
            {cancelLoading ? (
              <ClipLoader color="white" size={20} />
            ) : (
              <button
                onClick={() => handleCancel()}
                className="flex w-1/2 mt-2 justify-center items-center  bg-red-500 p-1 rounded-lg"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      )}

      {acceptModal && (
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

          <div className="bg-[#252525] rounded-lg flex flex-col items-center justify-center gap-1 shadow-lg p-6 w-96">
            <div className="flex  w-full justify-between ">
              <h2 className="text-xl font-bold mb-4">Accept Offer</h2>
              <CgClose
                className="cursor-pointer"
                onClick={() => setAcceptModal(false)}
              />
            </div>
            <span>Confirm offer?</span>
            {acceptLoading ? (
              <ClipLoader color="white" size={20} />
            ) : (
              <button
                onClick={() => handleAccept()}
                className="flex w-1/2 mt-2 justify-center items-center  bg-green-500 p-1 rounded-lg"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      )}

      <h3 className="text-lg">Offers</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {offers?.length >0 ?offers?.map((offer, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {shortenAddress(offer?.user?.toString())}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {Number(offer?.amount) / 1e8} ICP
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {convertExpiryDate(Number(offer?.expiry_date))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                <div className="flex flex-col items-center justify-center gap-1">
                  {user &&
                    user?.principal?.toString() == offer?.user?.toString() && (
                      <button
                        // onClick={() => handleCancel(offer, nft)}
                        onClick={() => {
                          setSelectedOffer({ offer, nft });
                          setCancelModal(true);
                        }}
                        className="flex  bg-red-500 p-1 rounded-lg"
                      >
                        Cancel
                      </button>
                    )}

                  {user && user?.principal?.toString() == nftOwner && (
                    <button
                      onClick={() => {
                        setSelectedOffer({ offer, nft });
                        setAcceptModal(true);
                      }}
                      className="flex bg-green-500 p-1 rounded-lg"
                    >
                      Accept
                    </button>
                  )}
                </div>
              </td>
            </tr>
          )
        ):
        <div className="flex w-full justify-center items-center text-xs mt-3"> No offers available</div>
      
      }
        </tbody>
      </table>
    </div>
  );
};

export default Offers;
