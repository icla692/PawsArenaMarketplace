import { Principal } from "@dfinity/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { computeExtTokenIdentifier } from "../Utils/tid";
import { MARKETPLACE_CANISTER } from "../Utils/constants";
import useFecth from "../Utils/useFecth";
import { useAgent } from "@nfid/identitykit/react";
import { createActor } from "../Utils/createActor";
import { idlFactory as marketIDL } from "../Utils/markeptlace.did";
const ListNFT = ({ nft }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);


const {invalidateListings} = useFecth()
const authenticatedAgent = useAgent()

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"

  const displayNotificationModal = async (_message, _type) => {
    setModalMessage(_message);
    setModalType(_type);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const { data: nftActor } = useQuery({
    queryKey: ["nftActor"],
  });

 

  const { mutateAsync: HandleList } = useMutation({
    mutationFn: (e) => handleList(e),
    onSuccess: async () => {
       invalidateListings()
      setButtonLoading(false);
    },
  });




  const handleList = async (e) => {
    e.preventDefault()

    let marketplaceActor = createActor(
      MARKETPLACE_CANISTER,
      marketIDL,
      authenticatedAgent
    );



    if (!marketplaceActor || !userPrincipal || !nftActor) return;

    if (newPrice == 0) {
      alert("price is zero");
      return;
    }
    // if (!window.confirm("Are you sure you want to list the NFT?")) return;

    setButtonLoading(true);
    try {
      // Call the init function on the marketplace with specified price
      let initRes = await marketplaceActor?.init_list_nft(
        Principal.fromText(userPrincipal),
        nft.nftid,
        { Kitties: null },
        parseInt(newPrice * 1e8) // Convert ICP to subunits
      );
      console.log("init res:", initRes);

      let tokenIdentifier = computeExtTokenIdentifier(
        nft.nftid,
        nft.canister_id
      );
      let transferRes = await nftActor.transfer({
        amount: parseInt(1),
        from: { principal: Principal.fromText(userPrincipal) },
        memo: [],
        notify: false,
        subaccount: [],
        to: { principal: Principal.fromText(MARKETPLACE_CANISTER) },
        token: tokenIdentifier,
      });

      console.log("transfer result:", transferRes);

      let res = await marketplaceActor.complete_listing(
        Principal.fromText(userPrincipal),
        nft.nftid,
        { Kitties: null }
      );
      console.log("final listing:", res);

      // if (fin.status === 200 && fin.status_text === "Ok") {
      //   alert("NFT listed successfully");
      // } else {
      //   alert(fin.status_error);
      // }
      if (res.status == 200 && res.status_text == "Ok") {
        displayNotificationModal("NFT listed successfully", "success");
      } else {
        displayNotificationModal(res.error_text, "error");
      }
    } catch (error) {
      console.log("Error in listing NFT:", error);
    }
  };

  return (
    <div className="relative flex-row gap-1 flex w-full bg-[#2E8DEE] font-bold text-white justify-center items-center p-2 ">
      <button onClick={() => setIsModalOpen(true)}>List</button>

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
              <h2 className="text-xl font-bold mb-4">List NFT</h2>
              <CgClose
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <form onSubmit={HandleList}>
              <label className="block mb-2" htmlFor="price">
                Enter listing price
              </label>
              <input
                type="number"
                id="price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
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
                    Confirm listing
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

export default ListNFT;
