import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import CitizenNav from "components/Navbars/CitizenNav"; // Can be replaced with a dedicated CitizenNavbar if necessary

// views
import CitizenDashBoard from "views/citizen/CitizenDashBoard.js";
import Tables from "views/citizen/Tables.js";

export default function CitizenProfile() {
  return (
    <>
      {/* Navbar */}
      <div>
        <CitizenNav />
      </div>
      
      
      
    </>
  );
}
