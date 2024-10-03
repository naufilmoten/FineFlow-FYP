// import React from "react";

// // CardProfile component now takes userDetails as a prop
// export default function CardProfile({ userDetails }) {
//   return (
//     <>
//       <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
//         <div className="px-6">
//           <div className="flex flex-wrap justify-center">
//             <div className="w-full px-4 flex justify-center">
//               <div className="relative">
//                 <img
//                   alt={userDetails.citizen_name} // Alt text for the image
//                   src={require("assets/img/team-2-800x800.jpg").default}
//                   className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
//                 />
//               </div>
//             </div>
//             <div className="w-full px-4 text-center mt-20">
//               <div className="flex justify-center py-4 lg:pt-4 pt-8">
//                 <div className="mr-4 p-3 text-center">
//                   <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
//                     {userDetails.citizen_name} {/* Display citizen name */}
//                   </span> 
//                   <span className="text-sm text-blueGray-400">
//                     Username: {userDetails.citizen_username} {/* Display citizen username */}
//                   </span>
//                 </div>
//                 <div className="mr-4 p-3 text-center">
//                   <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
//                     {userDetails.citizen_number} {/* Display citizen number */}
//                   </span>
//                   <span className="text-sm text-blueGray-400">Phone</span>
//                 </div>
//                 <div className="lg:mr-4 p-3 text-center">
//                   <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
//                     {userDetails.citizen_cnic} {/* Display citizen CNIC */}
//                   </span>
//                   <span className="text-sm text-blueGray-400">CNIC</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="text-center mt-12">
//             <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
//               {userDetails.citizen_name} {/* Display citizen name again */}
//             </h3>
//             <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
//               <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
//               {userDetails.citizen_address} {/* Display citizen address */}
//             </div>
//             <div className="mb-2 text-blueGray-600 mt-10">
//               <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
//               {userDetails.citizen_dob} {/* Display citizen DOB */}
//             </div>
//             <div className="mb-2 text-blueGray-600">
//               <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
//               {userDetails.citizen_email} {/* Display citizen email */}
//             </div>
//           </div>
//           <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
//             <div className="flex flex-wrap justify-center">
//               <div className="w-full lg:w-9/12 px-4">
//                 <a
//                   href="#pablo"
//                   className="font-normal text-lightBlue-500"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Show more
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// import React from "react";

// // CardProfile component now takes userDetails and registrationDetails as props
// export default function CardProfile({ userDetails, registrationDetails }) {
//   return (
//     <>
//       <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
//         <div className="px-6">
//           <div className="flex flex-wrap justify-center">
//             <div className="w-full px-4 flex justify-center">
//               <div className="relative">
//                 <img
//                   alt={userDetails.citizen_name} // Alt text for the image
//                   src={require("assets/img/team-2-800x800.jpg").default}
//                   className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
//                 />
//               </div>
//             </div>
//             <div className="w-full px-4 text-center mt-20">
//               <div className="flex justify-center py-4 lg:pt-4 pt-8">
//                 <div className="mr-4 p-3 text-center">
//                   <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
//                     {userDetails.citizen_name} {/* Display citizen name */}
//                   </span>
//                   <span className="text-sm text-blueGray-400">
//                     Username: {userDetails.citizen_username} {/* Display citizen username */}
//                   </span>
//                 </div>
//                 <div className="mr-4 p-3 text-center">
//                   <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
//                     {userDetails.citizen_number} {/* Display citizen number */}
//                   </span>
//                   <span className="text-sm text-blueGray-400">Phone</span>
//                 </div>
//                 <div className="lg:mr-4 p-3 text-center">
//                   <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
//                     {userDetails.citizen_cnic} {/* Display citizen CNIC */}
//                   </span>
//                   <span className="text-sm text-blueGray-400">CNIC</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="text-center mt-12">
//             <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
//               {userDetails.citizen_name} {/* Display citizen name again */}
//             </h3>
//             <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
//               <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
//               {userDetails.citizen_address} {/* Display citizen address */}
//             </div>
//             <div className="mb-2 text-blueGray-600 mt-10">
//               <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
//               {userDetails.citizen_dob} {/* Display citizen DOB */}
//             </div>
//             <div className="mb-2 text-blueGray-600">
//               <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
//               {userDetails.citizen_email} {/* Display citizen email */}
//             </div>
//           </div>

//           {/* Registration Details Section */}
//           <div className="mt-10">
//             <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
//               Registration Details
//             </h3>
//             <div className="flex flex-wrap justify-center">
//               {registrationDetails.length > 0 ? (
//                 registrationDetails.map((registration) => (
//                   <div
//                     key={registration.registration_id}
//                     className="bg-gray-100 shadow-lg rounded-lg p-4 m-2 w-80"
//                   >
//                     <h4 className="font-bold">Vehicle Name: {registration.vehicle_name}</h4>
//                     <p>Model: {registration.model}</p>
//                     <p>Registration ID: {registration.registration_id}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No registrations found for this citizen.</p>
//               )}
//             </div>
//           </div>

//           <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
//             <div className="flex flex-wrap justify-center">
//               <div className="w-full lg:w-9/12 px-4">
//                 <a
//                   href="#pablo"
//                   className="font-normal text-lightBlue-500"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   Show more
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";

// CardProfile component that takes userDetails and registrationDetails as props
export default function CardProfile({ userDetails, registrationDetails }) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-2/3 mb-4 shadow-md rounded-lg mt-6 p-8 ml-2">



        <div className="px-6">
          {/* Profile Picture and Basic Details */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <img
                alt={userDetails.citizen_name}
                src={require("assets/img/team-2-800x800.jpg").default}
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
          <div className="text-center mt-4">
            <h4 className="text-2xl font-semibold text-blueGray-800 mb-4">
              Vehicle Details
            </h4>

            {registrationDetails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {registrationDetails.map((registration) => (
                  <div
                    key={registration.registration_id}
                    className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    <h5 className="text-lg font-bold text-blueGray-700 mb-2">
                      {registration.vehicle_name}
                    </h5>
                    <p className="text-sm text-blueGray-500">
                      Model: {registration.model}
                    </p>
                    <p className="text-sm text-blueGray-500">
                      Registration ID: {registration.registration_id}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-blueGray-500 mt-4">No vehicle registrations found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
