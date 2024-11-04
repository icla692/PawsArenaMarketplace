import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const Header = ({ collectionData, isLoading }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

console.log("dddd :",collectionData);
    

    return (
        <div className="flex flex-col mt-[80px]">
            {collectionData &&  !isLoading? (
                <div
                    key={collectionData?.canisterId}
                    className="relative rounded w-full object-cover mx-auto"
                >
                    <div className="overflow-hidden h-[200px] w-full">
                        <img
                            src={collectionData.imgUrl}
                            alt={collectionData.name}
                            className="w-full rounded-lg h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 text-white p-2">
                            <div className="flex flex-col md:flex-row justify-between items-end">
                            <h2 className="text-xl font-bold">{collectionData.name}</h2>

                                <div className="flex  flex-row justify-between gap-4 mt-1">
                                    <div className="flex flex-col">
                                        <span>Volume</span>
                                        <span>{(Number(collectionData.volume) / 10e10).toFixed(2)}k</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>Listings</span>
                                        <span>{Number(collectionData.totalListed)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>Floor Price</span>
                                        <span>{(Number(collectionData.floorPrice) / 1e8).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  
                </div>
            ) : (
                <div className="flex flex-col mt-[80px] justify-center items-center">
                    <ClipLoader size={25} color="white" />
                </div>
            )}
            {collectionData && !isLoading && (
                <div className="mx-4 p-4 flex flex-col justify-center items-center">
                    <div className="text-white text-center">
                        {isExpanded
                            ? collectionData?.description
                            : `${collectionData?.description.slice(0, 150)}...`}
                    </div>
                    <button
                        onClick={toggleDescription}
                        className="text-white text-md font-bold flex justify-center items-center hover:underline mt-2"
                    >
                        {isExpanded ? "See Less" : "See More"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
