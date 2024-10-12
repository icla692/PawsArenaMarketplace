import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

const useFecth = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const { data: allListings } = useQuery({
    queryKey: ["allListings"],
  });

  const { data: userIcpBalance } = useQuery({
    queryKey: ["userIcpBalance"],
  });

  const { data: marketplaceActor } = useQuery({
    queryKey: ["marketplaceActor"],
  });

  const { data: nftActor } = useQuery({
    queryKey: ["nftActor"],
  });

  const { data: userAccountId } = useQuery({
    queryKey: ["userAccountId"],
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

  const oo = useQuery({
    queryKey: ["userNFTS"],
    queryFn: () => loadUserNfts(),
  });

  const o = useQuery({
    queryKey: ["userIcpBalance"],
    queryFn: () => loadUserBalance(),
  });

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

  return {
    invalidateListings,
    invalidateUserNfts,
    invalidateUserBalance,
  };
};

export default useFecth;
