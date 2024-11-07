
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFecth from "../Utils/useFecth";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { AccountIdentifier, LedgerCanister } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react";
import { createActor } from "../Utils/createActor";
import { idlFactory } from "../Utils/markeptlace.did";
import { useNavigate } from "react-router-dom";
import { idlFactory as PawsIDL } from "../Utils/paws.did";
import {
  MARKETPLACE_CANISTER,
  MY_LEDGER_CANISTER_ID,
  PAWS_ARENA_CANISTER,
} from "../Utils/constants";
import { idlFactory as ICPDL } from "../Utils/icptoken.did";
const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {invalidateListings} = useFecth()
   const agent = useAgent();
   
  const {
    user
    
  } = useIdentityKit();


  const { data: bulkData,isLoading } = useQuery({
    queryKey: ["bulkData"],
  });



  const { data: collectionDetails,isLoading:collectionLoading } = useQuery({
    queryKey: ["collectionDetails"],
  });


  // console.log("collection details :",bulkData,isLoading,collectionDetails);
  


  const fetchDetails = async () => {
    try {
      if (!agent || !user) {
        console.log("user and agent :",user,agent);
        return
      };
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
      await queryClient.setQueryData(["userPrincipal"], user?.principal?.toString());
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
    console.log("hee is the user :",user,agent);
    fetchDetails()
  }, [user, agent]);











  return (
    <div className="flex text-white flex-col p-4 md:px-20 items-center justify-center ">
      <div className="flex w-full items-center justify-center">
        <h1 className="text-3xl md:text-3xl text-center ">
          Latest Collections
        </h1>

        
        
      </div>
      <div className="flex flex-wrap mx-2 mt-6 gap-6">
        {collectionDetails?.map((collection, index) => (
          <div key={index} className="pb-4 border border-red-400 rounded sm:w-[350px] w-full">
            <div className="overflow-hidden cursor-pointer h-[200px]">
              <img
                onClick={() => navigate('./collection/' + collection.canisterId)}
                src={collection.imgUrl}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold mt-4 mb-4 flex justify-center items-center w-full">{collection.name}</h2>
            <div className="flex justify-center items-center gap-8">
              <div className="flex flex-col">
                <span>Volume</span>
                <span>{(Number(collection.volume) / 10e10).toFixed(2)}k</span>
              </div>
              <div className="flex flex-col">
                <span>Listings</span>
                <span>{Number(collection.totalListed)}</span>
              </div>
              <div className="flex flex-col">
                <span>Floor price</span>
                <span>{(Number(collection.floorprice) / 1e8).toFixed(3)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
