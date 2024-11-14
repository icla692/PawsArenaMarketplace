import { HttpAgent } from "@dfinity/agent";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { MARKETPLACE_CANISTER, NFTCollections } from "../../Utils/constants";
import { createActor } from "../../Utils/createActor";
import { idlFactory } from "../../Utils/paws.did";
import Header from "./Header";
import ListedNFTs from "./ListedNFTs";
import Searchbar from "./Searchbar";
import Card from "./Card";
import { idlFactory as marketIDL } from "../../Utils/markeptlace.did";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const HOST = process.env.DFX_NETWORK !== "ic" ? "https://ic0.app" : "http://localhost:4943";
const agent = new HttpAgent({ host: HOST, retryTimes: 10 });

const CollectionDetails = () => {
    const { collectionID } = useParams();
    const [collectionData, setCollectionData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortPrice, setSortPrice] = useState("lowtohigh");
    const [listedFilter, setListedFilter] = useState("listed");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 50;
    const [listedNfts, setListedNfts] = useState([]);
    const [allTokens, setAllTokens] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const queryClient = useQueryClient();
   
    const { data:bulkData  } = useQuery({
        queryKey: ["bulkData"],
      });

   
    const { data: myTokens, isLoading: dataLoading } = useQuery({ queryKey: ["myTokens"] });

    // const { data: myTokens, isLoading: dataLoading } = useQuery({ queryKey: ["myTokens"] });


      const { data: collectionDetails,isLoading:collectionLoading } = useQuery({
        queryKey: ["collectionDetails"],
      });
    
      

   
    useEffect(() => {
        const fetchNFTDetails = async () => {
            // if (!collectionID) return;
            setIsLoading(true);

            let data = JSON.parse(localStorage.getItem("bulkData"))
            let data2 = JSON.parse(localStorage.getItem("bulkData"))

            console.log("here is the data :",data2);
            

            console.log("xxxxxxxx :",collectionDetails,bulkData);
            
            try {

                const marketActor = createActor(MARKETPLACE_CANISTER, marketIDL, agent);
                const filteredCollection = NFTCollections.find(col => col.canisterId === collectionID);
                const marketNFTsResponse = await marketActor?.get_all_listed_nfts();
                const filteredMarketNFTs = marketNFTsResponse?.data[0]?.filter(nft => nft[1].nft_canister == collectionID) || [];
                
                
                // Prepare NFT IDs
                const nftIds = filteredMarketNFTs?.map(nft => [
                    nft[1].nft_id,
                    {
                        locked: [],
                        seller: nft[1].seller_principal,
                        price: nft[1].nft_price,
                        inhouse_sale: true,
                    },
                ]);
                
                let tokenListings = bulkData?.find((det)=>det[0] == collectionID)
               let colDetails = collectionDetails?.find((det)=>det.canisterId == collectionID)
               
               
               
                // Combine results
                 const combinedListings = [...nftIds];

                //const combinedListings = [...tokenListings[1]?.listings, ...nftIds];
                setListedNfts(combinedListings);
                // Fetch additional stats and tokens
                // const nftStats = await nftActor.stats();
                // const allTokensResponse = await nftActor.getTokens();

                // Create a lookup for easy access to listed NFTs
                const lookup = Object.fromEntries(combinedListings.map(item => [item[0], item]));
                const updatedTokens = tokenListings[1]?.allNftTokens?.map(item => lookup[item[0]] ? lookup[item[0]] : item);

                console.log("all ttt :",updatedTokens);
                
                setAllTokens(updatedTokens);
                 queryClient.setQueryData(["myTokens"], updatedTokens);

                // Prepare collection data for display
                if (filteredCollection) {
                    setCollectionData({
                        imgUrl: colDetails?.imgUrl,
                        canisterId: colDetails?.canisterId,
                        name: colDetails?.name,
                        description: colDetails?.description,
                        volume: colDetails?.volume,
                        floorPrice: colDetails?.floorprice,
                        totalListed: colDetails?.totalListed,
                    });
                }

            
            } catch (error) {
                console.error("Error loading NFT data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNFTDetails();
    }, [collectionID]); // Only re-run when collectionID changes

    // Pagination functions
    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // Sidebar toggle function
    const toggleSidebar = () => {
        if (window.innerWidth < 768) {
            setIsModalOpen(true);
        } else {
            setIsSidebarOpen(prev => !prev);
        }
    };

    // Input change handlers
    const handleMinPriceChange = e => setMinPrice(e.target.value);
    const handleMaxPriceChange = e => setMaxPrice(e.target.value);
    const handleSearchChange = e => setSearchQuery(e.target.value);
    const handlelistedChange = e => setListedFilter(prev =>e.target.value);
    const handleSortPriceChange = e => setSortPrice(e.target.value);

    console.log(listedFilter,minPrice);
    
    // Filtering and sorting logic using memoization for performance
    const finalFilteredData = useMemo(() => {
        let filteredProducts = [...listedNfts]; // Start with a copy of listedNfts
    
        // Filter based on searchQuery
        if (searchQuery) {
            filteredProducts = filteredProducts?.filter(nft =>
                nft[0]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    
        // Apply the listedFilter
        if (listedFilter === "listed") {
            filteredProducts = filteredProducts?.filter(nft => 
                nft[1]?.hasOwnProperty('price')
            );
        } else if (listedFilter === "all") {
            // If listedFilter is "all", we could reset to allTokens if needed
            filteredProducts = allTokens;
            console.log("all tokens :",allTokens);
            
        }
    
        // Apply price filtering if minPrice or maxPrice is set
        if (minPrice) {
            filteredProducts = filteredProducts?.filter(nft =>
                Number(nft[1]?.price) / 1e8 >= parseFloat(minPrice)
            );
        }
    
        if (maxPrice) {
            filteredProducts = filteredProducts?.filter(nft =>
                Number(nft[1]?.price) / 1e8 <= parseFloat(maxPrice)
            );
        }
    
        // Apply sorting based on sortPrice
        if (sortPrice) {
            filteredProducts?.sort((a, b) =>
                sortPrice === "lowtohigh"
                    ? Number(a[1].price) - Number(b[1].price)
                    : Number(b[1].price) - Number(a[1].price)
            );
        }
    
        // Pagination: slice the array for current page
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        console.log("hhhhhhhhhhhhhhhhhh:",filteredProducts);
        
        return filteredProducts?.slice(startIndex, endIndex).map((nft, index) => (
            <Card key={index} nft={nft} collectionID={collectionID} />
        ));
    }, [listedNfts, allTokens, searchQuery, sortPrice, listedFilter, minPrice, maxPrice, currentPage]);
    // Calculate total pages based on all tokens
    const totalPages = Math.ceil(allTokens?.length / itemsPerPage);

    return (
        <>
            <div className="flex flex-col mx-4 min-h-screen md:mx-20 mt-50">
                <Header collectionData={collectionData} isLoading={dataLoading} />
                <Searchbar 
                    prevPage={prevPage}
                    nextPage={nextPage}
                    currentPage={currentPage}
                    sortPrice={sortPrice}
                    pages={totalPages}
                    searchQuery={searchQuery}
                    isModalOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                    handleMaxPriceChange={handleMaxPriceChange}
                    handleMinPriceChange={handleMinPriceChange}
                    toggleSidebar={toggleSidebar}
                    handleSearchChange={handleSearchChange}
                    handleSortPriceChange={handleSortPriceChange}
                    handlelistedChange={handlelistedChange}
                />
                <ListedNFTs 
                    results={finalFilteredData} 
                    isLoading={dataLoading} 
                    maxPrice={maxPrice} 
                    minPrice={minPrice} 
                    isSidebarOpen={isSidebarOpen} 
                    isModalOpen={isModalOpen} 
                    handleMaxPriceChange={handleMaxPriceChange}
                    handleMinPriceChange={handleMinPriceChange}

                    closeModal={() => setIsModalOpen(false)} 
                />
            </div>
        </>
    );
};

export default CollectionDetails;
