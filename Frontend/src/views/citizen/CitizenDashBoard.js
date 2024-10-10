import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import violationContracts from "../../contracts/violation";
import FinePayment from "../../contracts/FinePayment";
import Modal from 'react-modal';
import Image from "assets/img/svgbd.gif" //Frontend\src\assets\img\svgbd.gif

Modal.setAppElement('#root'); // For accessibility warning

export default function CitizenDashBoard() {
  const { citizen_id } = useParams();
  const [challans, setChallans] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [contract2, setContract2] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const [selectedChallan, setSelectedChallan] = useState(null); // Selected challan for payment
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' }); // For card details

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/citizen/${citizen_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [citizen_id]);

  // Initialize Web3
  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = violationContracts.networks[networkId];
        const deployedNetwork2 = FinePayment.networks[networkId];

        if (!deployedNetwork || !deployedNetwork2) {
          throw new Error("Contract network not found");
        }

        const contractInstance = new web3.eth.Contract(
          violationContracts.abi,
          deployedNetwork.address
        );
        const contractInstance2 = new web3.eth.Contract(
          FinePayment.abi,
          deployedNetwork2.address
        );

        const accs = await web3.eth.getAccounts();
        setAccounts(accs);
        setContract(contractInstance);
        setContract2(contractInstance2);
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    };

    initWeb3();
  }, []);

  // Fetch Challans
  useEffect(() => {
    const getAllChallans = async () => {
      if (contract && accounts.length > 0 && userDetails.account_index !== undefined) {
        try {
          const response = await contract.methods.getChallansByCitizen(accounts[userDetails.account_index]).call();
          const challansWithStatus = await Promise.all(
            response.map(async (challan) => {
              const isPaid = await contract2.methods.isChallanPaid(challan.id).call();
              return { ...challan, isTerminated: isPaid };
            })
          );
          setChallans(challansWithStatus);
        } catch (error) {
          console.error("Error fetching challans:", error);
        }
      }
    };
    getAllChallans();
  }, [contract, accounts, userDetails.account_index, contract2]);

  // Handle payment after modal submission
  const handlePay = async (challan) => {
    try {
      const estimatedGas = await contract2.methods.payChallan(challan.id).estimateGas({
        from: accounts[userDetails.account_index],
        value: challan.fineAmount,
      });

      await contract2.methods.payChallan(challan.id).send({
        from: accounts[userDetails.account_index],
        gas: estimatedGas,
        value: challan.fineAmount,
      });

      const isPaid = await contract2.methods.isChallanPaid(challan.id).call();
      setChallans((prevChallans) =>
        prevChallans.map((c) =>
          c.id === challan.id ? { ...c, isTerminated: isPaid } : c
        )
      );
      alert("Payment successful and status updated!");
      setModalIsOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

    // Function to load Botpress scripts
    useEffect(() => {
      const loadBotpressChat = () => {
          const script1 = document.createElement('script');
          script1.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
          document.body.appendChild(script1);
  
          const script2 = document.createElement('script');
          script2.src = "https://mediafiles.botpress.cloud/73974da5-ca57-49d7-9b07-a45dd0375181/webchat/config.js";
          script2.defer = true;
          document.body.appendChild(script2);
      };
  
      loadBotpressChat();
  }, []);

  // Open modal for credit card details
  const openModal = (challan) => {
    setSelectedChallan(challan);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Handle modal form submission
// Handle modal form submission
const handleModalSubmit = () => {
  const { cardNumber, expiry, cvv } = cardDetails;

  // Clean the card number by removing spaces for validation
  const cleanedCardNumber = cardNumber.replace(/\s/g, '');

  // Validate card number
  if (cleanedCardNumber.length !== 16 || !/^\d{16}$/.test(cleanedCardNumber)) {
    alert("Card number must be exactly 16 numeric digits.");
    return;
  }

  // Validate expiry date
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    alert("Expiry date must be in MM/YY format.");
    return;
  }

  // Validate CVV
  if (!/^\d{1,3}$/.test(cvv)) {
    alert("CVV must be up to 3 numeric digits.");
    return;
  }

  // Proceed with payment if all validations pass
  if (selectedChallan) {
    handlePay(selectedChallan); // Trigger payment
  }
};


// Handle input changes for card details
const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Prevent non-numeric input for card number and CVV
  if (name === "cardNumber" && !/^\d*$/.test(value.replace(/\s/g, ''))) {
    return; // Do not update state if input is non-numeric
  }

  // Handle card number input
  if (name === "cardNumber") {
    const cleanedValue = value.replace(/\s/g, ''); // Remove existing spaces
    if (cleanedValue.length > 16) {
      return; // Do not update state if length exceeds 16
    }
    // Format card number with spaces after every 4 digits
    const formattedValue = cleanedValue.replace(/(.{4})/g, '$1 ').trim();
    setCardDetails({
      ...cardDetails,
      [name]: formattedValue,
    });
    return;
  }

  // Prevent non-numeric input for CVV
  if (name === "cvv" && !/^\d*$/.test(value)) {
    return; // Do not update state if input is non-numeric
  }

  // Limit CVV to 3 digits
  if (name === "cvv" && value.length > 3) {
    return; // Do not update state if length exceeds 3
  }

  // Handle expiry date input
  if (name === "expiry") {
    // Remove non-numeric characters
    const cleanedExpiry = value.replace(/\D/g, ''); 
    
    // Limit input to a maximum of 4 digits (MMYY)
    if (cleanedExpiry.length > 4) {
      return;
    }

    // Format MM/YY
    let formattedExpiry = '';
    if (cleanedExpiry.length > 0) {
      formattedExpiry += cleanedExpiry.slice(0, 2); // MM
      if (cleanedExpiry.length >= 3) {
        formattedExpiry += '/'; // Add '/' after MM
      }
      if (cleanedExpiry.length > 2) {
        formattedExpiry += cleanedExpiry.slice(2, 4); // YY
      }
    }

    // Validate month (MM) is between 01 and 12
    const month = parseInt(cleanedExpiry.slice(0, 2), 10);
    if (month > 12) {
      return; // Do not update state if month exceeds 12
    }

    setCardDetails({
      ...cardDetails,
      [name]: formattedExpiry,
    });
    return;
  }

  // Update state for other fields
  setCardDetails({
    ...cardDetails,
    [name]: value,
  });
};


  return (

<div 
  className="h-full pt-0 relative"
  style={{ 
    backgroundImage: `url(${Image})`,  // Set the background image here
    backgroundSize: 'cover',            // Ensures the image covers the entire container
    backgroundPosition: 'center',       // Centers the image
    backgroundRepeat: 'no-repeat',      // Ensures the image doesn't repeat
    minHeight: '100vh',                 // Ensures the container takes up the full viewport height
    color: 'white',                     // Optional: Change text color for contrast
    padding: 0,                         // Remove any padding
    width: '100vw',                     // Full width of viewport
    position: 'relative',               // Relative positioning for child elements
    left: 0,                            // Align to the left edge
    margin: 0,                           // Remove any padding
  }}
>
  <div className="flex justify-start mb-8 ml-6">
    <div className="relative" style={{ top: '0' }}> 
      {/* Additional content can go here */}
    </div>
  </div>


      <div className="flex flex-wrap justify-center items-start py-4 mt-[20px]">
      <div className="mb-2 mx-4 lg:mx-8" style={{ width: '80%' }}> 
          

          <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="bg-blueGray-800 text-white text-center py-4 rounded-t-lg">
              <h1 className="text-2xl font-bold">Traffic Challans</h1>
            </div>
            <div className="p-4">
              <table className="w-full bg-white text-blueGray-800 table-auto">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Challan ID</th>
                    <th className="py-2 px-4 border-b">Registration ID</th>
                    <th className="py-2 px-4 border-b">Violation</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {challans.length > 0 ? (
                    challans.map((challan) => (
                      <tr key={challan.id}>
                        <td className="py-2 px-4 border-b">{challan.id.toString()}</td>
                        <td className="py-2 px-4 border-b">{challan.registrationNumber}</td>
                        <td className="py-2 px-4 border-b">{challan.violationDetails}</td>
                        <td className="py-2 px-4 border-b">{challan.fineAmount.toString()}</td>
                        <td className="py-2 px-4 border-b">{challan.date.toString()}</td>
                        <td className="py-2 px-4 border-b">{challan.isTerminated ? "Terminated" : "Active"}</td>
                        <td className="py-2 px-4 border-b">
                          {!challan.isTerminated && (
                            <button
                              onClick={() => openModal(challan)} // Open modal on click
                              className="bg-blueGray-800 text-white font-bold py-1 px-3 rounded"
                            >
                              Pay Now
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-2 px-4 border-b text-center">No Challans Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for credit card details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Credit Card Details"
        overlayClassName="overlay"
        style={{
          content: {
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            top: '50%', // Position from the top
            left: '50%', // Position from the left
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)', // Center the modal
            padding: '20px',
            maxWidth: '400px',
            width: '90%', // Responsive width
            borderRadius: '10px', // Rounded corners
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark overlay
          }
        }}
      >
         <h2 className="text-lg font-bold mb-4" style={{ textAlign: 'center' }}>
    Payment Details
    <br />
    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>(Please fill in your card information)</span>
  </h2>
        <form onSubmit={(e) => { e.preventDefault(); handleModalSubmit(); }}>
          <div className="mb-4">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              className="px-2 py-1 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="expiry"
              placeholder="Expiry (MM/YY)"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              className="px-2 py-1 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              className="px-2 py-1 border rounded w-full"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blueGray-800 text-white font-bold py-2 px-4 rounded"
            >
              Pay Now
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
