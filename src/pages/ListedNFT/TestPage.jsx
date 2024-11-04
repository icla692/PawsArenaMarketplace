import { HttpAgent } from "@dfinity/agent";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { MARKETPLACE_CANISTER } from "../../Utils/constants";
import { createActor } from "../../Utils/createActor";
import { idlFactory } from "../../Utils/paws.did";
import { idlFactory as marketIDL } from "../../Utils/markeptlace.did";
import { useEffect, useState } from "react";
import useFecth from "../../Utils/useFecth";
import { computeExtTokenIdentifier } from "../../Utils/tid";

const TestPage = () => {

    const { colID, nftID } = useParams();
    const [nftDetails, setNFTDetails] = useState(null);
    const [newPrice, setNewPrice] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [listbuttonLoading, setListButtonLoading] = useState(false);
    const navigate = useNavigate();
    

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState(""); // "success" or "error"
    const { invalidateListings } = useFecth();
  


    
      const HOST =
    process.env.DFX_NETWORK !== "ic"
      ? "https://ic0.app"
      : "http://localhost:4943";

  const agent = new HttpAgent({ host: HOST, retryTimes: 10 })

  const nativeNftActor = createActor(colID, idlFactory, agent);
  const marketActor = createActor(MARKETPLACE_CANISTER, marketIDL, agent);
  

  const { data: myTokens, isLoading: dataLoading } = useQuery({
    queryKey: ["myTokens"],
  });


    useEffect(()=>{

         fetchDetails()
        
    },[])



    const fetchDetails = async ()=>{
        try {
            console.log("working");
            if (!colID || !nftID) return;
            let tokenIdentifier = computeExtTokenIdentifier(nftID, colID);
            const nftInfo = myTokens?.find((nft) => nft[0] == nftID);
            
            // let [nativeTrans, markTrans] = await Promise.all([
            //     await nativeNftActor?.transactions(),
            //     await marketActor?.get_nft_sale_history(tokenIdentifier),
            // ]);

             let nativeTrans =  await marketActor?.get_nft_sale_history(tokenIdentifier)
            let markTrans = await nativeNftActor?.transactions()

            // let filtered = nativeTrans?.find((trans)=>trans.token == tokenIdentifier)
            
            console.log("token identifi5 :",tokenIdentifier,markTrans);
        




            



        } catch (error) {
            console.log("erro in getting details :",error);
            
        }
    }









  return (
    <div>
      Test
    </div>
  )
}

export default TestPage
