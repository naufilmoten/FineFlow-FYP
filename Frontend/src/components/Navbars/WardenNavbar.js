import React from "react";
import { FaSearch } from "react-icons/fa";
// import { AiOutlineDashboard } from "react-icons/ai"; // Optional icon for the title
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
        <div className="w-full mx-auto flex justify-between items-center px-6 py-4">
          {/* Brand Title */}
          

          {/* Search Form */}
          <form className="hidden md:flex flex-row items-center space-x-2 lg:ml-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="pl-12 pr-6 py-3 w-80 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-4 focus:ring-indigo-400 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
              />
            </div>
          </form>

          {/* User Dropdown */}
          <ul className="list-none hidden md:flex items-center space-x-6">
            <UserDropdown />
          </ul>
        </div>
      </nav>
    </>
  );
}
