import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import WardenNavbar from "components/Navbars/WardenNavbar";

// views
import WardenDashBoard from "views/warden/WardenDashBoard.js";

export default function Warden() {
  return (
    <>
      {/* Navbar */}
      <div>
        <WardenNavbar />
      </div>

      {/* Main Content Wrapper without Sidebar */}
      <div className="bg-blueGray-100 min-h-screen">
        {/* Content Area */}
        <div className="px-4 md:px-10 mx-auto w-full">
          <Switch>
            {/* Route for Warden Dashboard */}
            <Route path="/warden/WardenDashBoard/:warden_id" exact component={WardenDashBoard} />

            {/* Redirect to the dashboard by default */}
            <Redirect from="/warden" to="/warden/WardenDashBoard" />
          </Switch>
        </div>
      </div>
    </>
  );
}
