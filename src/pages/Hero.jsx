import React from "react";
import HH from "../assets/pawsarena.png";
import { useNavigate } from "react-router-dom";
const Hero = () => {

    const navigate = useNavigate()
  return (
    <div
      className="w-full p-4 mt-[80px] flex flex-col md:flex-row items-center text-white "
      id="about"
    >
      {/* Image Section */}

      {/* Text Section */}
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center md:items-start">
        <div className="p-4 md:px-20 flex flex-col items-center md:items-start gap-2">
          <h2 className="text-3xl md:text-7xl uppercase text-start">
            Let's Collect,Trade NFTS from the PawsArena Game
          </h2>

          <div className="flex w-full gap-2 mt-4">
            <button 
                onClick={() => navigate('./collection/rw7qm-eiaaa-aaaak-aaiqq-cai')}

            
            className="flex bg-[#414242] w-1/2 rounded-lg mt-4 font-bold text-white justify-center items-center p-2">
              Explore
            </button>
            {/* <button className="flex bg-[#515355] w-1/2 rounded-lg mt-4 font-bold text-white justify-center items-center p-2">
              Read More
            </button> */}
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-center items-center w-full md:w-1/2">
        <img
          src={HH}
          alt="Meta Owl"
          className="h-[250px] md:h-[550px] rounded-full w-[250px] md:w-[550px]"
        />
      </div>
    </div>
  );
};

export default Hero;
