// import React from "react";
// import { Link } from "react-router-dom";

// // components

// import Navbar from "components/Navbars/AuthNavbar.js";
// import Footer from "components/Footers/Footer.js";
// import trafficvideo from "../assets/img/traffic.mp4"
// export default function Landing() {
//   return (
    
//     <><div className="absolute top-0 w-full h-full ">
//     <video
//       className="absolute top-0 left-100 w-full h-full object-cover"
//       autoPlay
//       loop
//       muted
//       playsInline
//     >
//       <source src={trafficvideo} type="video/mp4" />
//     </video>
   
//     <span
//       id="blackOverlay"
//       className="w-full h-full absolute opacity-50 bg-black"> 
      
//     </span>
//   </div>
//   <Navbar />
//       <main>
      




//         <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">

//           <div className="relative">
            

//             <div className="relative z-10">
//               <h1 className="text-white font-semibold text-5xl whitespace-nowrap overflow-hidden">
//                Future of Payments
//               </h1>
            

//               </div>
//             </div>
//           </div>
//           <div
//             className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
//             style={{ transform: "translateZ(0)" }}
//           >
//             <svg
//               className="absolute bottom-0 overflow-hidden"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="none"
//               version="1.1"
//               viewBox="0 0 2560 100"
//               x="0"
//               y="0"
//             >
//               <polygon
//                 className="text-blueGray-200 fill-current"
//                 points="2560 0 2560 100 0 100"
//               ></polygon>
//             </svg>
//           </div>
        
//         <section className="pb-20 bg-blueGray-200 -mt-24">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-wrap">
//               <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
//                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
//                   <div className="px-4 py-5 flex-auto">
//                     <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
//                       <i className="fas fa-award"></i>
//                     </div>
//                     <h6 className="text-xl font-semibold">Secure Transactions</h6>
//                     <p className="mt-2 mb-4 text-blueGray-500">
//                     Enjoy peace of mind with encrypted payments
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full md:w-4/12 px-4 text-center">
//                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
//                   <div className="px-4 py-5 flex-auto">
//                     <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
//                       <i className="fas fa-retweet"></i>
//                     </div>
//                     <h6 className="text-xl font-semibold">Detailed Records</h6>
//                     <p className="mt-2 mb-4 text-blueGray-500">
//                     Keep track of your payment history and challan details effortlessly
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="pt-6 w-full md:w-4/12 px-4 text-center">
//                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
//                   <div className="px-4 py-5 flex-auto">
//                     <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
//                       <i className="fas fa-fingerprint"></i>
//                     </div>
//                     <h6 className="text-xl font-semibold">Real-Time Updates</h6>
//                     <p className="mt-2 mb-4 text-blueGray-500">
//                     Receive instant notifications on your payment status, keeping you informed every step of the way
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-wrap items-center mt-32">
//   <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
//     <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
//       <i className="fas fa-users text-xl"></i>
//     </div>
//     <h3 className="text-3xl mb-2 font-semibold leading-normal">
//       Partnering for Safer Roads
//     </h3>
//     <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
//       Collaborate with us to create a more secure and efficient traffic payment system. Our platform integrates cutting-edge blockchain technology to ensure transparency and reliability.
//     </p>
//     <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
//       Our e-Challan solution provides quick payment processing and detailed records, making it easier for users to manage their traffic fines effectively.
//     </p>
//     <Link to="/" className="font-bold text-blueGray-700 mt-8">
//       Discover Our Solutions!
//     </Link>
//   </div>

//   <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
//     <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
//       <img
//         alt="Traffic Management"
//         src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
//         className="w-full align-middle rounded-t-lg"
//       />
//       <blockquote className="relative p-8 mb-4">
//         <svg
//           preserveAspectRatio="none"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 583 95"
//           className="absolute left-0 w-full block h-95-px -top-94-px"
//         >
//           <polygon
//             points="-30,95 583,95 583,65"
//             className="text-lightBlue-500 fill-current"
//           ></polygon>
//         </svg>
//         <h4 className="text-xl font-bold text-white">
//           Innovative Traffic Solutions
//         </h4>
//         <p className="text-md font-light mt-2 text-white">
//           Our blockchain-based system ensures secure transactions and immediate updates, making traffic management seamless and user-friendly.
//         </p>
//       </blockquote>
//     </div>
//   </div>
// </div>

// </div>
//         </section>

//         <section className="relative py-20">
//   <div
//     className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
//     style={{ transform: "translateZ(0)" }}
//   >
//     <svg
//       className="absolute bottom-0 overflow-hidden"
//       xmlns="http://www.w3.org/2000/svg"
//       preserveAspectRatio="none"
//       version="1.1"
//       viewBox="0 0 2560 100"
//       x="0"
//       y="0"
//     >
//       <polygon
//         className="text-white fill-current"
//         points="2560 0 2560 100 0 100"
//       ></polygon>
//     </svg>
//   </div>

//   <div className="container mx-auto px-4">
//     <div className="items-center flex flex-wrap">
//       <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
//         <img
//           alt="Traffic Payments"
//           className="max-w-full rounded-lg shadow-lg"
//           src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
//         />
//       </div>
//       <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
//         <div className="md:pr-12">
//           <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
//             <i className="fas fa-shield-alt text-xl"></i>
//           </div>
//           <h3 className="text-3xl font-semibold">Secure and Reliable</h3>
//           <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
//             Experience peace of mind with our blockchain-based security that ensures your transactions are safe and transparent.
//           </p>
//           <ul className="list-none mt-6">
//             <li className="py-2">
//               <div className="flex items-center">
//                 <div>
//                   <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
//                     <i className="fas fa-lock"></i>
//                   </span>
//                 </div>
//                 <div>
//                   <h4 className="text-blueGray-500">End-to-End Encryption</h4>
//                 </div>
//               </div>
//             </li>
//             <li className="py-2">
//               <div className="flex items-center">
//                 <div>
//                   <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
//                     <i className="fas fa-history"></i>
//                   </span>
//                 </div>
//                 <div>
//                   <h4 className="text-blueGray-500">Instant Payment History</h4>
//                 </div>
//               </div>
//             </li>
//             <li className="py-2">
//               <div className="flex items-center">
//                 <div>
//                   <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
//                     <i className="fas fa-comments"></i>
//                   </span>
//                 </div>
//                 <div>
//                   <h4 className="text-blueGray-500">24/7 Customer Support</h4>
//                 </div>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>


//         <section className="pt-20 pb-48">
          
//         </section>

//         <section className="pb-20 relative block bg-blueGray-800">
//           <div
//             className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
//             style={{ transform: "translateZ(0)" }}
//           >
//             <svg
//               className="absolute bottom-0 overflow-hidden"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="none"
//               version="1.1"
//               viewBox="0 0 2560 100"
//               x="0"
//               y="0"
//             >
//               <polygon
//                 className="text-blueGray-800 fill-current"
//                 points="2560 0 2560 100 0 100"
//               ></polygon>
//             </svg>
//           </div>

//           <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            
//             <div className="flex flex-wrap mt-12 justify-center">
//   <div className="w-full lg:w-3/12 px-4 text-center">
//     <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
//       <i className="fas fa-lock text-xl"></i> 
//     </div>
//     <h6 className="text-xl mt-5 font-semibold text-white">
//       Secure Transactions
//     </h6>
//     <p className="mt-2 mb-4 text-blueGray-400">
//       Your payments are safeguarded with advanced encryption and blockchain technology.
//     </p>
//   </div>

//   <div className="w-full lg:w-3/12 px-4 text-center">
//     <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
//       <i className="fas fa-history text-xl"></i>  
//     </div>
//     <h5 className="text-xl mt-5 font-semibold text-white">
//       Detailed Records
//     </h5>
//     <p className="mt-2 mb-4 text-blueGray-400">
//       Keep track of your payment history and challan details effortlessly in real-time.
//     </p>
//   </div>

//   <div className="w-full lg:w-3/12 px-4 text-center">
//     <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
//       <i className="fas fa-headset text-xl"></i> 
//     </div>
//     <h5 className="text-xl mt-5 font-semibold text-white">
//       24/7 Support
//     </h5>
//     <p className="mt-2 mb-4 text-blueGray-400">
//       Our dedicated support team is available round-the-clock to assist you with any inquiries.
//     </p>
//   </div>
// </div>





//           </div>
//         </section>
//         <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
//               <div className="w-full lg:w-6/12 px-4">
//                 <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
//                   <div className="flex-auto p-5 lg:p-10">
//                     <h4 className="text-2xl font-semibold">
//                       Want to work with us?
//                     </h4>
//                     <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
//                       Complete this form and we will get back to you in 24
//                       hours.
//                     </p>
//                     <div className="relative w-full mb-3 mt-8">
//                       <label
//                         className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                         htmlFor="full-name"
//                       >
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         placeholder="Full Name"
//                       />
//                     </div>

//                     <div className="relative w-full mb-3">
//                       <label
//                         className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                         htmlFor="email"
//                       >
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         placeholder="Email"
//                       />
//                     </div>

//                     <div className="relative w-full mb-3">
//                       <label
//                         className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                         htmlFor="message"
//                       >
//                         Message
//                       </label>
//                       <textarea
//                         rows="4"
//                         cols="80"
//                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                         placeholder="Type a message..."
//                       />
//                     </div>
//                     <div className="text-center mt-6">
//                       <button
//                         className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                         type="button"
//                       >
//                         Send Message
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// } 





// import React from "react";
// import { Link } from "react-router-dom";

// // components

// import Navbar from "components/Navbars/AuthNavbar.js";
// import Footer from "components/Footers/Footer.js";
// import trafficvideo from "../assets/img/traffic.mp4"
// export default function Landing() {
//   return (
    
//     <><div className="absolute top-0 w-full h-full ">
   
//   </div>
//   <Navbar />
//       <main>
      




//         <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">

//           <div className="relative">
            

//             <div className="relative z-10">
              
            

//               </div>
//             </div>
//           </div>
//           <div
//             className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
//             style={{ transform: "translateZ(0)" }}
//           >
//             <svg
//               className="absolute bottom-0 overflow-hidden"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="none"
//               version="1.1"
//               viewBox="0 0 2560 100"
//               x="0"
//               y="0"
//             >
//               <polygon
//                 className="text-blueGray-200 fill-current"
//                 points="2560 0 2560 100 0 100"
//               ></polygon>
//             </svg>
//           </div>
        
//         <section className="pb-20 bg-blueGray-200 -mt-24">
//           <div className="container mx-auto px-4">
            

//             <div className="flex flex-wrap items-center mt-32">
//   <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
//     <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
//       <i className="fas fa-users text-xl"></i>
//     </div>
//     <h3 className="text-3xl mb-2 font-semibold leading-normal">
//       Partnering for Safer Roads
//     </h3>
//     <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
//       Collaborate with us to create a more secure and efficient traffic payment system. Our platform integrates cutting-edge blockchain technology to ensure transparency and reliability.
//     </p>
//     <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
//       Our e-Challan solution provides quick payment processing and detailed records, making it easier for users to manage their traffic fines effectively.
//     </p>
//     <Link to="/" className="font-bold text-blueGray-700 mt-8">
//       Discover Our Solutions!
//     </Link>
//   </div>

//   <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
//     <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
//       <img
//         alt="Traffic Management"
//         src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
//         className="w-full align-middle rounded-t-lg"
//       />
//       <blockquote className="relative p-8 mb-4">
//         <svg
//           preserveAspectRatio="none"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 583 95"
//           className="absolute left-0 w-full block h-95-px -top-94-px"
//         >
//           <polygon
//             points="-30,95 583,95 583,65"
//             className="text-lightBlue-500 fill-current"
//           ></polygon>
//         </svg>
//         <h4 className="text-xl font-bold text-white">
//           Innovative Traffic Solutions
//         </h4>
//         <p className="text-md font-light mt-2 text-white">
//           Our blockchain-based system ensures secure transactions and immediate updates, making traffic management seamless and user-friendly.
//         </p>
//       </blockquote>
//     </div>
//   </div>
// </div>

// </div>
//         </section>

//         <section className="relative py-20">
//   <div
//     className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
//     style={{ transform: "translateZ(0)" }}
//   >
//     <svg
//       className="absolute bottom-0 overflow-hidden"
//       xmlns="http://www.w3.org/2000/svg"
//       preserveAspectRatio="none"
//       version="1.1"
//       viewBox="0 0 2560 100"
//       x="0"
//       y="0"
//     >
//       <polygon
//         className="text-white fill-current"
//         points="2560 0 2560 100 0 100"
//       ></polygon>
//     </svg>
//   </div>

//   <div className="container mx-auto px-4">
//     <div className="items-center flex flex-wrap">
//       <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
//         <img
//           alt="Traffic Payments"
//           className="max-w-full rounded-lg shadow-lg"
//           src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
//         />
//       </div>
//       <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
//         <div className="md:pr-12">
//           <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
//             <i className="fas fa-shield-alt text-xl"></i>
//           </div>
//           <h3 className="text-3xl font-semibold">Secure and Reliable</h3>
//           <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
//             Experience peace of mind with our blockchain-based security that ensures your transactions are safe and transparent.
//           </p>
//           <ul className="list-none mt-6">
//             <li className="py-2">
//               <div className="flex items-center">
//                 <div>
//                   <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
//                     <i className="fas fa-lock"></i>
//                   </span>
//                 </div>
//                 <div>
//                   <h4 className="text-blueGray-500">End-to-End Encryption</h4>
//                 </div>
//               </div>
//             </li>
//             <li className="py-2">
//               <div className="flex items-center">
//                 <div>
//                   <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
//                     <i className="fas fa-history"></i>
//                   </span>
//                 </div>
//                 <div>
//                   <h4 className="text-blueGray-500">Instant Payment History</h4>
//                 </div>
//               </div>
//             </li>
//             <li className="py-2">
//               <div className="flex items-center">
//                 <div>
//                   <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
//                     <i className="fas fa-comments"></i>
//                   </span>
//                 </div>
//                 <div>
//                   <h4 className="text-blueGray-500">24/7 Customer Support</h4>
//                 </div>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//      </div>
//    </section>


//         <section className="pt-20 pb-48">
          
//         </section>

//         <section className="pb-20 relative block bg-blueGray-800">
//           <div
//             className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
//             style={{ transform: "translateZ(0)" }}
//           >
//             <svg
//               className="absolute bottom-0 overflow-hidden"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="none"
//               version="1.1"
//               viewBox="0 0 2560 100"
//               x="0"
//               y="0"
//             >
//               <polygon
//                 className="text-blueGray-800 fill-current"
//                 points="2560 0 2560 100 0 100"
//               ></polygon>
//             </svg>
//           </div>

//           <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            
//             <div className="flex flex-wrap mt-12 justify-center">



 
//    </div>





//           </div>
//         </section>
        
//       </main>
//       <Footer />
//     </>
//   );
// } 
import React from "react";
import { Link } from "react-router-dom";
import LandingNavbar from "components/Navbars/LandingNavbar.js";
import Footer from "components/Footers/Footer.js";
import AOS from 'aos';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import 'aos/dist/aos.css';

export default function Landing() {
  // Initialize AOS
  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <LandingNavbar />
      <main className="bg-blueGray-800 relative overflow-hidden min-h-screen">
        {/* Background Gradient */}
        <div className="absolute top-0 w-full h-full bg-gradient-to-r from-blueGray-800 via-blueGray-900 to-blueGray-900 opacity-90"></div>

        {/* Hero Section */}
        <div className="container mx-auto relative px-6 flex items-center justify-between min-h-screen">
          {/* Left Side Text */}
          <div className="w-full md:w-5/12 text-left z-10" data-aos="fade-right">
            <h1 className="text-white font-extrabold text-5xl md:text-6xl mb-4 leading-tight">
              E-Challan Blockchain System
            </h1>
            <p className="mt-4 text-lg text-blueGray-300 leading-relaxed">
              Revolutionizing traffic management with secure, transparent, and efficient solutions.
            </p>
            
            {/* Call to Action Button */}
            <div className="mt-20">
  <Link
    to="/auth"
    className="bg-indigo-500 text-white font-bold uppercase text-sm px-8 py-4 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:bg-purple-700 hover:scale-105 flex items-center justify-center"
    data-aos="bounce"
  >
    <i className="fas fa-rocket mr-2"></i> {/* Adding a rocket icon from Font Awesome */}
    Get Started
  </Link>
</div>

          </div>

          {/* Right Side Image */}
          <div className="w-full md:w-6/12 flex justify-center mt-12 md:mt-0 z-10">
            <motion.img
              
              src={require("../assets/img/landd.png")}
            />
          </div>
        </div>

        {/* Diagonal Background Design */}
        <svg className="absolute bottom-0 left-0 w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#1e3c72"
            d="M0,160L60,192C120,224,240,288,360,288C480,288,600,224,720,202.7C840,181,960,203,1080,213.3C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
