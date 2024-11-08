import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Login from "../pages/Login";
import pawsarena from "../assets/pawsarena.png";
import { useIdentityKit } from "@nfid/identitykit/react";

const style = {
  wrapper: ` bg-[#121212] fixed z-50 w-full gap-[80px] px-[1.2rem] md:px-[4.2rem] py-[0.8rem] flex items-center justify-between top-0`,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: `ml-[0.8rem] text-white font-semibold text-xl md:text-2xl`,
  searchBar: `hidden md:flex w-[100px]  flex-1 mx-[0.8rem] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: `hidden md:flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
  mobileMenu: `absolute top-16  left-0 bg-[#08111d] z-50 md:hidden`,
  mobileItem: `text-white px-4 py-2  cursor-pointer`,
  mobileDropdownMenu: `absolute top-15 left-0 bg-[#04111d] md:hidden`,
  dropdownMenu: `absolute right-0 z-50 bg-[#04111d] mt-36 rounded shadow-lg`, // Dropdown styles
  dropdownItem: `text-white px-4 py-2  cursor-pointer`, // Dropdown item styles
};

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu

  const {
    agent,
    user,
    disconnect,
  } = useIdentityKit();





  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    console.log("cccccnn");
    
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    // Implement logout functionality here
    disconnect()
     await queryClient.setQueryData(["userPrincipal"], null);

    // await queryClient.invalidateQueries(["userPrincipal"])
    setIsDropdownOpen(false); // Close dropdown after logout
    navigate("/")
  };


  
  useEffect(()=>{
    
     console.log("user :",agent);
  },[agent])

  return (
    <div className={style.wrapper}>
      <div className={style.logoContainer}>
        <img
                  onClick={() => navigate("/")}

         src={pawsarena} height={70} width={70} alt="Logo" />
        {/* <div
          onClick={() => navigate(userPrincipal ? "/dashboard" : "/")}
          className={style.logoText}
        >
          Paws Arena
        </div> */}
      </div>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search collections,nfts, names and traits"
        />
      </div>
      <div className="md:hidden">
        <GiHamburgerMenu
          className="cursor-pointer"
          onClick={()=>toggleMenu}
          color="white"
        />
      </div>
      <div className={style.headerItems}>
        {/* <div
          onClick={() => {navigate("/dashboard");toggleMenu()}}
          className={style.headerItem}
        >
          
          Marketplace
        </div> */}
        <div className={style.headerItem}> Home </div>
        {/* <div className={style.headerItem}> Resources </div> */}
        <div className={style.headerItem}> About </div>
        <div className={style.headerIcon} onClick={toggleDropdown}>
          {user?.principal ? <CgProfile /> : <Login />}
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && user?.principal && (
          <div className={style.dropdownMenu}>
            <div
              className={style.dropdownItem}
              onClick={() => {
                navigate("/profile");
                toggleDropdown();
              }}
            >
              Profile
            </div>
            <div className={style.dropdownItem} onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={style.mobileMenu}>
          <div
            className={style.mobileItem}
            onClick={() =>  {navigate("/dashboard");toggleMenu()}}
          >
            Marketplace
          </div>
          {/* <div
            className={style.mobileItem}
            onClick={() =>  {navigate("/dashboard");toggleMenu()}}
          >
            Stats
          </div> */}
          {/* <div
            className={style.mobileItem}
            onClick={() =>  {navigate("/dashboard");toggleMenu()}}
          >
            Resources
          </div> */}
          {/* <div
            className={style.mobileItem}
            onClick={() =>  {navigate("/dashboard");toggleMenu()}}
          >
            Create
          </div> */}
          <div className={style.mobileItem} onClick={toggleDropdown}>
            {user ? <CgProfile /> : <Login />}
          </div>
          {isDropdownOpen && user && (
            <div className={style.mobileDropdownMenu}>
              <div
                className={style.dropdownItem}
                onClick={() => {
                  navigate("/profile");
                  toggleDropdown();
                  toggleMenu()
                }}
              >
                Profile
              </div>
              <div className={style.dropdownItem} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;