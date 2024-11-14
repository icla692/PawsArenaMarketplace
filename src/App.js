import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import useFecth from "./Utils/useFecth";
import {
  IdentityKitProvider,
  useAgent,
  useIdentityKit,
} from "@nfid/identitykit/react";
import { NFIDW } from "@nfid/identitykit";
import Footer from "./pages/Footer";
import { ClipLoader } from "react-spinners";
import Error from "./pages/Error";

// Lazy load pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Home = lazy(() => import("./pages/Home"));
const ListedNFTDetails = lazy(() =>
  import("./pages/ListedNFT/ListedNFTDetails")
);
const CollectionDetails = lazy(() =>
  import("./pages/collection/CollectionDetails")
);
function App() {
  const agent = useAgent();
  const { invalidateListings } = useFecth();
  const { isInitializing } = useIdentityKit();

  //load all the necessary data at the beginning so as to make the website faster

  return (
    <>
      <IdentityKitProvider
        featuredSigner={[NFIDW]}
        onConnectSuccess={(e) => {}}
      >
        <Navbar />
        <Suspense
          fallback={
            <div className="flex h-screen justify-center items-center w-full">
              <ClipLoader color="white" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/collection/:collectionID"
              element={<CollectionDetails />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/marketplace/:colID/:nftID"
              element={<ListedNFTDetails />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
        <Footer />
      </IdentityKitProvider>
    </>
  );
}

export default App;
