// import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";

// // components

// import Navbar from "components/Navbars/AuthNavbar.js";
// import FooterSmall from "components/Footers/FooterSmall.js";

// // views

// import Login from "views/auth/Login.js";
// import Register from "views/auth/Register.js";

// export default function Auth() {
//   return (
//     <>
//       <Navbar transparent />
//       <main>
//         <section className="relative w-full h-full py-40 min-h-screen">
//           <div
//             className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
//             style={{
//               backgroundImage:
//                 "url(" + require("assets/img/register_bg_2.png").default + ")",
//             }}
//           ></div>
//           <Switch>
//             <Route path="/auth/login" exact component={Login} />
//             <Route path="/auth/register" exact component={Register} />
//             <Redirect from="/auth" to="/auth/login" />
//           </Switch>
//           <FooterSmall absolute />
//         </section>
//       </main>
//     </>
//   );
// }



import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

// components
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

// Import the image directly
import backgroundImage from "assets/img/De.jpg"; // Adjust the path according to your structure

export default function Auth() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to appropriate dashboard based on the role
      const role = localStorage.getItem("role");
      if (role === "admin") {
        history.push("/admin/dashboard");
      } else if (role === "warden") {
        history.push(`/warden/WardenDashBoard/${localStorage.getItem("warden_id")}`);
      } else if (role === "citizen") {
        history.push(`/citizen/CitizenDashBoard/${localStorage.getItem("citizen_id")}`);
      }
    }
  }, [history]);

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${backgroundImage})`, // Use the imported image
            }}
          ></div>
          {/* Overlay with increased opacity */}
          <div className="absolute top-0 w-full h-full bg-blueGray-800 opacity-80"></div> {/* Adjust opacity as needed */}

          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
