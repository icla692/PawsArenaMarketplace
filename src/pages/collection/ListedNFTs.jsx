import { HttpAgent } from "@dfinity/agent";
import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { createActor } from "../../Utils/createActor";
import {
  MARKETPLACE_CANISTER,
  NFTCollections,
  PAWS_ARENA_CANISTER,
} from "../../Utils/constants";
import { idlFactory } from "../../Utils/paws.did";
import { idlFactory as marketIDL } from "../../Utils/markeptlace.did";
import { computeExtTokenIdentifier } from "../../Utils/tid";
import BuyNow from "../BuyNow";
import Card from "./Card";
import Sidebar from "./Sidebar";
import { ClipLoader } from "react-spinners";
import FilterSection from "./Test";
const ListedNFTs = ({
  results,
  isSidebarOpen,
  isLoading,
  minPrice,
  maxPrice,
  handleMinPriceChange,
  handleMaxPriceChange,
  collectionID,
  traitsData,
  handleOptionClick,
  handleSectionClick,
  expandedSections,
  selectedOptions,
  setExpandedSections,
  setSelectedOptions,
}) => {
  return (
    <div className="flex  w-full  text-white gap-3 border-gray-400 p-2">
      {isSidebarOpen && (
        <div className="hidden md:block border border-gray-600 p-4 w-1/4">
          <div className="flex txt-black flex-col mt-4">
            <span>Price</span>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Min"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="p-1 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Max"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="p-1 rounded text-black"
                required
              />
            </div>

            <div className="flex flex-col mt-4">
              {/* <span>Traits</span> */}
              {collectionID === "rw7qm-eiaaa-aaaak-aaiqq-cai" && (
                <FilterSection
                  traitsData={traitsData}
                  handleOptionClick={handleOptionClick}
                  handleSectionClick={handleSectionClick}
                  expandedSections={expandedSections}
                  selectedOptions={selectedOptions}
                  setExpandedSections={setExpandedSections}
                  setSelectedOptions={setSelectedOptions}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <div className="flex-grow w-full flex  justify-center items-center flex-wrap">
            {isLoading ? <ClipLoader size={25} color="white" /> : results}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListedNFTs;
