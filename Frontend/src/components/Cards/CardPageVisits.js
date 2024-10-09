import React, { useEffect, useState } from "react";
import Web3 from "web3";
import violationContracts from "../../contracts/violation";
import './App.css'; // Import the CSS file

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [challans, setChallans] = useState([]);

  // Initialize Web3
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
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    };

    initWeb3();
  }, []);

  // Fetch all challans
  const fetchChallans = async () => {
    try {
      const fetchedChallans = await contract.methods.getAllChallans().call();
      console.log("Fetched challans from contract:", fetchedChallans);

      const challansData = fetchedChallans.map(challan => ({
        id: challan.id.toString(),
        violatorName: challan.violatorName,
        violatorCnic: challan.violatorCnic,
        location: challan.location,
        violationDetails: challan.violationDetails,
        fineAmount: Number(challan.fineAmount),
        date: new Date(Number(challan.date) * 1000).toLocaleString(),
        registrationNumber: challan.registrationNumber,
      }));

      setChallans(challansData);
    } catch (error) {
      console.error("Error fetching challans:", error);
    }
  };

  // Call fetchChallans when contract is initialized
  useEffect(() => {
    if (contract) {
      fetchChallans();
    }
  }, [contract]);

  return (
    <div className="table-container">
      <h2 className="table-heading">All Traffic Challans</h2>
      {challans.length === 0 ? (
        <p className="no-challans">No challans found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Challan ID</th>
              <th>Date</th>
              <th>Registration Number</th>
              <th>Violator Name</th>
              <th>Violator CNIC</th>
              <th>Location</th>
              <th>Violation Details</th>
              <th>Fine Amount</th>
            </tr>
          </thead>
          <tbody>
            {challans.map((challan) => (
              <tr key={challan.id}>
                <td>{challan.id || 'N/A'}</td>
                <td>{challan.date || 'N/A'}</td>
                <td>{challan.registrationNumber || 'N/A'}</td>
                <td>{challan.violatorName || 'N/A'}</td>
                <td>{challan.violatorCnic || 'N/A'}</td>
                <td>{challan.location || 'N/A'}</td>
                <td>{challan.violationDetails || 'N/A'}</td>
                <td>{challan.fineAmount.toString() || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
