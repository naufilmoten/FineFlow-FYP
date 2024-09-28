import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Dummy data for violation types
const violationTypes = [
  { id: 1, name: "Speeding" },
  { id: 2, name: "Running a red light" },
  { id: 3, name: "No seatbelt" },
  // Add more violation types as needed
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
  const [photo, setPhoto] = useState(null);
  const [violationType, setViolationType] = useState("");
  const [dummyData, setDummyData] = useState({});
  const [userDetails, setUserDetails] = useState({}); // State to hold user details

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/warden/${warden_id}`);
        setUserDetails(response.data); // Assuming response contains user details
        console.log("User details:", response.data); // Log user details
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [warden_id]); // Fetch user details when warden_id changes

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      // Simulate fetching data based on the registration number
      setDummyData({
        owner: "John Doe",
        vehicle: "Toyota Camry",
        violation: violationType,
      });
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
                <div className="h-1 w-10 bg-gray-300 mx-2"></div> // Arrow representation
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
                <strong>Owner:</strong> {dummyData.owner || "Loading..."}
              </p>
              <p>
                <strong>Vehicle:</strong> {dummyData.vehicle || "Loading..."}
              </p>
              <p>
                <strong>Violation Type:</strong> {dummyData.violation || "Loading..."}
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
              <p>Owner: {dummyData.owner || "N/A"}</p>
              <p>Vehicle: {dummyData.vehicle || "N/A"}</p>
              <p>Violation Type: {dummyData.violation || "N/A"}</p>
              <p>
                <strong>Photo:</strong> {photo ? photo.name : "No photo uploaded"}
              </p>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleBackStep}
                  className="bg-blueGray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md transition duration-200"
                >
                  Back
                </button>
                <button className="bg-blueGray-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md transition duration-200">
                  Confirm Challan
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
