import React from "react";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-white bg-slate-500 py-6 mt-auto border-t-1">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between md items-start">
          <div className="mb-4 md:mb-0">
            <h5 className="text-lg font-bold">PawsArena</h5>
            <p className="text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          {/* <ul className="flex space-x-1 flex-col md:flex-row  md:space-x-4">
            <li className="flex items-center">
              <FaHome className="mr-1" />
              <a href="#" className="hover:text-gray-400">
                Website
              </a>
            </li>
            <li className="flex items-center">
              <FaInfoCircle className="mr-1" />
              <a href="#" className="hover:text-gray-400">
                Youtube
              </a>
            </li>
            <li className="flex items-center">
              <FaServicestack className="mr-1" />
              <a href="#" className="hover:text-gray-400">
                Twitter
              </a>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-1" />
              <a href="#" className="hover:text-gray-400">
                Discord
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
