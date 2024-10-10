import React, { useEffect, useState } from "react";
import { Chart, registerables } from 'chart.js';
import Web3 from "web3";
import violationContract from "../../contracts/violation.json"; // Import your violation contract JSON
import finePaymentContract from "../../contracts/FinePayment.json"; // Import your FinePayment contract JSON

// Register all necessary components
Chart.register(...registerables);

export default function CardLineChart() {
  const [violationCounts, setViolationCounts] = useState(Array(24).fill(0)); // Initialize an array for 24 hours
  const [fineCounts, setFineCounts] = useState(Array(24).fill(0)); // Initialize an array for the number of fines

  useEffect(() => {
    const fetchViolationEvents = async () => {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = violationContract.networks[networkId];
        const finePaymentNetwork = finePaymentContract.networks[networkId];

        if (!deployedNetwork || !finePaymentNetwork) {
            console.error("Contract network not found");
            return;
        }

        const violationContractInstance = new web3.eth.Contract(
            violationContract.abi,
            deployedNetwork.address
        );

        const finePaymentContractInstance = new web3.eth.Contract(
            finePaymentContract.abi,
            finePaymentNetwork.address
        );

        // Fetch all challans (violations)
        const challans = await violationContractInstance.methods.getAllChallans().call();
        const violationCounts = Array(24).fill(0);

        challans.forEach(challan => {
            const timestamp = parseInt(challan.date, 10); // Ensure timestamp is a number
            const date = new Date(timestamp * 1000);
            const localHour = (date.getUTCHours() + 5) % 24; // Adjust for local timezone

            if (localHour >= 0 && localHour < 24) {
                violationCounts[localHour]++;
            }
        });

        setViolationCounts(violationCounts);

        // Use an appropriate method to get the payment count
        // Assuming you have the getPaymentCount function defined
        const paymentCount = await finePaymentContractInstance.methods.getPaymentCount().call();
        const fineCountsArray = Array(24).fill(0);

        // Loop through each payment to count fines by hour
        for (let i = 0; i < paymentCount; i++) { // Use zero-based index
            const payment = await finePaymentContractInstance.methods.payments(i).call(); // Adjust for zero-based index
            const paymentTimestamp = Number(payment.paymentTimestamp); // Convert BigInt to Number
            const date = new Date(paymentTimestamp * 1000); // Convert to date
            const localHour = (date.getUTCHours() + 5) % 24; // Adjust for local timezone

            if (localHour >= 0 && localHour < 24) {
                fineCountsArray[localHour]++; // Increment fine count for the corresponding hour
            }
        }

        setFineCounts(fineCountsArray); // Update the state with the fine counts
    };

    fetchViolationEvents();
}, []);

  useEffect(() => {
    const ctx = document.getElementById("line-chart").getContext("2d");

    // Chart configuration
    const config = {
      type: "line",
      data: {
        labels: [
          "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", 
          "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", 
          "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", 
          "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", 
          "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
        ],
        datasets: [
          {
            label: 'Violation Counts',
            backgroundColor: "#ffce56",
            borderColor: "#ffce56",
            data: violationCounts,
            fill: false,
            tension: 0.1, // Optional: for smoother line transitions
          },
          {
            label: 'Fine Payments Collected',
            backgroundColor: "#ed1216", // Different color for the fine payments line
            borderColor: "#ed1216",
            data: fineCounts, // Number of fines
            fill: false,
            tension: 0.1, // Optional: for smoother line transitions
          }
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "white",
            },
            position: "bottom",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "rgba(255,255,255,.7)",
            },
            grid: {
              display: false,
              borderDash: [2],
              color: "rgba(33, 37, 41, 0.3)",
            },
          },
          y: {
            ticks: {
              color: "rgba(255,255,255,.7)",
            },
            grid: {
              borderDash: [3],
              color: "rgba(255, 255, 255, 0.15)",
            },
          },
        },
      },
    };

    // Create the chart
    const myLineChart = new Chart(ctx, config);

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      myLineChart.destroy();
    };
  }, [violationCounts, fineCounts]); // Update the chart when violationCounts or fineCounts change

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Violations and Fine Payments (Last 24 Hours)</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
