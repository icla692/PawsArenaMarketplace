import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Login from "../pages/Login";
import pawsarena from "../assets/pawsarena.png";
import { useIdentityKit } from "@nfid/identitykit/react";
import { LuLogOut } from "react-icons/lu";

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
  mobileMenu: `absolute top-[60px] flex text-start px-2 justify-start items-start flex-col right-0 bg-[#08111d] border rounded-lg  z-50 md:hidden`,
  mobileItem: `text-white text-start  py-1  cursor-pointer`,
  mobileDropdownMenu: `absolute top-15 left-0 border rounded-lg bg-[#04111d] md:hidden`,
  dropdownMenu: `absolute right-0 md:right-16 top-16 z-50 bg-red-400 rounded shadow-lg`, // Dropdown styles
  dropdownItem: `text-white  cursor-pointer`, // Dropdown item styles
};

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu

  const { agent, user, disconnect } = useIdentityKit();

  const { data: userPrincipal } = useQuery({
    queryKey: ["userPrincipal"],
  });

  const toggleMenu = () => {
    console.log("dd");

    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    // Implement logout functionality here
    disconnect();
    await queryClient.setQueryData(["userPrincipal"], null);

    // await queryClient.invalidateQueries(["userPrincipal"])
    setIsDropdownOpen(false); // Close dropdown after logout
    navigate("/");
  };

  useEffect(() => {
    console.log("user :", agent);
  }, [agent]);

  return (
    <div className={style.wrapper}>
      <div className={style.logoContainer}>
        <img
          onClick={() => navigate("/")}
          src={pawsarena}
          height={70}
          width={70}
          alt="Logo"
        />
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
          onClick={() => toggleMenu()}
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
        <div className={style.headerItem} onClick={()=>navigate("/")}> Home </div>
        {/* <div className={style.headerItem}> Resources </div> */}
        <div className={style.headerItem}> About </div>
        <div onClick={()=>navigate("/load")} className={style.headerItem}> Load </div>

        <div className={style.headerItem} onClick={toggleDropdown}>
          {user?.principal ? (
            <div className="flex flex-row justify-center border px-4 py-1 rounded-md items-center gap-8">
              <CgProfile
                size={25}
                onClick={() => {
                  navigate("/profile");
                }}
              />
              <LuLogOut onClick={handleLogout} size={23} />

            </div>
          ) : (
            <Login />
          )}
        </div>

        {/* Dropdown Menu */}
        {/* {isDropdownOpen && user && (
          <div className={style.dropdownMenu}>
            <div
              className={style.dropdownItem}
              onClick={() => {
                navigate("/profile");
                // toggleDropdown();
              }}
            >
              Profile
            </div>

            <div className={style.dropdownItem} onClick={handleLogout}>
              <LuLogOut size={25} />
            </div>
          </div>
        )} */}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={style.mobileMenu}>
          <div
            className={style.mobileItem}
            onClick={() => {
              navigate("/");
              toggleMenu();
            }}
          >
            Home
          </div>
          <div
            className={style.mobileItem}
            onClick={() => {
              navigate("/");
              toggleMenu();
            }}
          >
            About
          </div>

          <div className={style.mobileItem} onClick={toggleDropdown}>
            {user?.principal ? (
              <>
                <div
                  className={style.dropdownItem}
                  onClick={() => {
                    navigate("/profile");
                    toggleDropdown();
                    toggleMenu();
                  }}
                >
                  Profile
                </div>
                <div className="cursor-pointer mt-3" onClick={handleLogout}>
                  <LuLogOut size={25} />
                </div>
              </>
            ) : (
              <Login />
            )}
          </div>

          {/* {isDropdownOpen && user && (
            <div className={style.mobileDropdownMenu}>
              <div
                className={style.dropdownItem}
                onClick={() => {
                  navigate("/profile");
                  toggleDropdown();
                  toggleMenu();
                }}
              >
                Profile
              </div>
              <div className={style.dropdownItem} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
