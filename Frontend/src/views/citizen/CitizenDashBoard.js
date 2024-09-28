// // src/views/citizen/CitizenDashBoard.js

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// import CardPageVisits from "components/Cards/CardPageVisits.js"; // Import the CardPageVisits component

// export default function CitizenDashBoard() {
//   const [formData, setFormData] = useState({
//     email: "",
//     firstName: "",
//     cardNumber: "",
//     expiryDate: "",
//     amount: "", // Added amount field
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Payment details submitted", formData);
//   };

//   return (
//     <div className="container mx-auto px-4 h-full pt-12"> {/* Increased top padding to pt-12 */}
//       <div className="flex flex-wrap justify-between">
//         {/* Form Section */}
//         <div className="w-full lg:w-6/12 px-4 mb-6">
//           <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
//           <div className="bg-blueGray-800 text-white text-center py-4 rounded-t-lg">
//   <h1 className="text-2xl font-bold">Traffic Challan Payment</h1>
// </div>

//             <form onSubmit={handleSubmit} className="p-8">
//               {/* Email Field */}
//               <div className="form-group mb-4">
//                 <label className="block uppercase text-blueGray-600 text-xs font-bold mb-4">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 p-3 block w-full max-w-xs mx-auto shadow-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"

//                   placeholder="Enter Email"
//                 />
//               </div>

//               {/* First Name Field */}
//               <div className="form-group mb-4">
//                 <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 p-4 block w-full shadow-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="First Name"
//                 />
//               </div>

//               {/* Card Number Field */}
//               <div className="form-group mb-4">
//                 <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Card Number</label>
//                 <input
//                   type="text"
//                   name="cardNumber"
//                   value={formData.cardNumber}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 p-3 block w-full shadow-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Card Number"
//                 />
//               </div>

//               {/* Expiry Date Field */}
//               <div className="form-group mb-4">
//                 <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Expiry Date</label>
//                 <input
//                   type="text"
//                   name="expiryDate"
//                   value={formData.expiryDate}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 p-3 block w-full shadow-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="MM/YY"
//                 />
//               </div>

//               {/* Amount Field */}
//               <div className="form-group mb-4">
//                 <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Amount</label>
//                 <input
//                   type="number"
//                   name="amount"
//                   value={formData.amount}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 p-3 block w-full shadow-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter Amount"
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-center mt-4">
//               <button
//   type="submit"
//   className="bg-blueGray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md transition duration-200"
// >
//   Pay Amount
// </button>

//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Card Page Visits Section */}
//         <div className="w-full lg:w-6/12 px-4 mb-6 mt-6"> {/* Added mt-6 for spacing */}
//           <CardPageVisits />
//         </div>
//       </div>
//     </div>
//   );
// }

// src/views/citizen/CitizenDashBoard.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CardPageVisits from "components/Cards/CardPageVisits.js"; // Import the CardPageVisits component

export default function CitizenDashBoard() {
  const { citizen_id } = useParams(); // Extract citizen_id from URL
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    cardNumber: "",
    expiryDate: "",
    amount: "",
  });
  const [userDetails, setUserDetails] = useState({}); // State to hold user details

  // Fetch user details based on citizen_id when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/citizen/${citizen_id}`); // Update API endpoint accordingly
        setUserDetails(response.data);
        console.log("User details:", response.data); // Log user details to console
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [citizen_id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment details submitted", formData);
  };

  return (
    <div className="container mx-auto px-4 h-full pt-12">
      <div className="flex flex-wrap justify-between">
        {/* Form Section */}
        <div className="w-full lg:w-6/12 px-4 mb-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="bg-blueGray-800 text-white text-center py-4 rounded-t-lg">
              <h1 className="text-2xl font-bold">Traffic Challan Payment</h1>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              {/* Email Field */}
              <div className="form-group mb-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-4">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full max-w-xs mx-auto shadow-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Email"
                />
              </div>

              {/* First Name Field */}
              <div className="form-group mb-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 p-4 block w-full shadow-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="First Name"
                />
              </div>

              {/* Card Number Field */}
              <div className="form-group mb-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full shadow-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Card Number"
                />
              </div>

              {/* Expiry Date Field */}
              <div className="form-group mb-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full shadow-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MM/YY"
                />
              </div>

              {/* Amount Field */}
              <div className="form-group mb-4">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 block w-full shadow-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Amount"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blueGray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md transition duration-200"
                >
                  Pay Amount
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Card Page Visits Section */}
        <div className="w-full lg:w-6/12 px-4 mb-6 mt-6">
          <CardPageVisits />
        </div>
      </div>
    </div>
  );
}
