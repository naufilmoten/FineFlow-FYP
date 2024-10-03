// import React, { useEffect, useState } from "react"; // Import useState
// import { useParams } from "react-router-dom";
// import CitizenNav from "components/Navbars/CitizenNav"; 
// import axios from "axios"; 
// import CardSettings from "components/Cards/CardSettings"; 
// import CardProfile from "components/Cards/CardProfile"; 

// export default function CitizenProfile() {
//   const { citizen_id } = useParams(); 
//   const [userDetails, setUserDetails] = useState(null); // State to store user details

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = localStorage.getItem("token"); 
//         const response = await axios.get(`http://localhost:5000/api/citizen/${citizen_id}`, {
//           headers: {
//             Authorization: `Bearer ${token}` 
//           }
//         });
        
//         console.log("Citizen ID:", citizen_id);
//         console.log("User details:", response.data);
//         setUserDetails(response.data); // Store user details in state
        
//       } catch (error) {
//         console.error("Error fetching user details:", error); 
//       }
//     };

//     fetchUserDetails();
//   }, [citizen_id]); 

//   return (
//     <>
//       <div>
//         <CitizenNav />
//       </div>

//       <div className="container mx-auto px-4 md:px-10 mt-10">
//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-8/12 px-4 mb-6">
//             {/* Pass userDetails as a prop to CardProfile */}
//             {userDetails && <CardProfile userDetails={userDetails} />} 
//           </div>
//           <div className="w-full lg:w-4/12 px-4 mb-6">
//             <CardSettings /> 
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import React, { useEffect, useState } from "react"; // Import useState
import { useParams } from "react-router-dom";
import CitizenNav from "components/Navbars/CitizenNav"; 
import axios from "axios"; 
import CardSettings from "components/Cards/CardSettings"; 
import CardProfile from "components/Cards/CardProfile"; 

export default function CitizenProfile() {
  const { citizen_id } = useParams(); 
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [registrationDetails, setRegistrationDetails] = useState(null); // State for registration details

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(`http://localhost:5000/api/citizen/${citizen_id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        
        console.log("Citizen ID:", citizen_id);
        console.log("User details:", response.data);
        setUserDetails(response.data); // Store user details in state

        // Fetch registration details using CNIC
        const registrationResponse = await axios.get(`http://localhost:5000/api/registration?cnic=${response.data.citizen_cnic}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        console.log("Registration details:", registrationResponse.data);
        setRegistrationDetails(registrationResponse.data); // Store registration details in state

      } catch (error) {
        console.error("Error fetching user details:", error); 
      }
    };

    fetchUserDetails();
  }, [citizen_id]); 

  return (
    <>
      <div>
        <CitizenNav />
      </div>

      <div className="container mx-auto px-4 md:px-10 mt-12">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4 mb-6">
            {/* Pass userDetails and registrationDetails as props to CardProfile */}
            {userDetails && registrationDetails && (
              <CardProfile userDetails={userDetails} registrationDetails={registrationDetails} />
            )} 
          </div>
          <div className="w-full lg:w-4/12 px-4 mb-6">
            <CardSettings  /> 
          </div>
        </div>
      </div>
    </>
  );
}
