import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import WardenNavbar from "components/Navbars/WardenNavbar"; // Can be replaced with a dedicated CitizenNavbar if necessary

// views
import CitizenDashBoard from "views/citizen/CitizenDashBoard.js";
import Tables from "views/citizen/Tables.js";

export default function Citizen() {
  return (
    <>
      {/* Navbar */}
      <div>
        <WardenNavbar />
      </div>

      {/* Main Content */}
      <div className="bg-blueGray-100 min-h-screen">
        {/* Added margin-top to ensure content is pushed below the navbar */}
        <div className="px-4 md:px-10 mx-auto w-full mt-20"> 
          <Switch>
            <Route path="/citizen/CitizenDashBoard/:citizen_id" exact component={CitizenDashBoard} />
            <Route path="/citizen/tables" exact component={Tables} />
            <Redirect from="/citizen" to="/citizen/CitizenDashBoard" />
          </Switch>
        </div>
      </div>
    </>
  );
}
