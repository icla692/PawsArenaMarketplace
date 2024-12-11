import React, { useState } from "react";

const SearchP = ({ selectedTab, handleTabClick }) => {
  const tabStyle = (tab) =>
    `cursor-pointer p-2  ${
      selectedTab === tab
        ? " text-white border-b-4 border-blue-500"
        : "bg-transparent"
    }`;

  return (
    <div className="flex flex-col w-full border-b-2 mt-6 rounded-md">
      <div className="flex flex-row w-full justify-evenly items-center gap-4">
        <div
          className={tabStyle("Collected")}
          onClick={() => handleTabClick("Collected")}
        >
          Collected
        </div>
        <div
          className={tabStyle("Selling")}
          onClick={() => handleTabClick("Selling")}
        >
          Selling
        </div>
        {/* <div
          className={tabStyle("Offers")}
          onClick={() => handleTabClick("Offers")}
        >
          Offers
        </div> */}
        {/* <div
          className={tabStyle("Activity")}
          onClick={() => handleTabClick("Activity")}
        >
          Activity
        </div> */}
      </div>
    </div>
  );
};

export default SearchP;
