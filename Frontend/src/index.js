// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/styles/tailwind.css";
// import Alert from '@mui/material/Alert';

// // layouts

// import Admin from "layouts/Admin.js";
// import Citizen from "layouts/citizen.js";
// import Warden from "layouts/warden.js";
// import Auth from "layouts/Auth.js";

// // views without layouts

// import Landing from "views/Landing.js";
// import Profile from "views/Profile.js";
// import Index from "views/Index.js";

// import AOS from 'aos';
// import 'aos/dist/aos.css'; // You can also import AOS CSS if not using CDN

// AOS.init({
//   duration: 800, // Duration of animations
// });


// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       {/* add routes with layouts */}
//       <Route path="/admin" component={Admin} />
//       <Route path="/warden" component={Warden} />
//       <Route path="/citizen" component={Citizen} />
//       <Route path="/auth" component={Auth} />
//       {/* add routes without layouts */}
//       <Route path="/landing" exact component={Landing} />
//       <Route path="/profile" exact component={Profile} />
//       <Route path="/auth" exact component={Index} />
//       {/* add redirect for first page */}
//       <Redirect from="*" to="/auth" />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root")
// );



import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Citizen from "layouts/citizen.js";
import Warden from "layouts/warden.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js"; // assuming Index is a different page, keep it if necessary

import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS animations
AOS.init({
  duration: 800, // animation duration
});

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/warden" component={Warden} />
      <Route path="/citizen" component={Citizen} />
      <Route path="/auth" component={Auth} />

      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      
      {/* Redirect to Landing page as default */}
      <Redirect from="/" exact to="/landing" />
      {/* Redirect any unknown paths to Landing */}
      <Redirect from="*" to="/landing" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

