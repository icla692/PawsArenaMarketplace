import { HttpAgent } from "@dfinity/agent";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NFTCollections } from "./constants";
import { createActor } from "./createActor";
import { idlFactory } from "./paws.did";
import { useIdentityKit } from "@nfid/identitykit/react";

const useFecth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useIdentityKit();

  const HOST = "https://ic0.app";
  const agent = new HttpAgent({ host: HOST, retryTimes: 10 });

  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const { data: marketplaceActor } = useQuery({
    queryKey: ["marketplaceActor"],
  });

  const { data: nftActor } = useQuery({
    queryKey: ["nftActor"],
  });

  const { data: IcpActor } = useQuery({
    queryKey: ["IcpActor"],
  });

  const loadListedNfts = async () => {
    try {
      if (!marketplaceActor) return [];
      let allListings = await marketplaceActor.get_all_listed_nfts();
      console.log("refetched listed nfts ");
      await queryClient.setQueryData(["allListings"], allListings.data[0]);
      return allListings.data[0];
    } catch (error) {
      console.log("error in loading listed nfts :", error);
    }
  };

  const loadUserNfts = async () => {
    try {
      if (!nftActor || !userPrincipal) return [];

      let accID = AccountIdentifier.fromPrincipal({
        principal: Principal.fromText(userPrincipal),
      }).toHex();

      let tokens = await nftActor.tokens(accID);

      console.log("refetch user nfts :");
      if (tokens.ok && tokens.ok.length > 0) {
        await queryClient.setQueryData(["userNFTS"], Array.from(tokens?.ok));
      }
      return Array.from(tokens?.ok);
    } catch (error) {
      console.log("error in refetching user nfts :", error);
    }
  };

  const loadUserBalance = async () => {
    try {
      if (!userPrincipal || !IcpActor) return 0;

      let balance = await IcpActor.icrc1_balance_of({
        owner: Principal.fromText(userPrincipal),
        subaccount: [],
      });
      console.log("refetching user balance");

      await queryClient.setQueryData(["userIcpBalance"], Number(balance) / 1e8);

      return Number(balance) / 1e8;
    } catch (error) {
      console.log("error in fetching user balance :", error);
    }
  };

  const replacer = (key, value) =>
    typeof value === "bigint" ? value.toString() : value;

  // const reviver = (key, value) =>
  //   typeof value === "string" && /^\d+$/.test(value) ? BigInt(value) : value;

  const loadBulkData = async () => {
    let data = [];
    try {
      for (const collection of NFTCollections) {
        let nftActor = createActor(collection.canisterId, idlFactory, agent);
        try {
          const [nftStats, listings, transactions, allNftTokens] =
            await Promise.all([
              nftActor.stats(),
              nftActor.listings(),
              nftActor.transactions(),
              nftActor.getTokens(),
            ]);

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
              transactions: JSON.stringify(transactions),
              listings: JSON.stringify(listings, replacer),
              allNftTokens: JSON.stringify(allNftTokens),
            },
          ]);
        } catch (error) {
          console.error("Error loading NFT data:", error);
        }
      }

      // Set individual collection data in the query cache
      console.log("fetching bulk data",data);

      
      queryClient.setQueryData(["bulkData"], data);
      
      // localStorage.setItem("bulkData", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("error in geting bulk data :", error);
    }
  };

  const loadCollectionDetails = async () => {
    let data = [];

    try {
      for (const collection of NFTCollections) {
        let nftActor = createActor(collection.canisterId, idlFactory, agent);
        let nftStats = await nftActor.stats()
        // const [nftStats, listings, transactions, allNftTokens] =
        // await Promise.all([
        //   nftActor.stats(),
        //   nftActor.listings(),
        //   nftActor.transactions(),
        //   nftActor.getTokens(),
        // ]);
    try {
          data.push({
            imgUrl: collection.imageUrl,
            canisterId: collection.canisterId,
            name: collection.name,
            description: collection.description,
            volume: nftStats[0],
            floorprice: nftStats[3],
            totalListed: nftStats[4],
            // transactions: JSON.stringify(transactions),
            //   listings: JSON.stringify(listings, replacer),
            //   allNftTokens: JSON.stringify(allNftTokens),
          });

        } catch (error) {
          console.error("Error loading NFT data:", error);
        }
      }

      // Set individual collection data in the query cache
      console.log("fetching collection details data",data);
      // localStorage.setItem("collectionDetails", data);
      queryClient.setQueryData(["collectionDetails"], data);
      return data;
    } catch (error) {
      console.log("error in geting collection details :", error);
    }
  };

  // const oio = useQuery({
  //   queryKey: ["collectionDetails"],
  //   queryFn: () => loadCollectionDetails(),
  // });

  const oo = useQuery({
    queryKey: ["userNFTS"],
    queryFn: () => loadUserNfts(),
  });

  const o = useQuery({
    queryKey: ["userIcpBalance"],
    queryFn: () => loadUserBalance(),
  });

  // const oi = useQuery({
  //   queryKey: ["bulkData"],
  //   queryFn: () => loadBulkData(),
  // });

  const principalResults = useQuery({
    queryKey: ["allListings"],
    queryFn: () => loadListedNfts(),
  });

  const invalidateListings = async () => {
    await queryClient.invalidateQueries(["allListings"]);
  };

  const invalidateUserBalance = async () => {
    await queryClient.invalidateQueries(["userIcpBalance"]);
  };

  const invalidateUserNfts = async () => {
    await queryClient.invalidateQueries(["userNFTS"]);
  };

  const invalidateBulkData = async () => {
    await queryClient.invalidateQueries(["bulkData"]);
  };

  return {
    invalidateListings,
    invalidateUserNfts,
    invalidateUserBalance,
  };
};

export default useFecth;
