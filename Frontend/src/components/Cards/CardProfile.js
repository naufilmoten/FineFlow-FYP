

import React from "react";
import manImage from "assets/img/man.png"

// CardProfile component that takes userDetails and registrationDetails as props
export default function CardProfile({ userDetails, registrationDetails }) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-2/3 mb-4 shadow-md rounded-lg mt-6 p-8 ml-2 border border-blue-gray-800">



        <div className="px-6">
          {/* Profile Picture and Basic Details */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <img
                alt={userDetails.citizen_name}
                src={manImage}
                className="shadow-xl rounded-full h-auto border-none -mt-16 max-w-150-px"
              />
            </div>
          </div>

          {/* Citizen Details */}
          <div className="text-center">
            <h3 className="text-3xl font-semibold leading-normal mb-2 text-blueGray-800">
              {userDetails.citizen_name}
            </h3>
            <p className="text-sm font-light text-blueGray-500 mb-4">
              @{userDetails.citizen_username}
            </p>

            <div className="flex justify-center mb-6">
              <div className="text-center p-4">
                <span className="block text-lg font-semibold text-blueGray-700">
                  {userDetails.citizen_number}
                </span>
                <span className="text-sm text-blueGray-400">Phone</span>
              </div>
              <div className="text-center p-4">
                <span className="block text-lg font-semibold text-blueGray-700">
                  {userDetails.citizen_cnic}
                </span>
                <span className="text-sm text-blueGray-400">CNIC</span>
              </div>
            </div>

            {/* Citizen Address and Email */}
            <div className="text-blueGray-600 mb-4">   
              <i className="fas fa-map-marker-alt mr-2"></i>
              {userDetails.citizen_address}
            </div>
            <div className="text-blueGray-600 mb-2">
              <i className="fas fa-envelope mr-2"></i>
              {userDetails.citizen_email}
            </div>
            <div className="text-blueGray-600">
              <i className="fas fa-calendar-alt mr-2"></i>
              DOB: {userDetails.citizen_dob}
            </div>
          </div>

          {/* Separator Line */}
          <div className="my-4 border-t border-gray-300"></div>

          {/* Registration Details */}
          <div className="text-center mt-4 bg-blueGray-800 p-4 rounded-lg">
  <h4 className="text-2xl font-semibold text-white mb-4">
    Vehicle Details
  </h4>

  {registrationDetails.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {registrationDetails.map((registration) => (
        <div
          key={registration.registration_id}
          className="bg-gray-50 p-4 rounded-lg shadow-md transition-all duration-300 hover:bg-blueGray-700 hover:scale-105 hover:shadow-lg transform"
        >
          <h5 className="text-lg font-bold text-white mb-2">
            {registration.vehicle_name}
          </h5>
          <p className="text-sm text-white">
            Model: {registration.model}
          </p>
          <p className="text-sm text-white">
            Registration ID: {registration.registration_id}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-white mt-4">No vehicle registrations found.</p>
  )}
</div>

        </div>
      </div>
    </>
  );
}
