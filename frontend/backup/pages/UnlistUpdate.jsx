import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useUpdateFunctions from "../Utils/useUpdateFunctions";

const UnlistUpdate = ({ nftid }) => {
  
  console.log("nft id :",nftid.nftid);
  
  const [newPrice, setNewPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {invalidateMarketplaceListings,invalidateUserNFTS,invalidateUserBalamce} = useUpdateFunctions()

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


  const { mutateAsync: HandleUnList } = useMutation({
    mutationFn: () => handleUnlist(),
    onSuccess: async () => {
      await invalidateMarketplaceListings();
      await invalidateUserBalamce();
      await invalidateUserNFTS();
    },
  });


  const { mutateAsync: HandleSubmit } = useMutation({
    mutationFn: () => handleSubmit(),
    onSuccess: async () => {
      await invalidateMarketplaceListings();
      await invalidateUserBalamce();
      await invalidateUserNFTS();
    },
  });




  const handleUnlist = async () => {
    try {
      let res = await marketplaceActor.un_list_nft(nftid);
      console.log("unlisting res :", res);
    } catch (error) {
      console.log("error in unlisting token :", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("new price : ", newPrice);

   if(!window.confirm("Update the price of the nft")) return
    let res = await marketplaceActor.update_nft_price(
      nftid,
      parseInt(newPrice * 1e8)
    );
    console.log("update results :", res);
  };

  return (
    <div>
      <div className="flex flex-row gap-2 mt-3 ">
        <button
          className="flex bg-gray-300 text-gray-700 border border-gray-300 p-1 rounded-md "
          onClick={() => HandleUnList()}
        >
          Unlist
        </button>
        <button
          className="flex bg-gray-300 text-gray-700 border border-gray-300 p-1 rounded-md "
          onClick={() => setIsModalOpen(true)}
        >
          Update
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Update NFT Price</h2>
            <form onSubmit={HandleSubmit}>
              <label className="block mb-2" htmlFor="price">
                New Price (in tokens):
              </label>
              <input
                type="number"
                id="price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-4"
                required
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Update Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnlistUpdate;
