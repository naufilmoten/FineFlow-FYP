import React, { useEffect, useState } from "react";
import Web3 from "web3";
import CardStats from "components/Cards/CardStats.js";
import violationContract from "../../contracts/violation.json"; // Update to import your violation contract
import finePaymentContract from "../../contracts/FinePayment.json"; // Import FinePayment contract

export default function HeaderStats() {
  const [challanCount, setChallanCount] = useState(0); // State variable for challan count
  const [totalFineCollected, setTotalFineCollected] = useState(0); // State for total fine collected

  useEffect(() => {
    const fetchChallanCount = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
      const networkId = await web3.eth.net.getId();
      const deployedViolationNetwork = violationContract.networks[networkId];

      if (!deployedViolationNetwork) {
        console.error("Contract network not found");
        return;
      }

      const violationContractInstance = new web3.eth.Contract(
        violationContract.abi,
        deployedViolationNetwork.address
      );

      // Fetch the challan count from the violation contract's counter
      const count = await violationContractInstance.methods.challanCounter().call(); 
      setChallanCount(parseInt(count)); // Update the state with the fetched count
    };

    const fetchTotalFineCollected = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
      const networkId = await web3.eth.net.getId();
      const deployedFinePaymentNetwork = finePaymentContract.networks[networkId];

      if (!deployedFinePaymentNetwork) {
        console.error("FinePayment contract network not found");
        return;
      }

      const finePaymentContractInstance = new web3.eth.Contract(
        finePaymentContract.abi,
        deployedFinePaymentNetwork.address
      );

      // Fetch the total fine collected
      const totalFine = await finePaymentContractInstance.methods.getTotalFinePayments().call();
      setTotalFineCollected(parseInt(totalFine)); // Update the state with the fetched total
    };

    fetchChallanCount();
    fetchTotalFineCollected(); // Fetch total fine collected
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="CHALLAN ISSUED"
                  statTitle={challanCount} // Link the state variable here
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="FINE COLLECTED"
                  statTitle={totalFineCollected} // Update to show total fine collected
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="AVERAGE TIME TAKEN"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NUMBER OF VIOLATORS"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
