import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import NFTCard from "../components/NFTCard";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
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

  return (
    <>
      <div className="flex bg-[#121212] flex-col py-2 min-h-screen  items-center w-full">
        {userPrincipal ? (
          <div className="flex px-4 flex-wrap justify-center md:justify-start items-center gap-3">
            {allListings &&
              allListings?.map((nft, index) => {
                return (
                  <div className="" key={index}>
                    {" "}
                    {/* Set width based on screen size */}
                    <NFTCard nft={nft} index={index} />
                  </div>
                );
              })}
          </div>
        ) : (
          navigate("/")
        )}
      </div>
    </>
  );
};

export default Dashboard;

{
  /* <div key={index} className="bg-white p-4 rounded shadow-md">
                <h2 className="text-lg font-bold">Title</h2>
                <p>{nft.description}</p>
              </div> */
}
