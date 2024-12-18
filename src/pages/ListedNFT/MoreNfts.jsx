import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Card from "../collection/Card";

const MoreNfts = ({ collectionID, nftID, nftPrice, nftDetails }) => {
  const [moreNfts, setMoreNfts] = useState([]);
  const { data: myTokens, isLoading: dataLoading } = useQuery({
    queryKey: ["myTokens"],
  });

  // console.log("cccc :", nftPrice);

  //get the nfts from this nft that have the same price range as the nft being listed
  useEffect(() => {
    const getMoreNfts = async () => {
      try {
        // console.log(" gg sd :",myTokens);

        let rangePrice = myTokens
          ?.filter(
            (nft) =>
              (Number(nft[1].price) / 1e8).toFixed(2) > nftPrice - 1 &&
              (Number(nft[1].price) / 1e8).toFixed(2) < nftPrice + 1 &&
              nft[0] != nftID
          )
          .slice(0, 4);

        let cardNts = rangePrice?.map((nft, index) => (
          <Card key={index} nft={nft} collectionID={collectionID} />
        ));
        // console.log("price range :",rangePrice);

        setMoreNfts(cardNts);
      } catch (error) {
        console.log("error in getting more nfts :", error);
      }
    };
    getMoreNfts();
  }, [nftDetails]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full items-center justify-center">
        More NFTS from this collection
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          {/* Display the NFTs */}
          <div className="flex-grow w-full flex mt-6 justify-center items-center flex-wrap">
            {moreNfts}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreNfts;
