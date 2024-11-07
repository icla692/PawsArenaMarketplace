import { HttpAgent } from "@dfinity/agent";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { createActor } from "../../Utils/createActor";
import {
  getUnixTimestampInNanoseconds,
  MARKETPLACE_CANISTER,
  MY_LEDGER_CANISTER_ID,
} from "../../Utils/constants";
import { idlFactory as marketIDL } from "../../Utils/markeptlace.did";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { idlFactory as ICPDL } from "../../Utils/icptoken.did";
import { Principal } from "@dfinity/principal";
const MakeOffer = ({ nftid, nft_price, handleTrigger }) => {
  const [isOfferModalOpen, setOfferModalOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"

  const { user } = useIdentityKit();

  const authenticatedAgent = useAgent({ retryTimes: 2 });

  const displayNotificationModal = async (_message, _type) => {
    setModalMessage(_message);
    setModalType(_type);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const handleMakeOffer = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    try {
      if (!user || !authenticatedAgent) {
        return;
      }

      let marketplaceActor = createActor(
        MARKETPLACE_CANISTER,
        marketIDL,
        authenticatedAgent
      );

      const IcpActor = createActor(MY_LEDGER_CANISTER_ID, ICPDL, authenticatedAgent);

      //apprive the marketplace to get the funds before placing an order
      let approveResults = await IcpActor.icrc2_approve({
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        amount: Number(offerAmount * 1e8) + 20000,
        expected_allowance: [],
        expires_at: [],
        spender: {
          owner: Principal.fromText(MARKETPLACE_CANISTER),
          subaccount: [],
        },
      });

      console.log("apprive results :",approveResults);
      

      let _days = getUnixTimestampInNanoseconds(expiryDate);

      let res = await marketplaceActor?.place_offer_on_nft(
        nftid,
        Number(offerAmount * 1e8),
        _days,
      );

      if (res.status == 200 && res.status_text == "Ok") {
        displayNotificationModal("Offer place successfully", "success");
      } else {
        displayNotificationModal(res.error_text, "error");
      }
      handleTrigger();

      console.log("offer results here:", res);
    } catch (error) {
      console.log("error in placing offer :", error);
    }

  };

  const { mutateAsync: HandleMakeOffer } = useMutation({
    mutationFn: (e) => handleMakeOffer(e),
    onSuccess: async () => {
      setButtonLoading(false);
    },
  });

  return (
    <div className="flex bg-[#2c2d2e] w-1/2 rounded-lg mt-4 font-bold text-white justify-center items-center p-2 cursor-pointer">
      <button onClick={() => setOfferModalOpen(true)}>Make Offer</button>

      {isOfferModalOpen && (
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
              <h2 className="text-xl font-bold mb-4">Make Offer</h2>
              <CgClose
                className="cursor-pointer"
                onClick={() => setOfferModalOpen(false)}
              />
            </div>

            <form onSubmit={HandleMakeOffer}>
              <label className="block mb-2" htmlFor="price">
                Enter Offer amount
              </label>
              <input
                type="number"
                id="price"
                placeholder="enter offer amount"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className=" border border-white text-sm text-black rounded p-1 w-full mb-4"
                required
              />
              <input
                type="number"
                id="price"
                value={expiryDate}
                placeholder="enter number of days"
                onChange={(e) => setExpiryDate(e.target.value)}
                className=" border border-white text-sm text-black rounded p-1 w-full mb-4"
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
                    Place Offer
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

export default MakeOffer;
