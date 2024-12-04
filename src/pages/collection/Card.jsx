import React from "react";
import BuyNow from "../BuyNow";
import { computeExtTokenIdentifier } from "../../Utils/tid";
import { useNavigate } from "react-router-dom";
import ICPlogo from "../../assets/icplogo.png";
import BuyNft from "../ListedNFT/BuyNFT";
import Rarity from "../../rarity.json";
const Card = ({ collectionID, nft }) => {
  const navigate = useNavigate();
  return (
    <div
      key={nft.id}
      className=" rounded bg-[#202020] w-[250px] m-2 rounded-b-lg"
    >
      <img
        onClick={() =>
          navigate(`../marketplace/` + collectionID + "/" + nft[0])
        }
        src={`https://${collectionID}.raw.icp0.io/?tokenid=${computeExtTokenIdentifier(
          nft[0],
          collectionID
        )}&type=thumbnail`}
        alt={`NFT`}
        className="w-[100%] ml-[2.5px] cursor-pointer  object-cover"
      />

      <span className="flex px-2 mb-1 border-b-[1px]">
      <p>#{Number(nft[0]) + 1}</p>

      </span>
      <div className="flex w-full px-2 justify-between">
        <span className="flex text-sm">

      NRI: {(Rarity[Number(nft[0])] * 100).toFixed(1)}%{" "}
        </span>
      {/* {nft[1].price != undefined ? 
        
        "listed" : "unlisted"
      } */}

        {nft[1]?.price ? (
          <div className="flex gap-1">
            <img src={ICPlogo} height="7px" width="15px" alt="logo" />
            <span>{(Number(nft[1]?.price) / 1e8)?.toFixed(3)}</span>
          </div>
        ) : (
          "unlisted"
        )}
      </div>
      {/* <div
      className="flex w-full justify-center items-center "
        // className={`opacity-0 ${
        //   nft[1].price != undefined && "hover:opacity-100"
        // } transition-opacity duration-300 w-full`}
      >
        {nft[1].price != undefined ? 
        
        "listed" : "unlisted"
      }
      </div> */}
    </div>
  );
};

export default Card;
