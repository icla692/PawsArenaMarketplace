import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

const Offers = ({ offers,nft, nftOwner,handleCancel,handleAccept }) => {
  console.log("all offers :", offers);

  const convertExpiryDate = (expiry) => {
    const date = new Date(Number(expiry) / 1e6);
    return date.toLocaleString(); // Adjust options as needed for formatting
  };

  const shortenAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const { data: marketplaceActor } = useQuery({
    queryKey: ["marketplaceActor"],
  });



  const { mutateAsync:HandleCancel } = useMutation({
    mutationFn: (data) => handleCancel(data),
    onSuccess: async () => {
      // invalidateListings();
      // invalidateUserNfts();
      // invalidateUserBalance();
      // setIsLoading(false);
    },
  });



  // const handleCancel =async (dd)=>{
  //   try {
  //     console.log("cancelled" ,dd);
      
  //   } catch (error) {
  //     console.log("error in canceling offer :",error);
      
  //   }
  // }

  // const { mutateAsync: HandleCancel } = useMutation({
  //   mutationFn: () => handleBuy(),
  //   onSuccess: async () => {
  //     invalidateListings();
  //     invalidateUserNfts();
  //     invalidateUserBalance();
  //     setIsLoading(false);
  //   },
  // });







  return (
    <div className="overflow-x-auto mb-10 bg-[#1B1B1B] p-2 rounded-lg border border-gray-400">
      <h3 className="text-lg">Offers</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {offers?.map((offer, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {shortenAddress(offer?.user?.toString())}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {Number(offer?.expiry_date) / 1e8} ICP
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {convertExpiryDate(Number(offer?.amount))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                <div className="flex flex-col items-center justify-center gap-1">
                  {userPrincipal &&
                    userPrincipal == offer?.user?.toString() && (
                      <button
                       onClick={()=>handleCancel(offer,nft)}
                       className="flex  bg-red-500 p-1 rounded-lg">
                        Cancel
                      </button>
                    )}

                  {userPrincipal && userPrincipal == nftOwner && (
                    <button
                     onClick={()=>handleAccept(offer,nft)}
                     className="flex bg-green-500 p-1 rounded-lg">
                      Accept
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Offers;
