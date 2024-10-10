import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import violationContracts from "../../contracts/violation"
import { Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert from Material UI
import Image from "assets/img/challan.jpg"

const  token = localStorage.getItem ("token");
console.log("Token:", token);

// Dummy data for violation types
const violationTypes = [
  // LTV Violations
  { id: 1, name: "Speeding (LTV)" },
  { id: 2, name: "Parking (LTV)" },
  { id: 3, name: "No Seatbelt (LTV)" },
  { id: 4, name: "Traffic Signal Violation (LTV)" },
  { id: 5, name: "Wrong Way (LTV)" },
  { id: 6, name: "Tinted Windows (LTV)" },

  // Motorbike Violations
  { id: 7, name: "Speeding (Motorbike)" },
  { id: 8, name: "Parking (Motorbike)" },
  { id: 9, name: "No Helmet (Motorbike)" },
  { id: 10, name: "Traffic Signal Violation (Motorbike)" },
  { id: 11, name: "Wrong Way (Motorbike)" },
  { id: 12, name: "Pillion Riding (Motorbike)" },

  // HTV Violations
  { id: 13, name: "Speeding (HTV)" },
  { id: 14, name: "Parking (HTV)" },
  { id: 15, name: "No Seatbelt (HTV)" },
  { id: 16, name: "Traffic Signal Violation (HTV)" },
  { id: 17, name: "Wrong Way (HTV)" },
  { id: 18, name: "Tinted Windows (HTV)" }
];


const steps = [
  { id: 1, name: "Enter Details" },
  { id: 2, name: "Review Details" },
  { id: 3, name: "Generate Challan" },
];

const WardenDashBoard = () => {
  const { warden_id } = useParams(); // Get warden_id from URL
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [Location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [violationType, setViolationType] = useState("");
  const [dummyData, setDummyData] = useState({});
  const [userDetails, setUserDetails] = useState({}); // State to hold user details
  const [ownerData, setOwnerData] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        //const token = localStorage.getItem("token"); // Assuming you're storing JWT in local storage
        const response = await axios.get(`http://localhost:5000/api/warden/${warden_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }

        });



        setUserDetails(response.data); // Assuming response contains user details
        console.log("User details:", response.data); // Log user details
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [warden_id]); // Fetch user details when warden_id changes


  //new
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  


  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = violationContracts.networks[networkId];

        if (!deployedNetwork) {
          throw new Error("Contract network not found");
        }

        const contractInstance = new web3.eth.Contract(
          violationContracts.abi,
          deployedNetwork.address
        );

        const accs = await web3.eth.getAccounts();
        setAccounts(accs);
        setContract(contractInstance);
        console.log("doneeee");
        // setCurrentUser(accs[0]); // Assuming the first account is the current user
      } catch (error) {
        console.error("Error initializing Web3:", error);
        // Handle error state here
      }
    };

    initWeb3();
  }, []);

  const handleNextStep = async () => {
    if (!registrationNumber || !photo || !violationType || !Location) {
      alert("Please fill in all required fields before proceeding.");
      return; // Stop execution if any field is missing
    }
    if (currentStep === 1) {
      try {
        // Fetch vehicle details based on registration number
        const response = await fetch(`http://localhost:5000/api/registration/${registrationNumber}`, {

          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const vehicleData = await response.json();

        // Set vehicle data
        setDummyData({
          owner_cnic: vehicleData.owner_cnic,
          vehicle: vehicleData.vehicle_name,
          violation: violationType,
        });

        // Fetch owner details based on owner CNIC
        const ownerResponse = await fetch(`http://localhost:5000/api/citizen/cnic/${vehicleData.owner_cnic}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const ownerDetails = await ownerResponse.json();

        // Set owner data
        setOwnerData(ownerDetails);
        
        // Move to the next step
        setCurrentStep(2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const handlePhotoUpload = (event) => {
  //   setPhoto(event.target.files[0]);
    
  // };
  const [loading, setLoading] = useState(false); //state for loading
  const handlePhotoUpload = (event) => {
    setLoading(true); // Set loading to true when upload starts
    const file = event.target.files[0];
    
    if (file) {
        setPhoto(file);

        // Simulating an upload delay (e.g., to a server)
        setTimeout(() => {
            setLoading(false); // Set loading to false when upload completes
        }, 2000); // Simulate 2 seconds delay for uploading
    } else {
        setLoading(false); // Reset loading if no file is selected
    }
  };

   const GenerateChallan = async () => {
    const date = Math.floor(Date.now() / 1000);
  
    if (!contract) {
      console.error("Contract is not initialized.");
      alert("Error: Contract not available. Please refresh the page.");
      return; // Exit the function if contract is not available
    }
  
    try {
      // Estimate gas for the generateChallan transaction
      const estimatedGas = await contract.methods.generateChallan(
        accounts[ownerData.account_index],  // Owner's account
        ownerData.citizen_cnic,             // Citizen's CNIC
        ownerData.citizen_name,              // Citizen's name
        dummyData.violation,                  // Violation type
        Location,                             // Violation location
        date,
        registrationNumber
      ).estimateGas({
        from: accounts[userDetails.account_index], // Warden's account
      });
  
      // Send the transaction with the estimated gas limit
      const response = await contract.methods.generateChallan(
        accounts[ownerData.account_index],  // Owner's account
        ownerData.citizen_cnic,             // Citizen's CNIC
        ownerData.citizen_name,              // Citizen's name
        dummyData.violation,                  // Violation type
        Location,                             // Violation location
        date,
        registrationNumber
      ).send({
        from: accounts[userDetails.account_index], // Warden's account
        gas: estimatedGas                         // Use estimated gas
      });
  
      console.log("Successful", response);
      setSuccessSnackbarOpen(true); // Show success alert
      // Resetting the form to Step 1 and clearing states
      setCurrentStep(1);
      setRegistrationNumber("");
      setLocation("");
      setPhoto(null);
      setViolationType("");
      setDummyData({});
      setOwnerData({});
    } catch (error) {
      console.error("Error occurred while generating challan:", error);
    }
};
  
console.log(registrationNumber)
   
const handlePrint = () => {
  // Assuming you're generating a PDF or printing the content of the dashboard.
  const printContents = document.getElementById("challan-details").innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
};

return (

  
  
  <div className="flex items-start justify-start min-h-screen bg-white p-8">
 <div className="flex justify-start mb-8 ml-6">
  <div className="relative" style={{ top: '238px' }}> {/* Adjust 'top' to move image down */}
    <img
      src={Image}
      className="shadow-xl h-60 w-50"
      style={{ border: 'none' }}  
    />
  </div>
</div>

      <div className="w-1/2 h-2/3 max-w-lg max-h-lg bg-gray-100 shadow-lg rounded-lg flex flex-col justify-start items-start p-8 mt-20">
      
        <div className="bg-blueGray-800 text-white text-center py-6 rounded-t-lg w-full">
          <h1 className="text-2xl font-bold">Traffic Violation Form</h1>
        </div>
      

        {/* Step Indicator */}
        <div className="flex items-center justify-between mt-4 mb-4 px-6 w-full">
          {steps.map((step) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep > step.id ? "bg-green-500" : currentStep >= step.id ? "bg-indigo-600" : "bg-gray-300"} transition duration-200`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-15 h-10 text-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 10l3 3 7-7-1.5-1.5-5.5 5.5L8.5 8 7 9.5z" />
                    </svg> // Completed step with green tick
                  ) : currentStep >= step.id ? (
                    <span className="text-black">{step.id}</span> // Current step indicator
                  ) : (
                    <span className="text-black">{step.id}</span> // Upcoming step indicator
                  )}
                </div>
                <span
                  className={`mt-2 text-xs ${currentStep >= step.id ? "text-indigo-600" : "text-gray-500"}`}
                >
                  {step.name}
                </span>
              </div>
              {step.id < steps.length && (
                <div className="h-1 w-8 bg-gray-300 mx-2"></div>
              )}
            </React.Fragment>
          ))}
        </div>


        <div className="flex-auto px-6 py-6 w-full">
          {/* Form Content Here */}
          {currentStep === 1 && (
            <form>
              <h6 className="text-blueGray-600 text-sm mt-3 mb-4 font-bold uppercase">
                Step 1: Enter Details
              </h6>
              {/* Custom Margins for Increased Space */}
              <div className="flex flex-col">
                <div className="relative w-full mb-6"> {/* Increased margin */}
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Registration Number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blueGray-600 transition duration-200" />
                </div>
                <div className="relative w-full mb-6"> {/* Increased margin */}
                  {/* <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1">
                    Upload Photo 
                  </label>
                  <input
                    type="file"
                    onChange={handlePhotoUpload}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blueGray-600 transition duration-200" /> */}
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1">
        Upload Photo 
    </label>
    <input
        type="file"
        onChange={handlePhotoUpload}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blueGray-600 transition duration-200" 
    />
    {loading && ( // Loader is added here
        <div className="loader mt-2"> {/* Add your loader styles here */}
            Uploading...
        </div>
    )}
                
                
                </div>
                <div className="relative w-full mb-6"> {/* Increased margin */}
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1">
                    Violation Type
                  </label>
                  <select
                    value={violationType}
                    onChange={(e) => setViolationType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blueGray-600 transition duration-200"
                  >
                    <option value="">Select Violation Type</option>
                    {violationTypes.map((violation) => (
                      <option key={violation.id} value={violation.name}>
                        {violation.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative w-full mb-6"> {/* Increased margin */}
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1">
                    Location
                  </label>

                  <input
                    type="text"
                    placeholder="Enter Location of Violation"
                    value={Location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blueGray-600 transition duration-200" />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleNextStep}
                  className="bg-blueGray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md transition duration-200"
                  type="button"
                >
                  Next
                </button>
              </div>
            </form>

          )}
          {/* Step 2: Review Details */}
          {currentStep === 2 && (
            <div className="w-full">
              <h6 className="text-blueGray-600 text-sm mt-3 mb-4 font-bold uppercase">Step 2: Review Details</h6>
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Registration Number:</p>
                  <p className="text-blueGray-600 w-2/3">{registrationNumber}</p>
                </div>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Violation Location:</p>
                  <p className="text-blueGray-600 w-2/3">{Location}</p>
                </div>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Owner CNIC:</p>
                  <p className="text-blueGray-600 w-2/3">{dummyData.owner_cnic || "Loading..."}</p>
                </div>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Vehicle:</p>
                  <p className="text-blueGray-600 w-2/3">{dummyData.vehicle || "Loading..."}</p>
                </div>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Violation Type:</p>
                  <p className="text-blueGray-600 w-2/3">{dummyData.violation || "Loading..."}</p>
                </div>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Owner Name:</p>
                  <p className="text-blueGray-600 w-2/3">{ownerData.citizen_name || "Loading..."}</p>
                </div>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Owner Phone Number:</p>
                  <p className="text-blueGray-600 w-2/3">{ownerData.citizen_number || "Loading..."}</p>
                </div>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Owner Address:</p>
                  <p className="text-blueGray-600 w-2/3">{ownerData.citizen_address || "Loading..."}</p>
                </div>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Owner Email:</p>
                  <p className="text-blueGray-600  w-2/3 ">  {ownerData.citizen_email || "Loading..."}</p>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleBackStep}
                  className="bg-blueGray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md transition duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="bg-blueGray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md transition duration-200"
                >
                  Generate Challan
                </button>
              </div>
            </div>

          )}


          {currentStep === 3 && (
            <div className="w-full">
              <h6 className="text-blueGray-600 text-sm mt-3 mb-4 font-bold uppercase">Step 3: Generate Challan</h6>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-blueGray-800 font-semibold mb-1">Challan Generated Successfully!</p>
                <p className="text-blueGray-600 mb-4">Your challan has been created. Below are the details:</p>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Challan ID:</p>
                  <p className="text-blueGray-600 w-2/3">{dummyData.challanId }</p>
                </div>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Registration Number:</p>
                  <p className="text-blueGray-600 w-2/3">{registrationNumber}</p>
                </div>
                <div className="flex justify-left mb-3">
                  <p className="text-blueGray-800 font-semibold w-1/3 mr-4">Total Fine:</p>
                  <p className="text-blueGray-600 w-2/3">{dummyData.fineAmount}</p>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button onClick={GenerateChallan}
                  className="bg-blueGray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md transition duration-200"
                >
                  Submit Challan
                </button>
              </div>

              {/* Snackbar for success alert */}
              <Snackbar
                open={successSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSuccessSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert onClose={() => setSuccessSnackbarOpen(false)} severity="success">
                  Challan generated successfully!
                </Alert>
              </Snackbar>
            </div>
          )}
        </div>
      </div>



    </div>
   
    
);
};



export default WardenDashBoard;



