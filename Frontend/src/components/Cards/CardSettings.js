import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get the citizen_id from the route

export default function CardSettings() {
  const { citizen_id } = useParams(); // Get citizen_id from the URL
  const [citizenData, setCitizenData] = useState({
    citizen_address: '',
    citizen_cnic: '',
    citizen_dob: '',
    citizen_email: '',
    citizen_name: '',
    citizen_number: '',
    citizen_password: '',
    citizen_username: '',
  });

  // Fetch citizen data based on citizen_id from the route
  useEffect(() => {
    const fetchCitizenData = async () => {
      try {
        const response = await axios.get(`/api/citizens/${citizen_id}`); // Use dynamic citizen_id from useParams
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
    setCitizenData({ ...citizenData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/citizens/${citizen_id}`, citizenData); // Update citizen details using the citizen_id
      console.log('Updated successfully', response.data);
    } catch (error) {
      console.error('Error updating details', error);
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-10 mt-6 p-8">
        <div className="rounded-t bg-white mb-0 px-4 py-4">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Update Account</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              {/* All input fields in a single row */}
              
  
              <div className="w-full lg:w-1/4 px-4 mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="citizen_username"
                  value={citizenData.citizen_username}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Choose a unique username that you will remember"
                />
              </div>
  
              <div className="w-full lg:w-1/4 px-4 mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="citizen_email"
                  value={citizenData.citizen_email}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter your primary email address for notifications"
                />
              </div>
  
              <div className="w-full lg:w-1/4 px-4 mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="citizen_password"
                  value={citizenData.citizen_password}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Create a strong password (at least 8 characters)"
                />
              </div>
  
              <div className="w-full lg:w-1/4 px-4 mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="citizen_address"
                  value={citizenData.citizen_address}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter your complete address (Street, City, State, Zip)"
                />
              </div>
  
              <div className="w-full lg:w-1/4 px-4 mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="citizen_number"
                  value={citizenData.citizen_number}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter your phone number (including country code)"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}  