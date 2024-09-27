import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Constants for admin login
const ADMIN_USERNAME = "admin123"; // Replace with your admin CNIC
const ADMIN_PASSWORD = "admin123"; // Replace with your admin password

export default function Login() {
  const [cnic, setCnic] = useState(""); // CNIC state
  const [password, setPassword] = useState(""); // Password state
  const [role, setRole] = useState("warden"); // Default role
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Admin login logic
    if (cnic === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      alert("Admin login successful!");
      history.push("/admin/dashboard");
      return;
    }
  
    // Define the endpoint based on the selected role
    const endpoint = role === "citizen"
      ? "http://localhost:5000/api/citizen/login"
      : "http://localhost:5000/api/warden/login";
  
    // Create the payload based on role
    const payload = role === "citizen" 
      ? { citizen_cnic: cnic, citizen_password: password }
      : { warden_cnic: cnic, warden_password: password };
  
    // Log the payload
    console.log("Payload being sent:", payload);
  
    // Attempt to log in
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Payload for the request
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`);
        // Redirect based on role
        if (role === "warden") {
          history.push("/warden/WardenDashBoard");
        } else if (role === "citizen") {
          history.push("/citizen/dashboard");
        }
      } else {
        alert(data.message || "Invalid CNIC or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again later.");
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
              <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-cnic">
                    CNIC
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="CNIC"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
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

                {/* Role Selection */}
                <div className="mb-6">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2 text-center">
                    Select Role
                  </label>
                  <div className="flex flex-wrap items-center justify-center">
                    {["warden", "citizen", "admin"].map((roleOption) => (
                      <label key={roleOption} className="inline-flex items-center mr-10 mb-4">
                        <input
                          type="radio"
                          name="role"
                          value={roleOption}
                          className="form-radio h-6 w-6 text-blueGray-700 focus:ring-blueGray-500 border-blueGray-300 rounded-lg transition duration-150 ease-in-out"
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
