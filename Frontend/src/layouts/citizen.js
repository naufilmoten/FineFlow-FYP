import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { isAuthenticated, getRole } from "utils/auth";

// components
import CitizenNav from "components/Navbars/CitizenNav"; // Change to the correct navbar if needed
import UserDropdown from "components/Dropdowns/UserDropdown"; // Import the UserDropdown component

// views
import CitizenDashBoard from "views/citizen/CitizenDashBoard.js";
import Tables from "views/citizen/Tables.js";
import CitizenProfile from "views/citizen/CitizenProfile"; // Ensure this is imported

export default function Citizen() {
  const history = useHistory();
  const [citizenId, setCitizenId] = useState(null); // Local state for citizenId

  useEffect(() => {
    const id = localStorage.getItem("citizen_id"); // Retrieve the citizenId from local storage
    console.log("Retrieved citizenId from local storage:", id); // Log the retrieved id
    setCitizenId(id); // Set the citizenId in local state

    if (!isAuthenticated() || getRole() !== "citizen") {
      history.push("/auth/login"); // Redirect to login if not authenticated or not a citizen
    }
  }, [history]);

  return (
    <>
      {/* Navbar */}
      <div>
        <CitizenNav citizenId={citizenId} /> {/* Pass citizenId to CitizenNav */}
        {/* Render UserDropdown only if citizenId is defined */}
        {citizenId ? (
          <UserDropdown citizenId={citizenId} />
        ) : (
          <div>Loading User Info...</div> // Optional loading message
        )}
      </div>

      {/* Main Content */}
      
  {/* Ensure no left/right margins and add border radius */}
  <div className="px-0 mx-0 w-full mt-0 rounded-lg" style={{ borderRadius: '20px' }}> {/* Adjust border radius as needed */}
    <Switch>
      <Route path="/citizen/CitizenDashBoard/:citizen_id" exact component={CitizenDashBoard} />
      <Route path="/citizen/profile/:citizen_id" exact component={CitizenProfile} />
      <Route path="/citizen/tables" exact component={Tables} />
      <Redirect from="/citizen" to={citizenId ? `/citizen/CitizenDashBoard/${citizenId}` : "/auth/login"} />
    </Switch>
  </div>


    </>
  );
}
