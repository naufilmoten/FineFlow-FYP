/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              FINE FLOW
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
              {/* <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-auth-navbar"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  Docs
                </a>
              </li> */}
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                E-CHALLAN
                {/* <PagesDropdown /> */}
              </li>
              <li className="flex items-center">
                {/* <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2"></span>
                </a> */}
              </li>

              <li className="flex items-center">
                {/* <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2"> </span>
                </a> */}
              </li>

              <li className="flex items-center">
                {/* <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/creativetimofficial/notus-react?ref=nr-auth-navbar"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2"></span>
                </a> */}
              </li>

              <li className="flex items-center">
                {/* <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Download
                </button> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
// import React, { useState } from 'react';
// import close from 'assets/img/close.svg';
// import menu from 'assets/img/menu.svg';
// import logo from 'assets/img/logo.svg';
// import { navLinks } from './constants';

// const AuthNavbar = () => {
//   const [toggle, setToggle] = useState(false); // State to manage mobile menu toggle

//   return (
//     <nav className="w-full flex py-6 justify-between items-center navbar">
//       <img src={logo} alt="Logo" className="w-[124px] h-[32px]" />
      
//       {/* Desktop Navigation Links */}
//       <ul className="list-none sm:flex hidden justify-end items-center flex-1">
//         {navLinks.map((el, index) => (
//           <li key={el.id} className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-white`}>
//             <a href={`#${el.id}`}>
//               {el.title}
//             </a>
//           </li>
//         ))}
//       </ul>

//       {/* Mobile Menu Button */}
//       <div className="sm:hidden flex flex-1 justify-end items-center">
//         <img
//           src={toggle ? close : menu} // Toggle between menu and close icons
//           alt="Menu"
//           className={`w-[28px] h-[28px] object-contain transition-transform duration-300 ${toggle ? 'rotate-180' : 'rotate-0'}`} // Rotate effect
//           onClick={() => setToggle((prev) => !prev)} // Toggle function
//         />

//         {/* Mobile Navigation Links */}
//         <div className={`absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl bg-black-gradient transition-all duration-300 ease-in-out transform ${toggle ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'}`}>
//           <ul className="list-none flex flex-col justify-end items-center flex-1 p-6">
//             {navLinks.map((el, index) => (
//               <li key={el.id} className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mb-4'} text-white`}>
//                 <a href={`#${el.id}`}>
//                   {el.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default AuthNavbar; // Export the component for use in other files
