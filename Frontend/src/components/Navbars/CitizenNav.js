import React from "react";
import { FaSearch } from "react-icons/fa"; // Importing search icon
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { useHistory } from "react-router-dom"; // Import useHistory

export default function CitizenNavbar({ citizenId }) { // Accept citizenId as a prop
  const history = useHistory(); // Initialize useHistory

  const handleDashboardClick = () => {
    history.push("/citizen/dashboard"); // Navigate to the dashboard
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-10 bg-blueGray-800 flex items-center p-4 shadow-md">
        <div className="w-full mx-auto flex justify-between items-center px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase font-semibold cursor-pointer"
            onClick={handleDashboardClick}
          >
            Citizen Dashboard
          </a>

          {/* Search Form */}
          <form className="flex items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="absolute left-0 flex items-center pl-3">
                <FaSearch className="text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="border-0 px-3 py-3 placeholder-gray-300 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>

          {/* User Dropdown */}
          <ul className="flex-col list-none items-center hidden md:flex">
            <UserDropdown citizenId={citizenId} /> {/* Pass the citizenId prop here */}
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
