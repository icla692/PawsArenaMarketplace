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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
