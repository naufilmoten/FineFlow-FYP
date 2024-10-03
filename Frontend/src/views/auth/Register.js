import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { Alert } from '@mui/material'; // Import Alert component

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState(''); // Citizen specific field
  const [phoneNumber, setPhoneNumber] = useState(''); // Citizen specific field
  const [dob, setDob] = useState(''); // Citizen specific field
  const [email, setEmail] = useState(''); // Citizen specific field
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  // Validate CNIC format and length
  const validateCnic = (cnic) => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/; // Regex for formatted CNIC
    return cnicRegex.test(cnic);
  };

  // Handle CNIC input formatting
  const formatCnic = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Remove non-digit characters
    if (cleaned.length <= 5) return cleaned;
    if (cleaned.length <= 12) {
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`; // Add first hyphen
    }
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.charAt(12)}`; // Full format
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!role || !name || !cnic || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Validate CNIC
    if (!validateCnic(cnic)) {
      setErrorMessage('CNIC must be in the format xxxxx-xxxxxxx-x.');
      return;
    }

    // Additional validation for other fields
    if (username.trim() === '' || username.length < 3) {
      setErrorMessage('Username must be at least 3 characters long.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/; // Simple email regex
    if (role === 'citizen' && !emailRegex.test(email)) {
      setErrorMessage('Email format is invalid.');
      return;
    }

    let requestData;
    let route;

    if (role === 'warden') {
      requestData = {
        warden_name: name,
        warden_username: username,
        warden_cnic: cnic,
        warden_password: password,
      };
      route = 'http://localhost:5000/api/warden';
    } else if (role === 'citizen') {
      if (!address || !phoneNumber || !dob) {
        setErrorMessage('Please fill in all fields for citizen registration.');
        return;
      }

      requestData = {
        citizen_name: name,
        citizen_cnic: cnic,
        citizen_password: password,
        citizen_address: address,
        citizen_username: username,
        citizen_number: phoneNumber,
        citizen_dob: dob,
        citizen_email: email,
      };
      route = 'http://localhost:5000/api/citizen';
    } else {
      setErrorMessage('Invalid role selected.');
      return;
    }

    try {
      await axios.post(route, requestData);
      setSuccessMessage(`${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully`);
      setErrorMessage('');

      // Redirect to the login page after a short delay to show success message
      setTimeout(() => {
        history.push('/auth/login'); // Redirect to the login page
      }, 2000); // 2-second delay for user feedback
    } catch (error) {
      console.error('Error details:', error);  // Log the full error
      setErrorMessage(`Failed to create ${role} account. ${error.response ? error.response.data.message : error.message}`);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">FINE FLOW</div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleRegister}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Name</label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Username</label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">CNIC</label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="CNIC (e.g. 35202-6345280-1)"
                    value={cnic}
                    onChange={(e) => setCnic(formatCnic(e.target.value))}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Password</label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="">Choose a role</option>
                    <option value="warden">Warden</option>
                    <option value="citizen">Citizen</option>
                  </select>
                </div>

                {role === 'citizen' && (
                  <>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Address</label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Phone Number</label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Date of Birth</label>
                      <input
                        type="date"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Email</label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Register
                  </button>
                </div>

                {/* Material-UI Alert components for displaying messages */}
                {errorMessage && (
                  <Alert severity="error" className="mt-4">{errorMessage}</Alert>
                )}
                {successMessage && (
                  <Alert severity="success" className="mt-4">{successMessage}</Alert>
                )}
              </form>

              <div className="text-center mt-4">
                <Link to="/auth/login" className="text-blueGray-800">
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
