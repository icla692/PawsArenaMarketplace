import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { computeExtTokenIdentifier } from "../Utils/tid";
import BuyNow from "../pages/BuyNow";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import useFecth from "../Utils/useFecth";

const ListedNFTDetails = () => {
  const { colID, nftID } = useParams();
  const [nftDetails, setNFTDetails] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [listbuttonLoading, setListButtonLoading] = useState(false);
  const navigate = useNavigate();
  const style = {
    wrapper: `flex gap-3 flex-col md:flex-row justify-center bg-[#121212] h-screen p-4 text-white`,
    leftwrapper: `flex flex-col  items-center md:items-start  mb-4 md:mb-0`,
    rightwrapper: `flex flex-col   h-full`,
    nftImg: `h-[200px] ml-2 md:h-[300px] lg:h-[400px] rounded-md w-auto`, // Responsive image height
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

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const { invalidateListings } = useFecth();

  const displayNotificationModal = async (_message, _type) => {
    setModalMessage(_message);
    setModalType(_type);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!colID || !nftID || !marketplaceActor) return;

      let tokenIdentifier = computeExtTokenIdentifier(nftID, colID);
      let details = await marketplaceActor.get_listed_nft_details(
        tokenIdentifier
      );
      console.log("results :", details);

      if (details.status === 200 && details.status_text === "Ok") {
        setNFTDetails(details.data[0]);
      }
    };

    fetchDetails();
  }, [colID, nftID, allListings]);

  const { mutateAsync: HandleUnlist } = useMutation({
    mutationFn: (e) => handleUnlist(e),
    onSuccess: async () => {
      invalidateListings();
      setButtonLoading(false);
      navigate("../profile")
    },
  });

  const handleUnlist = async (e) => {
    e.preventDefault();
    if (!nftDetails) return;
    setButtonLoading(true);
    // if(!window.confirm("Unlist NFT from marketplace:")) return
//     displayNotificationModal("NFT unlisted successfully", "success");
// return
    try {
      let res = await marketplaceActor.un_list_nft(nftDetails.token_identifier);
      console.log("unlisting res :", res);

      if (res.status == 200 && res.status_text == "Ok") {
        displayNotificationModal("NFT unlisted successfully", "success");
      } else {
        displayNotificationModal(res.error_text[0], "error");
      }
    } catch (error) {
      console.log("error in unlisting token :", error);
    }
  };

  const { mutateAsync: HandleUpdatePrice } = useMutation({
    mutationFn: (e) => handleUpdatePrice(e),
    onSuccess: async () => {
      invalidateListings();
      setButtonLoading(false);
    },
  });

  const handleUpdatePrice = async (e) => {
    e.preventDefault();

    console.log("new price : ", newPrice);

    if (!newPrice || newPrice == 0) return;
    setListButtonLoading(true);
    let res = await marketplaceActor.update_nft_price(
      nftDetails.token_identifier,
      parseInt(newPrice * 1e8)
    );

    if (res.status == 200 && res.status_text == "Ok") {
      displayNotificationModal("price updated successfully", "success");
    } else {
      displayNotificationModal(res.error_text, "error");
    }

    console.log("update price results :", res);

    setListButtonLoading(false);
  };

  return (
    <>
      {userPrincipal ? (
        <div className={style.wrapper}>
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
          <div className={style.leftwrapper}>
            <div className="rounded-lg p-1 flex border border-gray-400 pt-3 flex-col">
              <img
                src={`https://${colID}.raw.icp0.io/?tokenid=${computeExtTokenIdentifier(
                  nftID,
                  colID
                )}&type=thumbnail`}
                alt=""
                className={style.nftImg}
              />
            </div>
          </div>

          <div className={style.rightwrapper}>
            <div>
              <h1 className="text-[30px] font-bold">
                {nftDetails && Object.keys(nftDetails?.nft_category)[0]}
              </h1>
              <span>Owned by {nftDetails?.seller_principal?.toString()}</span>
            </div>
            <div className="mt-4">
              <span className="font-semibold">Current price:</span>
              <span className="ml-2">
                {Number(nftDetails?.nft_price) / 1e8} ICP
              </span>

              {nftDetails?.seller_principal == userPrincipal ? (
                <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
                  <button
                    onClick={HandleUnlist}
                    className="flex w-full bg-[#2E8DEE] mt-4 font-bold text-white justify-center items-center p-2"
                  >
                    {buttonLoading ? (
                      <ClipLoader size={20} color="white" />
                    ) : (
                      "Unlist"
                    )}
                  </button>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-full bg-[#242424] mt-4 font-bold text-white justify-center items-center p-2"
                  >
                    Update price
                  </button>
                </div>
              ) : (
                <BuyNow
                  nftid={nftDetails?.token_identifier}
                  nft_price={Number(nftDetails?.nft_price)}
                />
              )}
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-[#252525] rounded-lg shadow-lg p-6 w-96">
                <div className="flex justify-between ">
                  <h2 className=" mb-4">Update NFT price</h2>
                  <CgClose
                    className="cursor-pointer"
                    onClick={() => setIsModalOpen(false)}
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
                    {listbuttonLoading ? (
                      <ClipLoader color="white" size={20} />
                    ) : (
                      <button
                        type="submit"
                        className="px-4 py-2 bg-white text-black rounded"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default ListedNFTDetails;
