import React, { useState, useEffect } from "react";
import violationContracts from "../../contracts/violation"
import Web3 from "web3";

// Dummy data for violation types
const violationTypes = [
  { id: 1, name: "Speeding" },
  { id: 2, name: "Running a red light" },
  { id: 3, name: "No seatbelt" },
  { id: 4, name: "Traffic Signal Violation" },
  { id: 5, name: "Wrong Way" },
  { id: 6, name: "Tinted Windows" },
  // Add more violation types as needed
];

const steps = [
  { id: 1, name: "Enter Details" },
  { id: 2, name: "Review Details" },
  { id: 3, name: "Generate Challan" },
];

const WardenDashBoard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [Location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [violationType, setViolationType] = useState("");
  const [dummyData, setDummyData] = useState({});
  const [ownerData, setOwnerData] = useState({});


  //new
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);



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
    if (currentStep === 1) {
      try {
        // Fetch vehicle details based on registration number
        const response = await fetch(`http://localhost:5000/api/registration/${registrationNumber}`);
        const vehicleData = await response.json();

        // Set vehicle data
        setDummyData({
          owner_cnic: vehicleData.owner_cnic,
          vehicle: vehicleData.vehicle_name,
          violation: violationType,
        });

        // Fetch owner details based on owner CNIC
        const ownerResponse = await fetch(`http://localhost:5000/api/citizen/cnic/${vehicleData.owner_cnic}`);
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

  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-8">
      <div className="relative flex flex-col min-w-0 break-words w-full max-w-md mb-6 shadow-lg rounded-lg bg-gray border-0 mt-2">
        <div className="bg-blueGray-800 text-white text-center py-10 rounded-t-lg">
          <h1 className="text-2xl font-bold">Traffic Violation Form</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mt-4 mb-4 px-6">
          {steps.map((step) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full ${
                    currentStep >= step.id ? "bg-indigo-600" : "bg-gray-300"
                  } transition duration-200`}
                >
                  {currentStep >= step.id ? (
                    <span className="text-white">✓</span>
                  ) : (
                    <span className="text-black">{step.id}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    currentStep >= step.id ? "text-indigo-600" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {step.id < steps.length && (
                <div className="h-1 w-10 bg-gray-300 mx-2"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex-auto px-6 py-6">
          {currentStep === 1 && (
            <form>
              <h6 className="text-blueGray-600 text-sm mt-3 mb-4 font-bold uppercase">
                Step 1: Enter Details
              </h6>
              <div className="flex flex-col space-y-4">
                <div className="relative w-full">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1">Registration Number</label>
                  <input
                    type="text"
                    placeholder="Enter Registration Number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blueGray-600 transition duration-200"
                  />
                </div>
                <div className="relative w-full">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1">Upload Photo</label>
                  <input
                    type="file"
                    onChange={handlePhotoUpload}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blueGray-600 transition duration-200"
                  />
                </div>
                <div className="relative w-full">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1">Violation Type</label>
                  <select
                    value={violationType}
                    onChange={(e) => setViolationType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blueGray-600 transition duration-200"
                  >
                    <option value="">Select Violation Type</option>
                    {violationTypes.map((violation) => (
                      <option key={violation.id} value={violation.name}>
                        {violation.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative w-full">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Enter Location of Violation"
                    value={Location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blueGray-600 transition duration-200"
                  />
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

{currentStep === 2 && (
  <div>
    <h6 className="text-blueGray-600 text-sm mt-3 mb-4 font-bold uppercase">Step 2: Review Details</h6>
    <p>
      <strong>Registration Number:</strong> {registrationNumber}
    </p>
    <p>
      <strong>Violation Location:</strong> {Location}
    </p>
    <p>
      <strong>Owner CNIC:</strong> {dummyData.owner_cnic || "Loading..."}
    </p>
    <p>
      <strong>Vehicle:</strong> {dummyData.vehicle || "Loading..."}
    </p>
    <p>
      <strong>Violation Type:</strong> {dummyData.violation || "Loading..."}
    </p>
    <p>
      <strong>Owner Name:</strong> {ownerData.citizen_name || "Loading..."}
    </p>
    <p>
      <strong>Owner Phone Number:</strong> {ownerData.citizen_number || "Loading..."}
    </p>
    <p>
      <strong>Owner Address:</strong> {ownerData.citizen_address || "Loading..."}
    </p>
    <p>
      <strong>Owner Email:</strong> {ownerData.citizen_email || "Loading..."}
    </p>

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
            <div>
              <h6 className="text-blueGray-600 text-sm mt-3 mb-4 font-bold uppercase">Step 3: Generate Challan</h6>
              <p>
                <strong>Challan Preview</strong>
              </p>
              <p>Registration Number: {registrationNumber}</p>
              <p>Violation Location: {Location}</p>
              <p>Owner CNIC: {dummyData.owner_cnic || "N/A"}</p>
              <p>Vehicle: {dummyData.vehicle || "N/A"}</p>
              <p>Violation Type: {dummyData.violation || "N/A"}</p>
              <p>
                <strong>Photo:</strong> {photo ? photo.name : "No photo uploaded"}
              </p>

              <div className="flex justify-center mt-6">
                <button
                  className="bg-blueGray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md transition duration-200"
                >
                  Submit Challan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WardenDashBoard;
