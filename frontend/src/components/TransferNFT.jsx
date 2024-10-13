import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useFecth from "../Utils/useFecth";
import { ClipLoader } from "react-spinners";
import { CgClose } from "react-icons/cg";
import { computeExtTokenIdentifier } from "../Utils/tid";
import { MARKETPLACE_CANISTER } from "../Utils/constants";
import { Principal } from "@dfinity/principal";

const TransferNFT = ({ nft }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen,setPreviewOpen] = useState(false)
  const [recipient, setRecipient] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);


  const {invalidateListings} = useFecth()

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
       invalidateListings()
      setButtonLoading(false);
    },
  });


  const handleTransfer = async (e)=>{
    e.preventDefault()
    setButtonLoading(true);

    console.log("nft :",nft);
    
    if(!nftActor || !nft) displayNotificationModal("please login first","success")
    //get the token identifier of the nft
let tokenIdentifier = computeExtTokenIdentifier(Number(nft.nftid),nft.canister_id)

//should create an ft canister instance but for now use the ic kitties

let transferResults = await nftActor.transfer({
    amount: parseInt(1),
        from: { principal: Principal.fromText(userPrincipal) }, 
        memo: [],
        notify: false,
        subaccount: [],
        to: { address: recipient },
        token: tokenIdentifier,
})

if (transferResults.ok) {
  displayNotificationModal("NFT transfer successful", "success");
} else {
  displayNotificationModal(transferResults.err, "error");
}






    console.log("transfer success",transferResults);
    

  }

  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const { data: nftActor } = useQuery({
    queryKey: ["nftActor"],
  });

  const { data: marketplaceActor } = useQuery({
    queryKey: ["marketplaceActor"],
  });

  return (
    <div className="relative flex-row gap-1 flex w-full bg-[#2E8DEE] font-bold text-white justify-center items-center p-2 ">
      <button onClick={() => setIsModalOpen(true)}>Transfer</button>
     
     
     
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
              <h2 className="text-xl font-bold mb-4">Transfer NFT</h2>
              <CgClose
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <form onSubmit={(HandleTransfer)}>
              <input
                type="text"
                id="recipient"
                placeholder="enter recipient account"
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
