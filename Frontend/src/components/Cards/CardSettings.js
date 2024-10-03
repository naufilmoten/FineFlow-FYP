import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get the citizen_id from the route
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Create a custom Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CardSettings() {
  const { citizen_id } = useParams(); // Get citizen_id from the URL
  const [citizenData, setCitizenData] = useState({
    citizen_address: '',
    citizen_email: '',
    citizen_number: '',
    citizen_password: '',
    citizen_username: '',
  });

  const [updateData, setUpdateData] = useState({
    citizen_address: '',
    citizen_email: '',
    citizen_number: '',
    citizen_password: '',
    citizen_username: '',
  });

  // Validation States
  const [errors, setErrors] = useState({
    citizen_email: '',
    citizen_number: '',
  });

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  // Fetch citizen data based on citizen_id from the route
  useEffect(() => {
    const fetchCitizenData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/citizen/${citizen_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCitizenData(response.data);
      } catch (error) {
        console.error('Error fetching citizen data', error);
      }
    };

    if (citizen_id) {
      fetchCitizenData();
    }
  }, [citizen_id]); // Re-fetch data if citizen_id changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
    
    // Reset validation error for the changed field
    if (name === 'citizen_email') {
      setErrors({ ...errors, citizen_email: '' });
    }
    if (name === 'citizen_number') {
      setErrors({ ...errors, citizen_number: '' });
    }
  };

  const validateInputs = () => {
    let isValid = true;
    let newErrors = {};

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    if (updateData.citizen_email && !emailPattern.test(updateData.citizen_email)) {
      newErrors.citizen_email = 'Invalid email format';
      isValid = false;
    }

    // Phone number validation (must be 11 digits)
    const phonePattern = /^\d{11}$/;
    if (updateData.citizen_number && !phonePattern.test(updateData.citizen_number)) {
      newErrors.citizen_number = 'Phone number must be 11 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before sending the request
    if (!validateInputs()) {
      return; // Exit if validation fails
    }

    const dataToUpdate = {};
    for (const key in updateData) {
      if (updateData[key]) { // Only include fields that are filled
        dataToUpdate[key] = updateData[key];
      }
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:5000/api/citizen/${citizen_id}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the update request
        }
      }); // Update citizen details using the citizen_id
      console.log('Updated successfully', response.data);

      // Show success message
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success'); // Set severity to success
      setSnackbarOpen(true); // Open the Snackbar
    } catch (error) {
      console.error('Error updating details', error);
      
      // Show error message
      setSnackbarMessage('Failed to update profile. Please try again.');
      setSnackbarSeverity('error'); // Set severity to error
      setSnackbarOpen(true); // Open the Snackbar
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-10 mt-6 p-8">
      {/* <div className="rounded-t bg-white mb-0 px-4 py-4"> */}
        {/* <div className="text-center flex justify-between">
          <h6 className="text-white bg-BlueGray-800 text-xl font-bold text-center">Update Profile</h6>
        </div> */}
         <div className=" text-center rounded-t bg-blueGray-800 mb-0 px-3 py-3 rounded-lg">
              <h4 className="text-2xl font-semibold text-white mb-4">
                 Update Profile
              </h4>
           
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative w-full mb-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2 mt-8" htmlFor="citizen_username">
                  Username
                </label>
                <input
                  type="text"
                  name="citizen_username"
                  value={updateData.citizen_username}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                  placeholder="Username"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="citizen_email">
                  Email
                </label>
                <input
                  type="email"
                  name="citizen_email"
                  value={updateData.citizen_email}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                  placeholder="Email"
                />
                {errors.citizen_email && (
                  <p className="text-red-500 text-xs italic">{errors.citizen_email}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="citizen_address">
                  Address
                </label>
                <input
                  type="text"
                  name="citizen_address"
                  value={updateData.citizen_address}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                  placeholder="Address"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="citizen_number">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="citizen_number"
                  value={updateData.citizen_number}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                  placeholder="Phone Number"
                />
                {errors.citizen_number && (
                  <p className="text-red-500 text-xs italic">{errors.citizen_number}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="citizen_password">
                  Password
                </label>
                <input
                  type="password"
                  name="citizen_password"
                  value={updateData.citizen_password}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          {/* Submit button */}
          <div className="text-center">
            <button
              className="bg-blueGray-800 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-4"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
