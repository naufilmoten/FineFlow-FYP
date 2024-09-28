import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import WardenNavbar from "components/Navbars/WardenNavbar"; // You might want to replace this with a CitizenNavbar if you have one
import Sidebar from "components/Sidebar/Sidebar.js";

// views
import CitizenDashBoard from "views/citizen/CitizenDashBoard.js";
import Tables from "views/citizen/Tables.js";

export default function Citizen() {
  return (
    <>
      <div>
        <WardenNavbar />
      </div>

      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen">
        <div className="px-4 md:px-10 mx-auto w-full mt-20 -m-24"> {/* Added margin-top to avoid overlap */}
          <Switch>
            <Route path="/citizen/CitizenDashBoard/:citizen_id" exact component={CitizenDashBoard} />
            <Route path="/citizen/tables" exact component={Tables} />
            <Redirect from="/citizen" to="/citizen/CitizenDashBoard" />
          </Switch>
        </div>
      </div>
      
      {/* Sidebar */}
      <Sidebar />
    </>
  );
}

