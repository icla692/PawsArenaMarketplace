import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ListedNFTDetails from "./pages/ListedNFTDetails";
import OwnerNFTDetails from "./pages/OwnerNFTDetails";
import useFecth from "./Utils/useFecth";

function App() {
  const {invalidateListings} = useFecth()
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="nft/:colId/:nftID" element={<OwnerNFTDetails />} />
        <Route  path="/marketplace/:colID/:nftID" element={<ListedNFTDetails/>}/>

      </Routes>
    </>
  );
}

export default App;
