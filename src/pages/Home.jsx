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

import pic17 from "../assets/pic17.png";

import { idlFactory as ICPDL } from "../Utils/icptoken.did";
import { useNavigate, useParams } from "react-router-dom";
import { HttpAgent } from "@dfinity/agent";
import { BarLoader } from "react-spinners";
import { idlFactory as marketIDL } from "../Utils/markeptlace.did";
const HOST = "https://ic0.app";
const agent = new HttpAgent({ host: HOST, retryTimes: 10 });

const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useIdentityKit();
  const {colID} = useParams();


 
  const { data: bulkData } = useQuery({
    queryKey: ["bulkData"],
  });

  const { data: collectionDetails } = useQuery({
    queryKey: ["collectionDetails"],
  });

  const { data: refreshData } = useQuery({
    queryKey: ["refreshData"],
  });

  const [treiggerRefetch, setTriggerRefetch] = useState("");

  
 
  useEffect(() => {
    const loadData = async () => {
      let bulkDataArray = [];
      let collectionDetailsArray = [];

      // if (refreshData !== "doit") {
      //   console.log("yeah lets do it");
      //   return;
      // }

      setIsLoading(true);
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

            bulkDataArray.push([
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

            collectionDetailsArray.push({
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
        queryClient.setQueryData(["bulkData"], bulkDataArray);
        queryClient.setQueryData(["collectionDetails"], collectionDetailsArray);
      } catch (error) {
        console.log("error in getting data:", error);
      }
      setIsLoading(false);
    };

    loadData();
  }, [treiggerRefetch, refreshData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!bulkData || !collectionDetails) {
  //       //trigger the refetching of the tokens
  //       setTriggerRefetch(Math.random().toString(36).substring(7));
  //       return;
  //     }


  //     const marketActor = createActor(MARKETPLACE_CANISTER, marketIDL, agent);
  //     const marketNFTsResponse = await marketActor?.get_all_listed_nfts();

  //     for (const collection of NFTCollections) {
  //       // const filteredCollection = NFTCollections.find(col => col.canisterId === collection.canisterId);
  //       const filteredMarketNFTs =
  //         marketNFTsResponse?.data[0]?.filter(
  //           (nft) => nft[1].nft_canister == collection.canisterId
  //         ) || [];

  //       const nftIds = filteredMarketNFTs?.map((nft) => [
  //         nft[1].nft_id,
  //         {
  //           locked: [],
  //           seller: nft[1].seller_principal,
  //           price: nft[1].nft_price,
  //           inhouse_sale: true,
  //         },
  //       ]);

  //       let tokenListings = bulkData?.find(
  //         (det) => det[0] == collection.canisterId
  //       );
  //       const combinedListings = [...nftIds];
  //       const lookup = Object.fromEntries(
  //         combinedListings.map((item) => [item[0], item])
  //       );
  //       const updatedTokens = tokenListings[1]?.allNftTokens?.map((item) =>
  //         lookup[item[0]] ? lookup[item[0]] : item
  //       );
  //       console.log("my tokens :", updatedTokens);
  //       queryClient.setQueryData(["myTokens"], updatedTokens);
  //       queryClient.setQueryData(["listedNfts"], updatedTokens);
  //     }
  //   };
  //   fetchData();
  // }, [bulkData, collectionDetails, refreshData]);

  return (
    <div
      className="w-full p-8 md:mt-[20px] min-h-screen flex m flex-col text-white"
      id="about"
    >
      {/* Text Section */}
      <div className="flex flex-col w-full">
        <div className="p-4 md:px-20 flex mt-[80px] md:mt-[100px] flex-col items-center justify-center gap-1">
          <div className="text-5xl  md:text-8xl uppercase ">PawsArena</div>
          <div className="text-3xl md:text-5xl">Marketplace</div>

          <span className=" flex mt-4">
            Discover, Collect and Sell Rare NFTs from the Pawsarena game
          </span>
        </div>
      </div>

      <div className="md:flex mb-10 mt-2 justify-center items-center w-full">
        <div className="flex  gap-2">
          {[pic17].map((pic, index) => (
            <div key={index} className="relative">
              {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-xl">
                  <BarLoader loading={true} size={30} color="#36d7b7" />
                </div>
              )}

              <img
                src={pic}
                onClick={() =>
                  navigate("./collection/rw7qm-eiaaa-aaaak-aaiqq-cai")
                }
                alt="nft"
                className="h-[250px] md:h-[200px] cursor-pointer rounded-xl w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
