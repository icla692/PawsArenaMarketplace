import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFecth from "../Utils/useFecth";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { AccountIdentifier, LedgerCanister } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react";
import { createActor } from "../Utils/createActor";
import { idlFactory } from "../Utils/markeptlace.did";
import { idlFactory as PawsIDL } from "../Utils/paws.did";
import {
  MARKETPLACE_CANISTER,
  MY_LEDGER_CANISTER_ID,
  NFTCollections,
  PAWS_ARENA_CANISTER,
} from "../Utils/constants";

import HH from "../assets/pawsarena.png";
import pic11 from "../assets/pic11.png";
import pic12 from "../assets/pic12.png";
import pic13 from "../assets/pic13.png";
import pic14 from "../assets/pic14.png";
import pic17 from "../assets/pic17.png";
import pic18 from "../assets/pic18.png";

import { idlFactory as ICPDL } from "../Utils/icptoken.did";
import { useNavigate } from "react-router-dom";
import { HttpAgent } from "@dfinity/agent";
import { ClipLoader } from "react-spinners";
const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { invalidateListings } = useFecth();
  const authenticatedAgent = useAgent({ retryTimes: 10 });
const [isLoading,setIsLoading] = useState(false)
  const { user } = useIdentityKit();

  const HOST = "https://ic0.app";

  const agent = new HttpAgent({ host: HOST, retryTimes: 10 });

  const { data: bulkData, } = useQuery({
    queryKey: ["bulkData"],
  });

  const { data: collectionDetails, isLoading: collectionLoading } = useQuery({
    queryKey: ["collectionDetails"],
  });

  // console.log("collection details :",bulkData,isLoading,collectionDetails);

  const fetchDetails = async () => {
    try {
      if (!agent || !user) {
        // console.log("user and agent :", user, agent);
        return;
      }
      const icpActor = createActor(MY_LEDGER_CANISTER_ID, ICPDL, agent);
      let nftActor = createActor(PAWS_ARENA_CANISTER, PawsIDL, agent);

      let marketplaceActor = createActor(
        MARKETPLACE_CANISTER,
        idlFactory,
        agent
      );

      const [balance, accountIdentifier] = await Promise.all([
        await icpActor.icrc1_balance_of({
          owner: user?.principal,
          subaccount: [],
        }),
        await icpActor.account_identifier({
          owner: user?.principal,
          subaccount: [],
        }),
      ]);

      let accID = AccountIdentifier.fromPrincipal({
        principal: user?.principal,
      }).toHex();

      console.log("dddd2323 90 :", accID, user?.principal?.toString());
      let tokens = await nftActor.tokens(accID);

      if (tokens.ok) {
        await queryClient.setQueryData(["userNFTS"], Array.from(tokens.ok));
      }

      // console.log(" ssssiiiii :", tokens);
      //get all the nfts listed on the marketplace
      let allListings = await marketplaceActor.get_all_listed_nfts();
      await queryClient.setQueryData(
        ["userPrincipal"],
        user?.principal?.toString()
      );
      await queryClient.setQueryData(["userAccountId"], accountIdentifier);
      await queryClient.setQueryData(["userIcpBalance"], Number(balance) / 1e8);
      await queryClient.setQueryData(["IcpActor"], icpActor);
      await queryClient.setQueryData(["nftActor"], nftActor);
      await queryClient.setQueryData(["marketplaceActor"], marketplaceActor);
      await queryClient.setQueryData(["loginAgent"], agent);
      await queryClient.setQueryData(["allListings"], allListings.data[0]);
      console.log("done");
    } catch (error) {
      console.log("error in loading data :", error);
    }
  };

  useEffect(() => {
    //
    // console.log("hee is the user :", user, agent);
    fetchDetails();
  }, [user, agent]);

  const replacer = (key, value) =>
    typeof value === "bigint" ? value.toString() : value;

  useEffect(() => {
    const loadBulkData = async () => {
      let data = [];
        
if(bulkData) {
  console.log("sss here present");
  
  
  return}
setIsLoading(true)
      
      try {
        for (const collection of NFTCollections) {
          let nftActor = createActor(collection.canisterId, PawsIDL, agent);

          try {
            const [nftStats, listings, transactions, allNftTokens] =
              await Promise.all([
                nftActor.stats(),
                nftActor.listings(),
                nftActor.transactions(),
                nftActor.getTokens(),
              ]);

            //  console.log("sss :", nftStats,listings,transactions,allNftTokens);

            data.push([
              collection.canisterId,
              {
                imgUrl: collection.imageUrl,
                canisterId: collection.canisterId,
                name: collection.name,
                description: collection.description,
                volume: nftStats[0],
                floorprice: nftStats[3],
                totalListed: nftStats[4],
                transactions,
                listings,
                allNftTokens,
              },
            ]);
          } catch (error) {
            console.error("Error loading NFT data:", error);
          }
        }

        // Set individual collection data in the query cache
        console.log("fetching bulk data", data);
        // localStorage.setItem("bulkData", JSON.stringify(data, replacer));

        queryClient.setQueryData(["bulkData"], data);
        //localStorage.clear()
       // const compressedData = Pako.deflate(JSON.stringify(data,replacer), { to: 'string' });
         //localStorage.setItem("bulkData", compressedData);
      } catch (error) {
        console.log("error in geting bulk data :", error);
      }
    // }
    // else{
    //   console.log("data already fetched" ,exD);
      
    // }

    setIsLoading(false)
    };
    loadBulkData();
  }, []);

  useEffect(() => {
    const loadCollectionDetails = async () => {
      let data = [];

      let exD = localStorage.getItem("collectionDetails");
      if(collectionDetails) return
      // setIsLoading(true)
      try {
        for (const collection of NFTCollections) {
          let nftActor = createActor(collection.canisterId, PawsIDL, agent);
          let nftStats = await nftActor.stats();
          try {
            data.push({
              imgUrl: collection.imageUrl,
              canisterId: collection.canisterId,
              name: collection.name,
              description: collection.description,
              volume: nftStats[0],
              floorprice: nftStats[3],
              totalListed: nftStats[4],
            });
          } catch (error) {
            console.error("Error loading NFT data:", error);
          }
        }

        // Set individual collection data in the query cache
        console.log("fetching collection details data", data);
        // localStorage.setItem(
        //   "collectionDetails",
        //   JSON.stringify(data)
        // );
        queryClient.setQueryData(["collectionDetails"], data);
        
      } catch (error) {
        console.log("error in geting collection details :", error);
      }
      // setIsLoading(false)
    };

    loadCollectionDetails();
  }, []);

  return (
    <div
      className="w-full p-8 md:mt-[20px] min-h-screen flex m flex-col text-white"
      id="about"
    >
      {/* Text Section */}
      <div className="flex flex-col w-full">
        <div className="p-4 md:px-20 flex mt-[80px] md:mt-[100px] flex-col items-center justify-center gap-1">
          <div
            //  style={{ fontFamily: "fantasy" }}
            className="text-5xl  md:text-8xl uppercase "
          >
            PawsArena
          </div>
          <div className="text-3xl md:text-5xl">Marketplace</div>

          <span className=" flex mt-4">
            Discover, Collect and Sell Rare NFTs from the Pawsarena game
          </span>

          {/* <div className="flex w-full items-center justify-center gap-4 mt-6"> */}
          {/* <button
            onClick={() =>
              navigate("./collection/rw7qm-eiaaa-aaaak-aaiqq-cai")
            }
            className="bg-[#414242] w-1/2 text-lg rounded-lg font-bold text-white p-3 hover:bg-[#515355] transition duration-300"
          >
            Get started
          </button> */}
          {/* Uncomment if you want to include another button */}
          {/* <button className="bg-[#515355] w-1/2 rounded-lg font-bold text-white p-3 hover:bg-[#414242] transition duration-300">
            Read More
          </button> */}
          {/* </div> */}
        </div>
      </div>



      {/* Image Section */}
      <div className="md:flex mb-10 mt-2 justify-center items-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {[pic17, pic11, pic13, pic18].map((pic, index) => (
                    <div key={index} className="relative">
                        {/* Loader that appears based on isLoading state */}
                        {isLoading && (
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-xl">
                                <ClipLoader color="#36d7b7" loading={true} size={50} />
                            </div>
                        )}
                        <img
                            src={pic}
                            onClick={() => navigate("./collection/rw7qm-eiaaa-aaaak-aaiqq-cai")}
                            alt="nft"
                            className="h-[250px] md:h-[200px] cursor-pointer rounded-xl w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
    // <div className="flex text-white flex-col p-4 md:px-20 items-center justify-center ">
    //   <div className="flex w-full items-center justify-center">
    //     <h1 className="text-3xl md:text-3xl text-center ">
    //       Latest Collections
    //     </h1>

    //   </div>
    //   <div className="flex flex-wrap mx-2 mt-6 gap-6">
    //     {collectionDetails?.map((collection, index) => (
    //       <div key={index} className="pb-4 border border-red-400 rounded sm:w-[350px] w-full">
    //         <div className="overflow-hidden cursor-pointer h-[200px]">
    //           <img
    //             onClick={() => navigate('./collection/' + collection.canisterId)}
    //             src={collection.imgUrl}
    //             alt={collection.name}
    //             className="w-full h-full object-cover"
    //           />
    //         </div>
    //         <h2 className="text-xl font-bold mt-4 mb-4 flex justify-center items-center w-full">{collection.name}</h2>
    //         <div className="flex justify-center items-center gap-8">
    //           <div className="flex flex-col">
    //             <span>Volume</span>
    //             <span>{(Number(collection.volume) / 10e10).toFixed(2)}k</span>
    //           </div>
    //           <div className="flex flex-col">
    //             <span>Listings</span>
    //             <span>{Number(collection.totalListed)}</span>
    //           </div>
    //           <div className="flex flex-col">
    //             <span>Floor price</span>
    //             <span>{(Number(collection.floorprice) / 1e8).toFixed(3)}</span>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Home;
