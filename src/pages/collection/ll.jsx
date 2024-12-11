import React, { useState } from 'react';

// Sample NFT data structure
const sampleNFTs = [
  { id: 1, imageUrl: 'image1.jpg', price: 2.5, nriIndex: 80 },
  { id: 2, imageUrl: 'image2.jpg', price: 1.0, nriIndex: 90 },
  { id: 3, imageUrl: 'image3.jpg', price: 3.0, nriIndex: 70 },
  { id: 4, imageUrl: 'image4.jpg', price: 2.0, nriIndex: 85 },
  { id: 5, imageUrl: 'image5.jpg', price: 4.5, nriIndex: 75 },
  { id: 6, imageUrl: 'image6.jpg', price: 1.5, nriIndex: 95 },
];

const NFTCollection = () => {
  const [nfts, setNfts] = useState(sampleNFTs);
  const [sortBy, setSortBy] = useState('priceLowToHigh');
  const [columns, setColumns] = useState(4); // Default to displaying 4 NFTs per row

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    sortNFTs(event.target.value);
  };

  const sortNFTs = (criteria) => {
    let sortedNFTs;
    if (criteria === 'priceLowToHigh') {
      sortedNFTs = [...nfts].sort((a, b) => a.price - b.price);
    } else if (criteria === 'priceHighToLow') {
      sortedNFTs = [...nfts].sort((a, b) => b.price - a.price);
    } else if (criteria === 'nriIndex') {
      sortedNFTs = [...nfts].sort((a, b) => b.nriIndex - a.nriIndex);
    }
    setNfts(sortedNFTs);
  };

  const handleColumnChange = (numColumns) => {
    setColumns(numColumns);
  };

  return (
    <div className="flex">
      {/* Filters Section */}
      <div className="xs:hidden w-1/4 p-4 border border-gray-300 rounded bg-gray-100">
        <h2 className="text-lg font-bold mb-2">Filters</h2>
        <label className="block mb-2">
          Sort By:
          <select value={sortBy} onChange={handleSortChange} className="mt-1 block w-full p-2 border rounded">
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="nriIndex">NRI Index</option>
          </select>
        </label>

        {/* Column Selection Buttons */}
        <div className="mt-4">
          <h3 className="font-bold mb-2">Display:</h3>
          <button 
            onClick={() => handleColumnChange(4)} 
            className={`mr-2 p-2 border rounded ${columns === 4 ? 'bg-blue-500 text-white' : ''}`}
          >
            4 per row
          </button>
          <button 
            onClick={() => handleColumnChange(8)} 
            className={`p-2 border rounded ${columns === 8 ? 'bg-blue-500 text-white' : ''}`}
          >
            8 per row
          </button>
        </div>
      </div>

      {/* NFT Cards Section */}
      <div className={`w-3/4 p-4 flex flex-wrap justify-center`}>
        {nfts.map((nft) => (
          <div key={nft.id} className="m-4 p-4 border border-gray-300 rounded bg-white w-[250px]"> {/* Set specific width for the card */}
            <img src={nft.imageUrl} alt={`NFT ${nft.id}`} className="w-full h-[200px] object-cover rounded mb-2" />
            <h3 className="text-lg font-bold">Price: ${nft.price.toFixed(2)}</h3>
            <p>ID: {nft.id}</p>
            <p>NRI Index: {nft.nriIndex}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTCollection;
