


// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";

// // Constants for admin login
// const ADMIN_USERNAME = "admin123"; // Replace with your admin CNIC
// const ADMIN_PASSWORD = "admin123"; // Replace with your admin password

// export default function Login() {
//   const [cnic, setCnic] = useState(""); // CNIC state
//   const [password, setPassword] = useState(""); // Password state
//   const [role, setRole] = useState(""); // Default role
//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Admin login logic
//     if (cnic === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
//       alert("Admin login successful!");
//       history.push("/admin/dashboard");
//       return;
//     }

//     // Define the endpoint based on the selected role
//     const endpoint = role === "citizen"
//       ? "http://localhost:5000/api/citizen/login"
//       : "http://localhost:5000/api/warden/login";

//     // Create the payload based on role
//     const payload = role === "citizen" 
//       ? { citizen_cnic: cnic, citizen_password: password }
//       : { warden_cnic: cnic, warden_password: password };

//     // Log the payload
//     console.log("Payload being sent:", payload);

//     // Attempt to log in
//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload), // Payload for the request
//       });

//       const data = await response.json();



//     // Log the full response for debugging
//     console.log("Login response:", data);

//       if (response.ok) {
//         alert(`${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`);
        
//         // Check if it's a warden or citizen and redirect with the appropriate ID
//         if (role === "warden") {
//           const wardenId = data.warden_id; // Assuming the response contains warden_id
//           if (wardenId) {
//             history.push(`/warden/WardenDashBoard/${wardenId}`); // Redirect with warden_id
//           } else {
//             alert("Warden ID not found in response");
//           }
//         } else if (role === "citizen") {
//           const citizenId = data.citizen_id; // Assuming the response contains citizen_id
//           if (citizenId) {
//             history.push(`/citizen/CitizenDashBoard/${citizenId}`); // Redirect with citizen_id
//           } else {
//             alert("Citizen ID not found in response");
//           }
//         }
//       } else {
//         alert(data.message || "Invalid CNIC or password");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred during login. Please try again later.");
//     }
//   };

  

//   return (
//     <div className="container mx-auto px-4 h-full">
//       <div className="flex content-center items-center justify-center h-full">
//         <div className="w-full lg:w-4/12 px-4">
//           <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
//             <div className="rounded-t mb-0 px-6 py-6">
//               <div className="text-center mb-3">
//                 <h6 className="text-blueGray-500 text-sm font-bold">FINE FLOW</h6>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="relative w-full mb-3">
//                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-cnic">
//                     CNIC
//                   </label>
//                   <input
//                     type="text"
//                     className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                     placeholder="CNIC"
//                     value={cnic}
//                     onChange={(e) => setCnic(e.target.value)}
//                   />
//                 </div>

//                 <div className="relative w-full mb-3">
//                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-6">
//                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2 text-start">
//                     Select Role
//                   </label>
//                   <div className="flex flex-row items-center justify-start">
//                     {["warden", "citizen", "admin"].map((roleOption) => (
//                       <label key={roleOption} className="flex items-center cursor-pointer mx-4">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-5 w-5 text-blueGray-800"
//                           checked={role === roleOption}
//                           onChange={() => setRole(roleOption)} // Update role state
//                         />
//                         <span className="ml-2 text-sm font-semibold text-blueGray-600">
//                           {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="text-center mt-4">
//                   <button
//                     className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
//                     type="submit"
//                   >
//                     Sign In
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           <div className="flex flex-wrap mt-6 relative">
//             <div className="w-1/2">
//               <a href="#pablo" onClick={(e) => e.preventDefault()} className="text-blueGray-200">
//                 <small>Forgot password?</small>
//               </a>
//             </div>
//             <div className="w-1/2 text-right">
//               <Link to="/auth/register" className="text-blueGray-200">
//                 <small>Create new account</small>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";

// // Constants for admin login
// const ADMIN_USERNAME = "admin123"; // Replace with your admin CNIC
// const ADMIN_PASSWORD = "admin123"; // Replace with your admin password

// export default function Login() {
//   const [cnic, setCnic] = useState(""); // CNIC state
//   const [password, setPassword] = useState(""); // Password state
//   const [role, setRole] = useState(""); // Default role
//   const history = useHistory();

//   useEffect(() => {
//     // Redirect if already authenticated
//     const token = localStorage.getItem("token");
//     if (token) {
//       const userRole = localStorage.getItem("role");
//       if (userRole === "admin") {
//         history.push("/admin/dashboard");
//       } else if (userRole === "warden") {
//         history.push(`/warden/WardenDashBoard/${localStorage.getItem("warden_id")}`);
//       } else if (userRole === "citizen") {
//         history.push(`/citizen/CitizenDashBoard/${localStorage.getItem("citizen_id")}`);
//       }
//     }
//   }, [history]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Admin login logic
//     if (cnic === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
//       alert("Admin login successful!");
//       localStorage.setItem("role", "admin"); // Store role
//       history.push("/admin/dashboard");
//       return;
//     }

//     // Define the endpoint based on the selected role
//     const endpoint = role === "citizen"
//       ? "http://localhost:5000/api/citizen/login"
//       : "http://localhost:5000/api/warden/login";

//     // Create the payload based on role
//     const payload = role === "citizen"
//       ? { citizen_cnic: cnic, citizen_password: password }
//       : { warden_cnic: cnic, warden_password: password };

//     // Attempt to log in
//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload), // Payload for the request
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store the JWT token and role in localStorage
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", role); // Store role
//         if (role === "warden") {
//           const wardenId = data.warden_id; // Assuming the response contains warden_id
//           if (wardenId) {
//             localStorage.setItem("warden_id", wardenId); // Store warden_id
//             history.push(`/warden/WardenDashBoard/${wardenId}`); // Redirect with warden_id
//           } else {
//             alert("Warden ID not found in response");
//           }
//         } else if (role === "citizen") {
//           const citizenId = data.citizen_id; // Assuming the response contains citizen_id
//           if (citizenId) {
//             localStorage.setItem("citizen_id", citizenId); // Store citizen_id
//             history.push(`/citizen/CitizenDashBoard/${citizenId}`); // Redirect with citizen_id
//           } else {
//             alert("Citizen ID not found in response");
//           }
//         }
//       } else {
//         alert(data.message || "Invalid CNIC or password");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred during login. Please try again later.");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 h-full">
//       <div className="flex content-center items-center justify-center h-full">
//         <div className="w-full lg:w-4/12 px-4">
//           <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
//             <div className="rounded-t mb-0 px-6 py-6">
//               <div className="text-center mb-3">
//                 <h6 className="text-blueGray-500 text-sm font-bold">FINE FLOW</h6>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="relative w-full mb-3">
//                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-cnic">
//                     CNIC
//                   </label>
//                   <input
//                     type="text"
//                     className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                     placeholder="CNIC"
//                     value={cnic}
//                     onChange={(e) => setCnic(e.target.value)}
//                   />
//                 </div>

//                 <div className="relative w-full mb-3">
//                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-6">
//                   <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2 text-start">
//                     Select Role
//                   </label>
//                   <div className="flex flex-row items-center justify-start">
//                     {["warden", "citizen", "admin"].map((roleOption) => (
//                       <label key={roleOption} className="flex items-center cursor-pointer mx-4">
//                         <input
//                           type="radio"
//                           className="form-radio h-5 w-5 text-blueGray-800"
//                           checked={role === roleOption}
//                           onChange={() => setRole(roleOption)} // Update role state
//                         />
//                         <span className="ml-2 text-sm font-semibold text-blueGray-600">
//                           {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="text-center mt-4">
//                   <button
//                     className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
//                     type="submit"
//                   >
//                     Sign In
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           <div className="flex flex-wrap mt-6 relative">
//             <div className="w-1/2">
//               <a href="#pablo" onClick={(e) => e.preventDefault()} className="text-blueGray-200">
//                 <small>Forgot password?</small>
//               </a>
//             </div>
//             <div className="w-1/2 text-right">
//               <Link to="/auth/register" className="text-blueGray-200">
//                 <small>Create new account</small>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert, AlertTitle } from '@mui/material'; // Importing Material-UI Alert

// Constants for admin login
const ADMIN_USERNAME = "00000-0000000-0"; // Replace with your admin CNIC
const ADMIN_PASSWORD = "admin123"; // Replace with your admin password

export default function Login() {
  const [cnic, setCnic] = useState(""); // CNIC state
  const [password, setPassword] = useState(""); // Password state
  const [role, setRole] = useState(""); // Default role
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const [alertType, setAlertType] = useState(""); // State for alert type ('success', 'error')
  const history = useHistory();

  useEffect(() => {
    // Redirect if already authenticated
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = localStorage.getItem("role");
      if (userRole === "admin") {
        history.push("/admin/dashboard");
      } else if (userRole === "warden") {
        history.push(`/warden/WardenDashBoard/${localStorage.getItem("warden_id")}`);
      } else if (userRole === "citizen") {
        history.push(`/citizen/CitizenDashBoard/${localStorage.getItem("citizen_id")}`);
      }
    }
  }, [history]);

  // Format CNIC with hyphens as user types
  const formatCnic = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 5) return cleaned;
    if (cleaned.length <= 12) {
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.charAt(12)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin login logic
    if (cnic === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAlertMessage("Admin login successful!");
      setAlertType("success");
      localStorage.setItem("role", "admin"); // Store role
      history.push("/admin/dashboard");
      return;
    }

    const endpoint = role === "citizen"
      ? "http://localhost:5000/api/citizen/login"
      : "http://localhost:5000/api/warden/login";

    const payload = role === "citizen"
      ? { citizen_cnic: cnic, citizen_password: password }
      : { warden_cnic: cnic, warden_password: password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", role);
        if (role === "warden") {
          const wardenId = data.warden_id;
          if (wardenId) {
            localStorage.setItem("warden_id", wardenId);
            history.push(`/warden/WardenDashBoard/${wardenId}`);
            setAlertMessage("Warden login successful!");
            setAlertType("success");
          } else {
            setAlertMessage("Warden ID not found in response.");
            setAlertType("error");
          }
        } else if (role === "citizen") {
          const citizenId = data.citizen_id;
          if (citizenId) {
            localStorage.setItem("citizen_id", citizenId);
            history.push(`/citizen/CitizenDashBoard/${citizenId}`);
            setAlertMessage("Citizen login successful!");
            setAlertType("success");
          } else {
            setAlertMessage("Citizen ID not found in response.");
            setAlertType("error");
          }
        }
      } else {
        setAlertMessage(data.message || "Invalid CNIC or password");
        setAlertType("error");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlertMessage("An error occurred during login. Please try again later.");
      setAlertType("error");
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">FINE FLOW</h6>
              </div>
              
              {/* Conditionally render the Alert */}
              {alertMessage && (
                <Alert severity={alertType} variant="filled" className="mb-4">
                  <AlertTitle>{alertType === "error" ? "Error" : "Success"}</AlertTitle>
                  {alertMessage}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-cnic">
                    CNIC
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="CNIC (e.g. 35202-6345280-1)"
                    value={cnic}
                    onChange={(e) => setCnic(formatCnic(e.target.value))} // Format CNIC as user types
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2 text-start">
                    Select Role
                  </label>
                  <div className="flex flex-row items-center justify-start">
                    {["warden", "citizen", "admin"].map((roleOption) => (
                      <label key={roleOption} className="flex items-center cursor-pointer mx-4">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-blueGray-800"
                          checked={role === roleOption}
                          onChange={() => setRole(roleOption)} // Update role state
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <a href="#pablo" onClick={(e) => e.preventDefault()} className="text-blueGray-200">
                <small>Forgot password?</small>
              </a>
            </div>
            <div className="w-1/2 text-right">
              <Link to="/auth/register" className="text-blueGray-200">
                <small>Create new account</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
