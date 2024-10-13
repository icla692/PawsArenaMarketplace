import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import useFecth from "../Utils/useFecth";

const UnlistUpdate = ({nft}) => {
  console.log("nft id :", nft);

  const [newPrice, setNewPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [buttonLoading, setButtonLoading] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"

  const {invalidateListings,invalidateUserNfts} = useFecth()



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

  const { data: IcpActor } = useQuery({
    queryKey: ["IcpActor"],
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


  const { mutateAsync: HandleList } = useMutation({
    mutationFn: () => handleUnlist(),
    onSuccess: async () => {
       invalidateListings()
       invalidateUserNfts()
       setButtonLoading(false);
    },
  });







  const handleUnlist = async () => {
    if (!nft) return;
    setButtonLoading(true);

    try {
      let res = await marketplaceActor.un_list_nft(nft);
     
      if (res.status == 200 && res.status_text == "Ok") {
        displayNotificationModal("NFT unlisted successfully", "success");
      } else {
        displayNotificationModal(res.error_text, "error");
      }
      console.log("unlisting res :", res);
    } catch (error) {
      console.log("error in unlisting token :", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log("new price : ", newPrice);

  //  if(!window.confirm("Update the price of the nft")) return
  //  setIsLoading(true)
  //   let res = await marketplaceActor.update_nft_price(
  //     nftid.nftid,
  //     parseInt(newPrice * 1e8)
  //   );
  //   setIsLoading(false)
  // };

  return (
    <div>
      <div className="flex flex-row ">
        <button
          className="flex w-full bg-[#2E8DEE] mt-4 font-bold text-white justify-center items-center p-2"
          onClick={() => setIsModalOpen(true)}
        >
          Unlist
        </button>
        {/* <button
            className="flex bg-gray-300 text-gray-700 border border-gray-300 p-1 rounded-md "
            onClick={() => setIsModalOpen(true)}
          >
            Update
          </button> */}
      </div>
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
              <h2 className=" mb-4">Unlist NFT</h2>
              <CgClose
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <span>Remove NFT from the marketplace?</span>

            <div className="flex justify-end mt-3">
              {buttonLoading ? (
                <ClipLoader color="white" size={20} />
              ) : (
                <button
                  onClick={HandleList}
                  className="px-4 py-2 bg-white text-black rounded"
                >
                  Unlist
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnlistUpdate;
