import React from "react";
import { IoFilter } from "react-icons/io5";
import Button from "../../Utils/Button";
import { IoMdSearch } from "react-icons/io";
import FilterSection from "./Test";

const Searchbar = ({
  currentPage,
  nextPage,
  pages,
  prevPage,
  searchQuery,
  sortPrice,
  isModalOpen,
  toggleSidebar,
  closeModal,
  handlelistedChange,
  handleSortPriceChange,
  handleSearchChange,
  maxPrice,
  minPrice,
  handleMaxPriceChange,
  handleMinPriceChange,
  traitsData,
  handleOptionClick,
  handleSectionClick,
  expandedSections,
  selectedOptions,
  setExpandedSections,
  setSelectedOptions,
}) => {
  return (
    <div className="flex flex-col w-full gap-4 p-2">
      <div className="flex mt-[05px] cursor-pointer border-b-[1px] pb-2 border-white flex-row justify-between items-center w-full">
        <IoFilter size={35} color="white" onClick={toggleSidebar} />

        <div className="hidden md:block relative ">
          {/* Left Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IoMdSearch color="gray" size={25} />
          </div>
          {/* Input Field */}
          <input
            type="text"
            className="hidden md:block bg-transparent border outline-none border-gray-300 text-white rounded-lg w-full pl-10 p-2.5"
            placeholder="Search by NFT number"
            onChange={handleSearchChange}
            value={searchQuery}
          />
        </div>

        <div className="hidden md:flex md:flex-row gap-2">
          <select
            value={sortPrice}
            onChange={handleSortPriceChange}
            className=" block bg-transparent  text-white  w-full p-3 border rounded-lg"
          >
            <option value="lowtohigh" className="bg-red-400">
              Price Low to High
            </option>
            <option value="hightolow">Price High to Low</option>
            <option value="rarityindexasc">NFT Rarity Index(Asc)</option>
            <option value="rarityindexdesc">NFT Rarity Index(Desc)</option>


          </select>
          {/* {
            pages && pages?.map((page)=>(
              <div>{page}</div>
            ))
          } */}
        </div>
      </div>
      <div className="hidden md:flex-row md:block justify-between items-center cursor-pointer">
        <div className="flex flex-row justify-between items-center ">
          <div className="flex mt-4">
            <Button
              onClickHandler={handlelistedChange}
              value="all"
              title="All"
            />
            <Button
              onClickHandler={handlelistedChange}
              value="listed"
              title="Listed"
            />
            {/* <Button
              onClickHandler={handlelistedChange}
              value="reset"
              title="Reset"
            /> */}
          </div>
          <div className="flex gap-4 items-center justify-center mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`px-4 py-1 bg-transparent border text-white rounded ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage >= pages - 1}
              className={`px-4 py-1 bg-transparent border text-white rounded ${
                currentPage >= pages - 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 mt-[10vh] bg-gray-800 bg-opacity-70 flex justify-center items-center z-50 h-[100vh] overflow-y-scroll">
          <div className="bg-[#202020] mt-[60vh] p-4 rounded-lg w-[90%] md:w-[400px]">
            <div className="flex w-full justify-between items-center">
              <h2 className="text-lg font-bold text-white mb-2">Filter</h2>
              <button
                onClick={closeModal}
                className="text-red-400 font-bold float-right cursor-pointer text-lg"
              >
                X
              </button>
            </div>
            {/* Search Bar in Modal */}
            <input
              type="text"
              placeholder="Search by nft number"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-1 rounded outline-none bg-gray-300 border-none mt-6 w-full"
            />

            <div className=" md:block  mt-6 justify-between items-center cursor-pointer">
              <div>
                <Button
                  onClickHandler={handlelistedChange}
                  value="all"
                  title="All"
                />
                <Button
                  onClickHandler={handlelistedChange}
                  value="listed"
                  title="Listed"
                />
                <Button
                  onClickHandler={handlelistedChange}
                  value="hasoffers"
                  title="Has Offers"
                />
              </div>
              <div className="flex gap-4 items-center justify-between mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`px-4 py-1 bg-transparent border text-white rounded ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage >= pages - 1}
            className={`px-4 py-1 bg-transparent border text-white rounded ${
              currentPage >= pages - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
            </div>

            {/* Sort Options in Modal */}
            <select
              value={sortPrice}
              onChange={handleSortPriceChange}
              className="mt-4 block bg-gray-300 text-black w-full p-2 border rounded"
            >
              <option value="lowtohigh">Price Low to High</option>
              <option value="hightolow">Price High to Low</option>
            </select>

            {/* Price Filter in Modal */}
            <div className="flex flex-col mt-4">
              <span className="text-white">Price</span>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Min"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="p-1 rounded border-none bg-gray-300 outline-none text-black"
                  required
                />
                <input
                  type="text"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className="p-1 rounded bg-gray-300 border-none outline-none text-black"
                  required
                />
              </div>

              {/* Traits Section in Modal */}
              <div className="flex flex-col mt-4">
                <span className="text-white">Traits</span>

                <FilterSection
                  traitsData={traitsData}
                  handleOptionClick={handleOptionClick}
                  handleSectionClick={handleSectionClick}
                  expandedSections={expandedSections}
                  selectedOptions={selectedOptions}
                  setExpandedSections={setExpandedSections}
                  setSelectedOptions={setSelectedOptions}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
