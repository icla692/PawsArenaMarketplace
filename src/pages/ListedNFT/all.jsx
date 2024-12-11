// import { useMutation, useQuery } from "@tanstack/react-query";
// import React, { Suspense, useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { computeExtTokenIdentifier } from "../../Utils/tid";
// import BuyNow from "../BuyNow";
// import { CgClose } from "react-icons/cg";
// import { ClipLoader } from "react-spinners";
// import useFecth from "../../Utils/useFecth";
// import { HttpAgent } from "@dfinity/agent";
// import { idlFactory } from "../../Utils/paws.did";
// import { MARKETPLACE_CANISTER } from "../../Utils/constants";
// import { idlFactory as marketIDL } from "../../Utils/markeptlace.did";
// import { createActor } from "../../Utils/createActor";
// const ListedNFTDetails = () => {
//   const { colID, nftID } = useParams();
//   const [nftDetails, setNFTDetails] = useState(null);
//   const [newPrice, setNewPrice] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [buttonLoading, setButtonLoading] = useState(false);
//   const [listbuttonLoading, setListButtonLoading] = useState(false);
//   const navigate = useNavigate();
//   const style = {
//     wrapper: `flex gap-3 mt-[80px] flex-col md:flex-row justify-center bg-[#121212] h-screen p-4 text-white`,
//     leftwrapper: `flex flex-col  items-center md:items-start  mb-4 md:mb-0`,
//     rightwrapper: `flex flex-col   h-full`,
//     nftImg: `h-[200px] ml-2 md:h-[300px] lg:h-[400px] rounded-md w-auto`, // Responsive image height
//   };

//   const { data: userPrincipal } = useQuery({
//     queryKey: ["userPrincipal"],
//   });

//   const { data: userIcpBalance } = useQuery({
//     queryKey: ["userIcpBalance"],
//   });

//   const { data: allListings } = useQuery({
//     queryKey: ["allListings"],
//   });

//   const { data: IcpActor } = useQuery({
//     queryKey: ["IcpActor"],
//   });

//   const { data: userNFTS } = useQuery({
//     queryKey: ["userNFTS"],
//   });

//   const { data: nftActor } = useQuery({
//     queryKey: ["nftActor"],
//   });

//   const { data: marketplaceActor } = useQuery({
//     queryKey: ["marketplaceActor"],
//   });

//   const { data: myTokens,isLoading :dataLoading } = useQuery({
//     queryKey: ["myTokens"],
//   });


//   // console.log("all tokens here :",myTokens);
  

//   const HOST =
//   process.env.DFX_NETWORK !== "ic"
//     ? "https://ic0.app"
//     : "http://localhost:4943";

// const agent = new HttpAgent({ host: HOST, retryTimes: 10 });

// const nativeNftActor  = createActor(colID, idlFactory, agent);
// const marketActor = createActor(MARKETPLACE_CANISTER, marketIDL, agent);
// const [saleHistory,setSaleHistory] = useState(null)



//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalType, setModalType] = useState(""); // "success" or "error"
//   const { invalidateListings } = useFecth();

//   const displayNotificationModal = async (_message, _type) => {
//     setModalMessage(_message);
//     setModalType(_type);
//     setShowModal(true);
//     setTimeout(() => setShowModal(false), 3000);
//   };

//   useEffect(() => {

//     const fetchDetails = async () => {
//       if (!colID || !nftID) return;

//       let tokenIdentifier = computeExtTokenIdentifier(nftID, colID);
//       let [nativeTrans,markTrans,] = await Promise.all([
//         await nativeNftActor?.transactions(),
//         await marketActor?.get_nft_sale_history(tokenIdentifier),
//       ])


//       let nftInfo= myTokens?.filter((nft)=>nft[0] == nftID)

//       let fil = nativeTrans?.filter((tran)=>tran.token == tokenIdentifier)
//       console.log("transactions :",[...fil,...markTrans?.data[0]]);
      

//       //get the nft data from the already set data
//       console.log("nft data :",nftInfo,tokenIdentifier);
//       if(nftInfo?.length > 0){
//         //check if the nft is an inhouse sale or an external sale
//         if(nftInfo[0][1].inhouse_sale){
//           //fetch all the details from the marketplace canister
//            let details = await marketActor?.get_listed_nft_details(
//          tokenIdentifier
//        );

//         if (details.status === 200 && details.status_text === "Ok") {
//         setNFTDetails(details.data[0]);
//        }

//       console.log("details :",details);
      
//         }else{
//           //fetch the details from the nft canister itself
//         }


//       }
      


//       // // 
//       // let tokenIdentifier = computeExtTokenIdentifier(nftID, colID);
//       // let details = await marketplaceActor?.get_listed_nft_details(
//       //   tokenIdentifier
//       // );
//       // console.log("results :", details);

//       // if (details.status === 200 && details.status_text === "Ok") {
//       //   setNFTDetails(details.data[0]);
//       // }
//     };

//     fetchDetails();
//   }, [colID, nftID, allListings]);

//   const { mutateAsync: HandleUnlist } = useMutation({
//     mutationFn: (e) => handleUnlist(e),
//     onSuccess: async () => {
//       invalidateListings();
//       setButtonLoading(false);
//       navigate("../profile")
//     },
//   });

//   const handleUnlist = async (e) => {
//     e.preventDefault();
//     if (!nftDetails) return;
//     setButtonLoading(true);
//     // if(!window.confirm("Unlist NFT from marketplace:")) return
// //     displayNotificationModal("NFT unlisted successfully", "success");
// // return
//     try {
//       let res = await marketplaceActor.un_list_nft(nftDetails.token_identifier);
//       console.log("unlisting res :", res);

//       if (res.status == 200 && res.status_text == "Ok") {
//         displayNotificationModal("NFT unlisted successfully", "success");
//       } else {
//         displayNotificationModal(res.error_text[0], "error");
//       }
//     } catch (error) {
//       console.log("error in unlisting token :", error);
//     }
//   };

//   const { mutateAsync: HandleUpdatePrice } = useMutation({
//     mutationFn: (e) => handleUpdatePrice(e),
//     onSuccess: async () => {
//       invalidateListings();
//       setButtonLoading(false);
//     },
//   });

//   const handleUpdatePrice = async (e) => {
//     e.preventDefault();

//     console.log("new price : ", newPrice);

//     if (!newPrice || newPrice == 0) return;
//     setListButtonLoading(true);
//     let res = await marketplaceActor.update_nft_price(
//       nftDetails.token_identifier,
//       parseInt(newPrice * 1e8)
//     );

//     if (res.status == 200 && res.status_text == "Ok") {
//       displayNotificationModal("price updated successfully", "success");
//     } else {
//       displayNotificationModal(res.error_text, "error");
//     }

//     console.log("update price results :", res);

//     setListButtonLoading(false);
//   };

//   return (
//     <>
//       {/* {!userPrincipal ? ( */}
//         <div className={style.wrapper}>
//           {showModal && (
//             <div
//               className={`absolute text-xs top-5 z-50  left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-out ${
//                 modalType === "success"
//                   ? "bg-green-100 text-green-800 border border-green-300 rounded-lg p-1 animate-slide-in"
//                   : "bg-red-100 text-red-800 border border-red-300 rounded-lg p-1 animate-slide-in"
//               }`}
//             >
//               <div className="modal-message">
//                 <p>{modalMessage}</p>
//               </div>
//             </div>
//           )}
//           <div className={style.leftwrapper}>
//             <div className="rounded-lg p-1 flex border border-gray-400 pt-3 flex-col">
//               <img
//                 src={`https://${colID}.raw.icp0.io/?tokenid=${computeExtTokenIdentifier(
//                   nftID,
//                   colID
//                 )}&type=thumbnail`}
//                 alt=""
//                 className={style.nftImg}
//               />
//             </div>
//           </div>

//           <div className={style.rightwrapper}>
//             <div>
//               <h1 className="text-[30px] font-bold">
//                 {nftDetails && Object.keys(nftDetails?.nft_category)[0]}
//               </h1>
//               <span>Owned by {nftDetails?.seller_principal?.toString()}</span>
//             </div>
//             <div className="mt-4">
//               <span className="font-semibold">Current price:</span>
//               <span className="ml-2">
//                 {Number(nftDetails?.nft_price) / 1e8} ICP
//               </span>

//               {nftDetails?.seller_principal == userPrincipal ? (
//                 <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
//                   <button
//                     onClick={HandleUnlist}
//                     className="flex w-full bg-[#2E8DEE] mt-4 font-bold text-white justify-center items-center p-2"
//                   >
//                     {buttonLoading ? (
//                       <ClipLoader size={20} color="white" />
//                     ) : (
//                       "Unlist"
//                     )}
//                   </button>

//                   <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="flex w-full bg-[#242424] mt-4 font-bold text-white justify-center items-center p-2"
//                   >
//                     Update price
//                   </button>
//                 </div>
//               ) : (

//                 <BuyNow
//                   nftid={nftDetails?.token_identifier}
//                   nft_price={Number(nftDetails?.nft_price)}
//                   />
                
//               )}
//             </div>
//           </div>
//           {isModalOpen && (
//             <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//               <div className="bg-[#252525] rounded-lg shadow-lg p-6 w-96">
//                 <div className="flex justify-between ">
//                   <h2 className=" mb-4">Update NFT price</h2>
//                   <CgClose
//                     className="cursor-pointer"
//                     onClick={() => setIsModalOpen(false)}
//                   />
//                 </div>

//                 <form onSubmit={HandleUpdatePrice}>
//                   <input
//                     type="number"
//                     id="price"
//                     value={newPrice}
//                     placeholder="enter new nft price"
//                     onChange={(e) => setNewPrice(e.target.value)}
//                     className=" border border-white text-black rounded p-1 w-full mb-4"
//                     required
//                   />
//                   <div className="flex justify-end">
//                     {listbuttonLoading ? (
//                       <ClipLoader color="white" size={20} />
//                     ) : (
//                       <button
//                         type="submit"
//                         className="px-4 py-2 bg-white text-black rounded"
//                       >
//                         Save
//                       </button>
//                     )}
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       {/* ) : (
//         <div className="flex text-white mt-[150px]">
//           dws
//         </div>
//         // navigate("/")
//       )} */}
//     </>
//   );
// };

// export default ListedNFTDetails;


import React, { useContext, useEffect, useState } from "react";

import { createActor as marketplaceActor } from "../../../declarations/marketplace_canister";
import { createActor as createSocialMedia } from "../../../declarations/social_media_canister";
import { NfidContext } from "../utils/nfid";
import { Principal } from "@dfinity/principal";
import { HttpAgent } from "@dfinity/agent";
import { profileAtom, profileMetadataAtom } from "../utils/store";
import { useAtom } from "jotai";
import { computeExtTokenIdentifier } from "../utils/tid";
import { useNavigate, useParams } from "react-router-dom";

const BidOnNFT = ({id,isBidModalOpen,onClose,nft_category}) => {
  const nfid = useContext(NfidContext);
  const navigate = useNavigate();
  const [profile] = useAtom(profileAtom);
  const [bidAmount, setBidAmount] = useState(0);
const [auctionTime,setAuctionTime] = useState(0)

const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success"); // "success" or "error"


  const agent = new HttpAgent({
    identity: nfid.getIdentity(),
    host: "https://ic0.app",
  });

  const marketplaceCanisterId = Principal.fromText(
    process.env.CANISTER_ID_MARKETPLACE_CANISTER
  );
  const marketplaceCanister = marketplaceActor(marketplaceCanisterId, {
    agent,
  });

  const socialMediaCanisterId = Principal.fromText(
    process.env.CANISTER_ID_SOCIAL_MEDIA_CANISTER
  );
  const socialMediaCanister = createSocialMedia(socialMediaCanisterId, {
    agent,
  });

 const displayNotificationModal = async (_message, _type) => {
    setModalMessage(_message);
    setModalType(_type);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  
  const handleBid = async (id) => {
    try {
      //compute the token identifier

      if(!confirm("Are you sure you want to place bid?")) return


      let tokenIdentifier = computeExtTokenIdentifier(
        parseInt(id),
        nft_category == "Post"
            ? process.env.CANISTER_ID_POST_NFT_CANISTER
            : process.env.CANISTER_ID_PROFILE_NFT_CANISTER
      );


      //get the bid_step of the auctioned nft
      let results =
        await marketplaceCanister.get_auction_nft_details(tokenIdentifier);
        console.log("auction details :",results);
        

      if (results.length < 1) {
        alert("error in fetching nft bid step");
        return;
      }

      // onClose()

      let _bidStep = Number(results[0]?.bid_step);
      console.log("bid step :", _bidStep);

      let realPrice = Number(bidAmount * 1e8);
      //approve the marketplace canister to transfer the funds before bidding the nft

      let icrc2_approve_params = {
        from_subaccount: [],
        spender: {
          owner: {
            __principal__: process.env.CANISTER_ID_MARKETPLACE_CANISTER,
          },
          subaccount: [],
        },
        fee: [],
        memo: [],
        amount: realPrice + 20000 + _bidStep,
        created_at_time: [],
        expected_allowance: [],
        expires_at: [],
      };

      let approve_res;
      //approve the marketplace canister to approve the allowance deduction
      approve_res = await nfid.requestCanisterCall({
        method: "icrc2_approve",
        canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
        parameters: `[${JSON.stringify(icrc2_approve_params)}]`,
        delegationOrigin: "http://localhost:5173",
      });

      if (approve_res && approve_res.Ok) {
        //call the auction method on the social media canister
        let bidRes = await marketplaceCanister?.bid_on_nft(
          parseInt(id),
          nft_category == "Profile"?{ Profile: null }:{Post:null},
          realPrice
        );

        bidRes === "aution added succesffully"
            ? (displayNotificationModal("New bid placed on NFT", "success"),
              console.log(" nft ", bidRes))
            : displayNotificationModal("bid amount below the highest bidder", "error");
        console.log("bid reults :", bidRes);
      }

      //   let approveResults = await icp
    } catch (error) {
      console.log("error in placing bid :", error);
    }
  };

  if(!isBidModalOpen) return null

  return (
    <div className="bid-modal-overlay">
      {showModal && (
        <div className={`modal ${modalType}`}>
          <div className="modal-message">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}

    <div className="bid-modal-content">
      <input
        type="number"
        style={{height:"30px"}}
        className="auction-input"
        placeholder="enter bid amount"
        onChange={(e) => setBidAmount(e.target.value)}
      />
      <div className="auction_btns">
        <button onClick={() => handleBid(id)}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
  )
}

export default BidOnNFT






export const BidNftModal = ({id,isBidModalOpen,onClose})=>{

  if(!isBidModalOpen) return
console.log("deuyb ");


  return(
    <div className="modal-overlay">
    <div className="modal-content">
      <input
        type="number"
        style={{height:"30px"}}
        className="auction-input"
        placeholder="enter number of days"
        onChange={(e) => setAuctionTime(e.target.value)}
      />
      <div className="auction_btns">
        <button onClick={() => handleAuctionNft(id)}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
  )
}