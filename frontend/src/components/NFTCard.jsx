import { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { PAWS_ARENA_CANISTER } from "../Utils/constants";
import BuyNow from "../pages/BuyNow";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const style = {
  wrapper: `bg-[#212121] w-[200px] mb-3 rounded-md overflow-hidden group`, // Added group class
  imgContainer: `h-40 bg-red-400 sm:h-32 md:h-36 w-full bg-[#121212] flex justify-center items-center overflow-hidden`,
  nftImg: `w-[200px] h-48 ml-[3px] mt-[3px] rounded-t-md cursor-pointer object-cover`,
  info: `flex justify-between text-white drop-shadow-xl ml-2 mr-2`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-white`,
  assetName: `font-bold mt-1`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-white`,
  priceValue: `flex items-center text-lg sm:text-xl md:text-2xl font-bold mt-1`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-2`,
  likeIcon: `text-xl mr-2`,
  buyButtonContainer: `opacity-0 group-hover:opacity-100 transition-opacity duration-300`, // Hidden by default, visible on hover
};

const NFTCard = ({ nft }) => {
  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const navigate = useNavigate();

  return (
    <div className={style.wrapper}>
      <img
        src={`https://${nft[1].nft_canister}.raw.icp0.io/?tokenid=${nft[1].token_identifier}&type=thumbnail`}
        alt=""
        onClick={() =>
          navigate(
            `../marketplace/` + nft[1].nft_canister + "/" + nft[1].nft_id
          )
        }
        className={style.nftImg}
      />
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>
              {Object.keys(nft[1].nft_category)}
            </div>
            <div className={style.priceTag}>
              {Number(nft[1].nft_price) / 1e8} ICP
            </div>
          </div>
          <div className={style.infoRight}>
            <div className={style.assetName}>#{nft[1].nft_id} </div>
          </div>
        </div>

        {/* BuyNow button container */}
        <div className={style.buyButtonContainer}>
          <BuyNow 
            nftid={nft[0]} 
            nft_price={Number(nft[1].nft_price)} 
            userP={nft[1].seller_principal} 
          />
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
