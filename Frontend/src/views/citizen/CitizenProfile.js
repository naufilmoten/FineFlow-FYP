import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CitizenNav from "components/Navbars/CitizenNav"; // Can be replaced with a dedicated CitizenNavbar if necessary";
import axios from "axios"; // Import axios if you need to fetch user details

export default function CitizenProfile() {
  const { citizen_id } = useParams(); // Get citizen_id from the URL

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const response = await axios.get(`http://localhost:5000/api/citizen/${citizen_id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the request headers
          }
        });
        
        console.log("Citizen ID:", citizen_id); // Log the citizen_id
        console.log("User details:", response.data); // Log the user details
        
      } catch (error) {
        console.error("Error fetching user details:", error); // Log any error that occurs
      }
    };

    fetchUserDetails();
  }, [citizen_id]); // Depend on citizen_id to refetch if it changes

  return (
    <>
      {/* Navbar */}
      <div>
        <CitizenNav />
      </div>
      {/* Add other content related to Citizen Profile here */}
    </>
  );
}
