// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// // components

// import WardenNavbar from "components/Navbars/WardenNavbar";
// import Sidebar from "components/Sidebar/Sidebar.js";
// // import HeaderStats from "components/Headers/HeaderStats.js";

// // views

// import WardenDashBoard from "views/warden/WardenDashBoard.js";

// // import Settings from "views/admin/Settings.js";
// // import Tables from "views/admin/Tables.js";

// export default function Warden() {
//   return (
//     <>
    
//      <div><WardenNavbar /> </div>
      
      
//       <div className="relative md:ml-64 bg-blueGray-100">
      
        
//         {/* Header */}
//         {/* <HeaderStats /> */}
//         <div className="px-4 md:px-10 mx-auto w-full -m-24">
//           <Switch>
//             <Route path="/warden/WardenDashBoard" exact component={WardenDashBoard} />
            
//             {/* <Route path="/Warden/tables" exact component={Tables} /> */}
//             <Redirect from="/warden" to="/warden/WardenDashBoard" />
//           </Switch>
//           {/* <FooterAdmin /> */}
//         </div>
//       </div>
//       <Sidebar />
//     </>
    
//   );
// }


import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import WardenNavbar from "components/Navbars/WardenNavbar";
import Sidebar from "components/Sidebar/Sidebar.js";

// views
import WardenDashBoard from "views/warden/WardenDashBoard.js";

export default function Warden() {
  return (
    <>
      <div>
        <WardenNavbar />
      </div>

      <div className="relative md:ml-64 bg-blueGray-100">
        {/* Header */}
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            {/* Updated route to include warden_id */}
            <Route path="/warden/WardenDashBoard/:warden_id" exact component={WardenDashBoard} />
            
            {/* Redirect for the main warden route */}
            <Redirect from="/warden" to="/warden/WardenDashBoard" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
      <Sidebar />
    </>
  );
}
