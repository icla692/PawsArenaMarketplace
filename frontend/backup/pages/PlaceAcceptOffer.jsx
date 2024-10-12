import {useQuery } from "@tanstack/react-query";
import React from "react";
// import useUpdateFunctions from "../Utils/useUpdateFunctions";
const PlaceAcceptOffer = (tokenId) => {
  // const {
  //   HandleBuy
  // } = useUpdateFunctions();

  
  return (
    <div className="flex flex-row gap-3 p-2">
      <button
        //  onClick={() => HandleBuy(tokenId)}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
      >
        Buy now
      </button>
      <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
        Place Offer
      </button>
    </div>
  );
};

export default PlaceAcceptOffer;
