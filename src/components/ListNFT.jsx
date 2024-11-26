import { Principal } from "@dfinity/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { computeExtTokenIdentifier } from "../Utils/tid";
import { MARKETPLACE_CANISTER, PAWS_ARENA_CANISTER } from "../Utils/constants";
import useFecth from "../Utils/useFecth";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { createActor } from "../Utils/createActor";
import { idlFactory as marketIDL } from "../Utils/markeptlace.did";
import { idlFactory as PawsIDL } from "../Utils/paws.did";
const ListNFT = ({ nft, handleTrigger }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const queryClient = useQueryClient();

  const { invalidateListings } = useFecth();
  const authenticatedAgent = useAgent();

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

  const { user } = useIdentityKit();

  const { mutateAsync: HandleList } = useMutation({
    mutationFn: (e) => handleList(e),
    onSuccess: async () => {
      invalidateListings();
      setButtonLoading(false);
    },
  });



  const handleList = async (e) => {
    e.preventDefault();

    if (!user || !nft || !authenticatedAgent) return;

    let marketplaceActor = createActor(
      MARKETPLACE_CANISTER,
      marketIDL,
      authenticatedAgent
    );

    let nftActor = createActor(
      PAWS_ARENA_CANISTER,
      PawsIDL,
      authenticatedAgent
    );

    if (newPrice == 0) {
      alert("price is zero");
      return;
    }
    // if (!window.confirm("Are you sure you want to list the NFT?")) return;

    setButtonLoading(true);
    try {
      // Call the init function on the marketplace with specified price
      let initRes = await marketplaceActor?.init_list_nft(
        user.principal,
        nft.nftid,
        { Kitties: null },
        parseInt(newPrice * 1e8) // Convert ICP to subunits
      );
      console.log("init res:", initRes);

      let tokenIdentifier = computeExtTokenIdentifier(
        nft.nftid,
        nft.canister_id
      );
      let transferRes = await nftActor?.transfer({
        amount: parseInt(1),
        from: { principal: user.principal },
        memo: [],
        notify: false,
        subaccount: [],
        to: { principal: Principal.fromText(MARKETPLACE_CANISTER) },
        token: tokenIdentifier,
      });

      console.log("transfer result:", transferRes);

      let res = await marketplaceActor?.complete_listing(
        user?.principal,
        nft.nftid,
        { Kitties: null }
      );
      console.log("final listing:", res);

      // if (fin.status === 200 && fin.status_text === "Ok") {
      //   alert("NFT listed successfully");
      // } else {
      //   alert(fin.status_error);
      // }
      if (res?.status == 200 && res?.status_text == "Ok") {
        displayNotificationModal("NFT listed successfully", "success");
      } else {
        displayNotificationModal(res.error_text, "error");
      }
    } catch (error) {
      console.log("Error in listing NFT:", error);
    }

    queryClient.setQueryData(["refreshData"], Math.random().toString());
  };

  return (
    <div className="relative flex-row gap-1 flex w-full text-white justify-center items-center p-2 ">
      <button
        className="flex bg-gray-300 w-full border mt-4  text-black justify-center items-center p-1"
        onClick={() => setIsModalOpen(true)}
      >
        List
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex items-center justify-center z-50 bg-black bg-opacity-50">
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
          <div className="bg-[#252525] text-sm rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between ">
              <h2 className=" text-sm mb-4">List NFT</h2>
              <CgClose
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <form onSubmit={HandleList}>
              {/* <span className=" mb-2 text-sm block text-gray-500">
                Enter listing price
              </span> */}
              <input
                type="number"
                id="price"
                value={newPrice}
                placeholder="enter listing price in icp"
                onChange={(e) => setNewPrice(e.target.value)}
                className="border border-white text-black rounded p-1 w-full mb-4"
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
