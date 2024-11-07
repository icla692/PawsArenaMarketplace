import { AccountIdentifier, LedgerCanister } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import React, { useEffect, useState } from "react";
import { createActor } from "../Utils/createActor";
import { idlFactory } from "../Utils/markeptlace.did";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { idlFactory as PawsIDL } from "../Utils/paws.did";
import {
  MARKETPLACE_CANISTER,
  MY_LEDGER_CANISTER_ID,
  PAWS_ARENA_CANISTER,
} from "../Utils/constants";
import { idlFactory as ICPDL } from "../Utils/icptoken.did";
import { BiWallet } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { ConnectWallet, useIdentityKit } from "@nfid/identitykit/react";
import { PlugLogin, StoicLogin, NFIDLogin, IdentityLogin } from "ic-auth";
import { useAgent } from "@nfid/identitykit/react";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const agent = useAgent();

  const {
   
    connect,
   
  } = useIdentityKit();

  //  console.log("wewewewe :",icpBalance,accounts,user);

  const [isLoading, setIsLoading] = useState(false);

  // const handleLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     //login
  //     let res = await IdentityLogin();

  //     //create the instance of the icp ledger canister
  //     const icpActor = createActor(MY_LEDGER_CANISTER_ID, ICPDL, res.agent);

  //     //get the balance and the account identifier of the user

  //     const [balance, accountIdentifier] = await Promise.all([
  //       await icpActor.icrc1_balance_of({
  //         owner: Principal.fromText(res.principal),
  //         subaccount: [],
  //       }),
  //       await icpActor.account_identifier({
  //         owner: Principal.fromText(res.principal),
  //         subaccount: [],
  //       }),
  //     ]);

  //     let nftActor = createActor(PAWS_ARENA_CANISTER, PawsIDL, res.agent);

  //     //create an instance of the marketplace actor
  //     let marketplaceActor = createActor(
  //       MARKETPLACE_CANISTER,
  //       idlFactory,
  //       res.agent
  //     );

  //     let res2 = await marketplaceActor?.place_offer_on_nft(
  //       "cg7z3-4akor-uwiaa-aaaaa-cqace-eaqca-aaad4-a",
  //       1730897587947000064,
  //       Number(10000000)
  //     );

  //     console.log("place offer :", res2);

  //     //get the nfts for the user

  //     let accID = AccountIdentifier.fromPrincipal({
  //       principal: Principal.fromText(res.principal),
  //     }).toHex();

  //     console.log("dddd :", accID, res.principal);

  //     let tokens = await nftActor.tokens(accID);

  //     if (tokens.ok) {
  //       await queryClient.setQueryData(["userNFTS"], Array.from(tokens.ok));
  //     }

  //     console.log(" ssss :", tokens);

  //     //get all the nfts listed on the marketplace
  //     let allListings = await marketplaceActor.get_all_listed_nfts();
  //     queryClient.setQueryData(["userPrincipal"], res.principal);
  //     queryClient.setQueryData(["userAccountId"], accountIdentifier);

  //     queryClient.setQueryData(["userIcpBalance"], Number(balance) / 1e8);
  //     queryClient.setQueryData(["IcpActor"], icpActor);
  //     queryClient.setQueryData(["nftActor"], nftActor);
  //     queryClient.setQueryData(["marketplaceActor"], marketplaceActor);
  //     queryClient.setQueryData(["loginAgent"], res.agent);
  //     queryClient.setQueryData(["allListings"], allListings.data[0]);

  //     // navigate("dashboard");
  //   } catch (error) {
  //     console.log("error in loggin in :", error);
  //   }
  //   setIsLoading(false);
  // };

  // const fetchDetails = async () => {
  //   try {
  //     if (!agent || !user) {
  //       alert("sdisd")
  //     };
  //     const icpActor = createActor(MY_LEDGER_CANISTER_ID, ICPDL, agent);
  //     let nftActor = createActor(PAWS_ARENA_CANISTER, PawsIDL, agent);

  //     let marketplaceActor = createActor(
  //       MARKETPLACE_CANISTER,
  //       idlFactory,
  //       agent
  //     );

  //     const [balance, accountIdentifier] = await Promise.all([
  //       await icpActor.icrc1_balance_of({
  //         owner: user?.principal,
  //         subaccount: [],
  //       }),
  //       await icpActor.account_identifier({
  //         owner: user?.principal,
  //         subaccount: [],
  //       }),
  //     ]);

  //     let accID = AccountIdentifier.fromPrincipal({
  //       principal: user?.principal,
  //     }).toHex();

  //     console.log("dddd2323 :", accID, user?.principal?.toString());
  //     let tokens = await nftActor.tokens(accID);

  //     if (tokens.ok) {
  //       await queryClient.setQueryData(["userNFTS"], Array.from(tokens.ok));
  //     }

  //     console.log(" ssssiiiii :", tokens);

  //     //get all the nfts listed on the marketplace
  //     let allListings = await marketplaceActor.get_all_listed_nfts();
  //     await queryClient.setQueryData(["userPrincipal"], user?.principal?.toString());
  //     await queryClient.setQueryData(["userAccountId"], accountIdentifier);

  //     await queryClient.setQueryData(["userIcpBalance"], Number(balance) / 1e8);
  //     await queryClient.setQueryData(["IcpActor"], icpActor);
  //     await queryClient.setQueryData(["nftActor"], nftActor);
  //     await queryClient.setQueryData(["marketplaceActor"], marketplaceActor);
  //     await queryClient.setQueryData(["loginAgent"], agent);
  //     await queryClient.setQueryData(["allListings"], allListings.data[0]);
  //   } catch (error) {
  //     console.log("error in laoding data :", error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("user account :", user);

  //   fetchDetails();
  // }, [user, agent]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex text-black font-semibold justify-center items-center gap-1 text-lg border border-red-300 bg-yellow-200 p-2 rounded-md cursor-pointer">
        <BiWallet />
        {/* {user ? (
          <div>

          {user?.principal?.toString()}
          </div>
        ) : ( */}

        {/* <ConnectWallet /> */}
        <button onClick={() => connect()}>Login</button>
      </div>
    </div>
  );
};

export default Login;
