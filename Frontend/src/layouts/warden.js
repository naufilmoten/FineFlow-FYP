
import React, {useEffect} from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";


// components
import WardenNavbar from "components/Navbars/WardenNavbar";

// views
import WardenDashBoard from "views/warden/WardenDashBoard.js";
import { isAuthenticated, getRole } from "utils/auth"; // Import utility functions

export default function Warden() {
  const history = useHistory();
  
  useEffect(() => {
    if (!isAuthenticated() || getRole() !== "warden") {
      history.push("/auth/login"); // Redirect to login if not authenticated or not a warden
    }
  }, [history]);

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
            
            {/* Redirect for the main warden route */}
            <Redirect from="/warden" to="/warden/WardenDashBoard" />
          </Switch>
        </div>
      </div>
    </>
  );
}
