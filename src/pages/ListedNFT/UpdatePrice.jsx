import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import useFecth from "../../Utils/useFecth";
import { createActor } from "../../Utils/createActor";
import { MARKETPLACE_CANISTER } from "../../Utils/constants";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { idlFactory as marketIDL } from "../../Utils/markeptlace.did";

const UpdatePrice = ({ nft, handleTrigger }) => {
  // console.log("update price :", nft);

  const [updateModal, setUpdateModal] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [updateloading, setUpdateLoading] = useState(false);
  const { invalidateListings } = useFecth();
  const [listbuttonLoading, setListButtonLoading] = useState(false);
  const authenticatedAgent = useAgent();
  const { user } = useIdentityKit();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"

  const displayNotificationModal = async (_message, _type) => {
    setModalMessage(_message);
    setModalType(_type);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const { mutateAsync: HandleUpdatePrice } = useMutation({
    mutationFn: (e) => handleUpdatePrice(e),
    onSuccess: async () => {
      invalidateListings();
    },
  });

  const handleUpdatePrice = async (e) => {
    e.preventDefault();

    let marketplaceActor = createActor(
      MARKETPLACE_CANISTER,
      marketIDL,
      authenticatedAgent
    );

    console.log("new price : ", newPrice,nft);

    if (!marketplaceActor) {
      displayNotificationModal("login first", "error");
      return;
    }

    if (!newPrice || newPrice == 0 || !nft) return;
    setListButtonLoading(true);
    setUpdateLoading(true);
    let res = await marketplaceActor?.update_nft_price(
      nft,
      parseInt(newPrice * 1e8)
    );

    if (res?.status == 200 && res?.status_text == "Ok") {
      displayNotificationModal("price updated successfully", "success");
    } else {
      displayNotificationModal(res?.error_text, "error");
    }

    // console.log("update price results :", res);
    handleTrigger();
    setListButtonLoading(false);
    setUpdateLoading(false);
  };

  return (
    <div className="flex flex-col gap-1 w-1/2">
      {showModal && (
        <div
          className={`absolute text-xs top-5 z-50  left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out ${
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
        className="flex bg-[#6fa0d1] w-full rounded-lg mt-4 font-bold text-white justify-center items-center p-2"
        onClick={() => setUpdateModal(true)}
      >
        Update
      </button>

      {updateModal && (
        <div className="fixed inset-0 p-4 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#252525] rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between ">
              <h2 className=" mb-4">Update NFT price</h2>
              <CgClose
                className="cursor-pointer"
                onClick={() => setUpdateModal(false)}
              />
            </div>

            <form onSubmit={HandleUpdatePrice}>
              <input
                type="number"
                id="price"
                value={newPrice}
                placeholder="enter new nft price"
                onChange={(e) => setNewPrice(e.target.value)}
                className=" border border-white text-black rounded p-1 w-full mb-4"
                required
              />
              <div className="flex justify-end">
                {updateloading ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-black rounded"
                  >
                    update
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

export default UpdatePrice;
