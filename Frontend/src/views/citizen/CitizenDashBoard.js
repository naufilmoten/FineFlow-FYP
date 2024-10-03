// CitizenDashBoard.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import violationContracts from "../../contracts/violation";
import FinePayment from "../../contracts/FinePayment";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import PaymentForm from './PaymentForm'; // Ensure the path is correct

export default function CitizenDashBoard() {
  const { citizen_id } = useParams(); // Extract citizen_id from URL
  const [challans, setChallans] = useState([]); // State to hold challans
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [contract2, setContract2] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false); // State to control PaymentForm visibility
  const [selectedChallan, setSelectedChallan] = useState(null); // State to track the challan being paid

  // Fetch user details based on citizen_id when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const response = await axios.get(`http://localhost:5000/api/citizen/${citizen_id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the request headers
          }
        });
        setUserDetails(response.data); // Set the user details in the state
        console.log("User details:", response.data); // Log user details to console
      } catch (error) {
        console.error("Error fetching user details:", error); // Log any error that occurs
      }
    };
    
    fetchUserDetails();
  }, [citizen_id]);

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
        console.log("Web3 initialized");
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    };

    initWeb3();
  }, []);

  // Fetch Challans when contract is set and accounts are available
  useEffect(() => {
    const getAllChallans = async () => {
      if (contract && accounts.length > 0 && userDetails.account_index !== undefined) {
        try {
          // Fetch the challans first
          const response = await contract.methods.getChallansByCitizen(accounts[userDetails.account_index]).call();
          console.log("Challans fetched:", response);

          // For each challan, check if it's paid
          const challansWithStatus = await Promise.all(
            response.map(async (challan) => {
              const isPaid = await contract2.methods.isChallanPaid(challan.id).call();
              return {
                ...challan,
                isTerminated: isPaid, // Update challan status with `isPaid` value
              };
            })
          );

          setChallans(challansWithStatus); // Update state with challans that include their payment status
        } catch (error) {
          console.error("Error fetching challans:", error);
        }
      }
    };
  
    getAllChallans();
  }, [contract, accounts, userDetails.account_index, contract2]); // Add contract2 to dependencies since it's used

  // Handle the payment and update the challan status
  const handlePay = async (challan) => {
    try {
      const estimatedGas = await contract2.methods.payChallan(challan.id).estimateGas({
        from: accounts[userDetails.account_index],
        value: challan.fineAmount,
      });
  
      const response = await contract2.methods.payChallan(challan.id).send({
        from: accounts[userDetails.account_index],
        gas: estimatedGas,
        value: challan.fineAmount,
      });
  
      console.log("Payment successful:", response);
  
      // Check if the payment has been registered as successful
      const isPaid = await contract2.methods.isChallanPaid(challan.id).call();
  
      // Update challan status in the frontend
      setChallans((prevChallans) =>
        prevChallans.map((c) =>
          c.id === challan.id ? { ...c, isTerminated: isPaid } : c
        )
      );
  
      alert("Payment successful and status updated!");
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // Function to handle "Pay Now" button click
  const handlePayNowClick = (challan) => {
    setSelectedChallan(challan); // Set the challan to be paid
    setIsPaymentFormOpen(true); // Open the payment form
  };

  // Function to handle payment success from PaymentForm
  const handlePaymentSuccess = () => {
    if (selectedChallan) {
      handlePay(selectedChallan); // Perform the blockchain payment
      setSelectedChallan(null); // Reset selected challan
    }
  };

  return (
    <div className="container mx-auto px-12 h-full pt-20 relative"> {/* Added 'relative' for absolute positioning */}
      <div className="flex flex-wrap justify-center items-start py-4"> {/* Added vertical padding to the flex container */}
        <div className="w-full lg:w-8/12 xl:w-6/12 px-10 mb-6 mx-8">
          <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="bg-blueGray-800 text-white text-center py-4 rounded-t-lg">
              <h1 className="text-2xl font-bold">Traffic Challans</h1>
            </div>
            <div className="p-8">
              <table className="min-w-full bg-white">
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
                        <td className="py-2 px-4 border-b text-center">{challan.id.toString()}</td>
                        <td className="py-2 px-4 border-b text-center">{challan.registrationNumber}</td>
                        <td className="py-2 px-4 border-b">{challan.violationDetails}</td>
                        <td className="py-2 px-4 border-b">{challan.fineAmount.toString()}</td>
                        <td className="py-2 px-4 border-b">{challan.date.toString()}</td>
                        <td className="py-2 px-4 border-b">{challan.isTerminated ? "Terminated" : "Active"}</td>
                        <td className="py-2 px-4 border-b">
                          {!challan.isTerminated && (
                            <button
                              onClick={() => handlePayNowClick(challan)}
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

      {/* Render PaymentForm as a modal */}
      {isPaymentFormOpen && (
        <PaymentForm
          onClose={() => setIsPaymentFormOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
