// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// // components
// import WardenNavbar from "components/Navbars/WardenNavbar"; // You might want to replace this with a CitizenNavbar if you have one
// import Sidebar from "components/Sidebar/Sidebar.js";

// // views
// import CitizenDashBoard from "views/citizen/CitizenDashBoard.js";
// import Tables from "views/citizen/Tables.js";

// export default function Citizen() {
//   return (
//     <>
//       <div>
//         <WardenNavbar />
//       </div>

//       <div className="relative md:ml-64 bg-blueGray-100 min-h-screen">
//         <div className="px-4 md:px-10 mx-auto w-full mt-20 -m-24"> {/* Added margin-top to avoid overlap */}
//           <Switch>
//             <Route path="/citizen/CitizenDashBoard/:citizen_id" exact component={CitizenDashBoard} />
//             <Route path="/citizen/tables" exact component={Tables} />
//             <Redirect from="/citizen" to="/citizen/CitizenDashBoard" />
//           </Switch>
//         </div>
//       </div>
      
//       {/* Sidebar */}
//       <Sidebar />
//     </>
//   );
// }


// // layout/citizen.js
// import React, { useEffect } from "react";
// import { Switch, Route, Redirect, useHistory } from "react-router-dom";

// // components
// import WardenNavbar from "components/Navbars/WardenNavbar"; // Can be replaced with a dedicated CitizenNavbar if necessary

// // views
// import CitizenDashBoard from "views/citizen/CitizenDashBoard.js";
// import Tables from "views/citizen/Tables.js";
// import { isAuthenticated, getRole } from "utils/auth"; // Import utility functions

// export default function Citizen() {
//   const history = useHistory();

  
//   useEffect(() => {
//     if (!isAuthenticated() || getRole() !== "citizen") {
//       history.push("/auth/login"); // Redirect to login if not authenticated or not a citizen
//     }
//   }, [history]);

//   return (
//     <>
//       {/* Navbar */}
//       <div>
//         <WardenNavbar />
//       </div>

//       <div className="relative md:ml-64 bg-blueGray-100 min-h-screen">
//         <div className="px-4 md:px-10 mx-auto w-full mt-20 -m-24"> {/* Added margin-top to avoid overlap */}
//           <Switch>
//             <Route path="/citizen/CitizenDashBoard/ :citizen_id" exact component={CitizenDashBoard} />
//             <Route path="/citizen/tables" exact component={Tables} />
//             <Redirect from="/citizen" to="/citizen/CitizenDashBoard" />
//           </Switch>
//         </div>
//       </div>
//     </>
//   );
// }



import React, {useEffect} from "react";
import { Switch, Route, Redirect , useHistory} from "react-router-dom";
import { isAuthenticated, getRole } from "utils/auth";

// components
import CitizenNav from "components/Navbars/CitizenNav"; // Can be replaced with a dedicated CitizenNavbar if necessary

// views
import CitizenDashBoard from "views/citizen/CitizenDashBoard.js";
import Tables from "views/citizen/Tables.js";
import CitizenProfile from "views/citizen/CitizenProfile";

export default function Citizen() {
  const history = useHistory();

  useEffect(() => {
        if (!isAuthenticated() || getRole() !== "citizen") {
          history.push("/auth/login"); // Redirect to login if not authenticated or not a citizen
        }
      }, [history]);
  return (
    <>
      {/* Navbar */}
      <div>
        <CitizenNav />
      </div>

      {/* Main Content */}
      <div className="bg-blueGray-100 min-h-screen">
        {/* Added margin-top to ensure content is pushed below the navbar */}
        <div className="px-4 md:px-10 mx-auto w-full mt-20"> 
          <Switch>
            <Route path="/citizen/CitizenDashBoard/:citizen_id" exact component={CitizenDashBoard} />
<<<<<<< HEAD
            <Route path="/citizen/CitizenDashBoard/:citizen_id/profile" exact component={CitizenProfile} />
=======
>>>>>>> 12b0f115fd308989b2f567bd8f88dc6b53abc056
            <Route path="/citizen/tables" exact component={Tables} />
            <Redirect from="/citizen" to="/citizen/CitizenDashBoard" />
          </Switch>
        </div>
      </div>
    </>
  );
}