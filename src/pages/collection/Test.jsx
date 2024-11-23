import React, { useState } from "react";

// Sample data from originalGenes.js

const FilterSection = ({

  traitsData,
  handleOptionClick,
                handleSectionClick,
                expandedSections,
                selectedOptions,

}) => {
  
  // const handleSectionClick = (trait) => {
  //   setExpandedSections((prev) => ({
  //     ...prev,
  //     [trait]: !prev[trait],
  //   }));
  // };

  // const handleOptionClick = (trait, color, id) => {
  //   setSelectedOptions((prev) => {
  //     const newOptions = prev.includes(id)
  //       ? prev.filter((option) => option !== id)
  //       : [...prev, id];
  //     return newOptions;
  //   });
  // };

  // Log the selected options
  console.log("Selected Options:", selectedOptions);

  return (
    <div className="flex w-full text-white">
      <div className="w-full">
        {traitsData?.map((traitData) => (
          <div key={traitData.trait} className="">
            <div
              className="cursor-pointer"
              onClick={() => handleSectionClick(traitData.trait)}
            >
              {traitData.trait}
            </div>
            {expandedSections[traitData.trait] && (
              <div className="">
                {traitData.colors.map((color, index) => {
 const traitName = traitData.trait === "Background" ? "bg" : traitData.trait.replace(/\s+/g, '').toLowerCase();
 const id = `${traitName}${index + 1}`;
                 
                 
                  return (
                    <div key={id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={id}
                        checked={selectedOptions.includes(id)}
                        onChange={() => handleOptionClick(traitData.trait, color, id)}
                      />
                      <label htmlFor={id} className="ml-2">
                        {color}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-3/4 p-4">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default FilterSection;