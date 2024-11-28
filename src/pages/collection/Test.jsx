import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

// Sample data from originalGenes.js

const FilterSection = ({
  traitsData,
  handleOptionClick,
  handleSectionClick,
  expandedSections,
  selectedOptions,
}) => {
  
  console.log("Selected Options:", selectedOptions);

  return (
    <div className="flex w-full  mt-2 text-white">
      <div className=" flex flex-col h-screen overflow-y-auto w-full  ">
        {traitsData?.map((traitData) => (
          <div key={traitData.trait} className=" ">
            <div
              className="cursor-pointer flex gap-10 mb-4 font-bold justify-between   items-center"
              onClick={() => handleSectionClick(traitData.trait)}
            >
              <span>{traitData.trait}</span>
              <FaAngleDown />
            </div>
            {expandedSections[traitData.trait] && (
              <div className="max-h-64  mb-3 overflow-y-auto">
                {traitData.colors.map((color, index) => {
                  const traitName =
                    traitData.trait === "Background"
                      ? "bg"
                      : traitData.trait.replace(/\s+/g, "").toLowerCase();
                  const id = `${traitName}${index + 1}`;
                  return (
                    <div key={id} className="flex  items-center">
                      <input
                        type="checkbox"
                        id={id}
                        checked={selectedOptions.includes(id)}
                        onChange={() =>
                          handleOptionClick(traitData.trait, color, id)
                        }
                      />
                     
 
                      <div className="flex flex-row w-full text-sm my-2 items-center justify-between">
                        <span>
                        {color.color}


                        </span>
                        <span className="border px-1 rounded-full text-sm">
                        {color.count}
                        </span>


                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
