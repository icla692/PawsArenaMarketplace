import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { computeExtTokenIdentifier } from "../Utils/tid";
import { PAWS_ARENA_CANISTER, MARKETPLACE_CANISTER } from "../Utils/constants";
import { Principal } from "@dfinity/principal";
import UnlistUpdate from "./UnlistUpdate";
import useUpdateFunctions from "../Utils/useUpdateFunctions";
import PlaceAcceptOffer from "./PlaceAcceptOffer";
const Dashboard = () => {
  const {HandleList} = useUpdateFunctions()
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


  
  
  return (
    <div className="flex flex-col p-5 m-10 justify-center items-center w-full  min-h-full">
      <h2 className="flex underline">Dashboard</h2>
      <div className="flex shadow-xs p-6 mt-5 rounded-md border border-black shadow-black flex-col">
        <span>Address : {userPrincipal}</span>
        <span>Balance : {userIcpBalance} ICP</span>
      </div>
      <div className="flex flex-col justify-center items-center mt-6 p-5 w-[80%]  rounded-md">
        <h4 className="flex justify-center items-center">My NFTS</h4>
        <div className="flex border border-black w-[80%] p-4 flex-col gap-3">
        <div>
          {userNFTS?.map((nft, index) => (
            <div key={index}>
              <img
                src={`https://rw7qm-eiaaa-aaaak-aaiqq-cai.raw.icp0.io/?type=thumbnail&tokenid=${computeExtTokenIdentifier(
                  nft,
                  PAWS_ARENA_CANISTER
                )}`}
                height="150px"
                width="150px"
                alt=""
              />
              <span>#{nft}</span>
              <div>
                <button
                  onClick={ ()=>HandleList(nft)}
                  className="border border-red-200 p-2 rounded-md bg-black text-white"
                >
                  List
                </button>
              </div>
            </div>
          ))}
        </div>
          </div>



          <h1 className="flex mt-8">Marketplace</h1>
        <div className="flex mt-6">
          <div>
            {
              <div className="p-4">
                {allListings?.map((nft, index) => {
                  const tokenId = nft[0];
                  const details = nft[1];
                  return (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-lg p-6 mb-4"
                    >
                      <h2 className="text-xl font-bold mb-2">NFT Details</h2>

                      <img
                        src={`https://rw7qm-eiaaa-aaaak-aaiqq-cai.raw.icp0.io/?type=thumbnail&tokenid=${tokenId}`}
                        height="150px"
                        width="150px"
                        alt=""
                      />
                      <p>
                        <strong>NFT Collection:</strong>{" "}
                        {Object.keys(details.nft_category).join(", ")}
                      </p>
                      <p>
                        <strong>NFT Price:</strong>{" "}
                        {Number(details.nft_price) / 1e8} ICP
                      </p>
                      <p>
                        <strong>Offers:</strong>{" "}
                        {details.offers.length > 0
                          ? details.offers.join(", ")
                          : "No offers"}
                      </p>
                      <p>
                        <strong>Seller Identifier:</strong>{" "}
                        {details.seller_identifier}
                      </p>
                      <p>
                        <strong>Seller Principal:</strong>{" "}
                        {details.seller_principal?.toString()}
                      </p>
                      {
                        details.seller_principal?.toString() == Principal.fromText(userPrincipal)? <UnlistUpdate nftid={tokenId}/>: <PlaceAcceptOffer nftid={tokenId}/>
                      }
                    </div>
                  );
                })}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
