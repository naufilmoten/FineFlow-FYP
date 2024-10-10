import React from "react";
import { Link } from "react-router-dom";
// Import your logo image
import logo from "assets/img/logo2.svg"; // Update the path as necessary

// components
import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

// Custom Navbar component
export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/auth"
              className="flex items-center ml-[-10px]" // Adjust margin as needed
            >
              <img
                src={logo}
                alt="Logo" // Add alt text for accessibility
                className="h-20 md:h-24" // Adjust height for mobile and larger screens
              />
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              {/* Other nav items can go here */}
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {/* Removed signup button */}
              {/* Other list items */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
