import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import useFecth from "./Utils/useFecth";
import { IdentityKitProvider, useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { NFIDW } from "@nfid/identitykit";
import { NFTCollections } from "./Utils/constants";
import Footer from "./pages/Footer";
import Index from "./pages/Index";
import Hero from "./pages/Hero";

// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Home = lazy(() => import("./pages/Home"));
const ListedNFTDetails = lazy(() => import("./pages/ListedNFT/ListedNFTDetails"));
const OwnerNFTDetails = lazy(() => import("./pages/OwnerNFTDetails"));
const CollectionDetails = lazy(() => import("./pages/collection/CollectionDetails"));
const TestPage = lazy(()=>import("./pages/ListedNFT/TestPage"));
function App() {
const agent = useAgent()
  const { invalidateListings } = useFecth();
  const {
    isInitializing,
  } = useIdentityKit();
  
  //load all the necessary data at the beginning so as to make the website faster


  return (
    <div className="flex flex-col min-h-screen">
    <IdentityKitProvider
      featuredSigner={[NFIDW]}
      onConnectSuccess={(e) => {
      }}
      >
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/collection/:collectionID" element={<CollectionDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="nft/:colId/:nftID" element={<OwnerNFTDetails />} />
          <Route path="/marketplace/:colID/:nftID" element={<ListedNFTDetails />} />
        </Routes>
      </Suspense>
      <Footer/>
    </IdentityKitProvider>
      </div>
  );
}

export default App;
