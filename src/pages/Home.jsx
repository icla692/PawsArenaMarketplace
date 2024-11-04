import React from "react";

import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFecth from "../Utils/useFecth";
const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {invalidateListings} = useFecth()


  const { data: bulkData,isLoading } = useQuery({
    queryKey: ["bulkData"],
  });



  const { data: collectionDetails,isLoading:collectionLoading } = useQuery({
    queryKey: ["collectionDetails"],
  });


  console.log("collection details :",bulkData,isLoading,collectionDetails);
  

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
