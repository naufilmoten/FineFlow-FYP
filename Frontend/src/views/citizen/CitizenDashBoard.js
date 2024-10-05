import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import violationContracts from "../../contracts/violation";
import FinePayment from "../../contracts/FinePayment";
import Modal from 'react-modal';

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
  const handleModalSubmit = () => {
    if (selectedChallan) {
      if (cardDetails.cardNumber && cardDetails.expiry && cardDetails.cvv) {
        handlePay(selectedChallan); // Trigger payment
      } else {
        alert("Please enter valid card details.");
      }
    }
  };

  // Handle input changes for card details
  const handleInputChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 lg:px-12 h-full pt-20 relative">
      <div className="flex flex-wrap justify-center items-start py-4">
        <div className="w-full lg:w-10/12 mb-6 mx-4 lg:mx-8">
          <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="bg-blueGray-800 text-white text-center py-4 rounded-t-lg">
              <h1 className="text-2xl font-bold">Traffic Challans</h1>
            </div>
            <div className="p-4">
              <table className="w-full bg-white table-auto">
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
