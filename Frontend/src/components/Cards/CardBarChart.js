import React, { useEffect, useState } from "react";
import { Chart, registerables } from 'chart.js';
import Web3 from "web3";
import violationCount from "../../contracts/ViolationCounter.json";

// Register all necessary components
Chart.register(...registerables);

export default function CardBarChart() {
  const [violationCounts, setViolationCounts] = useState({});

  useEffect(() => {
    const fetchViolationCounts = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = violationCount.networks[networkId];

      if (!deployedNetwork) {
        console.error("Contract network not found");
        return;
      }

      const contractInstance = new web3.eth.Contract(
        violationCount.abi,
        deployedNetwork.address
      );

      // Define the types of violations you want to track
      const violationTypes = [
        "Speeding (LTV)",
        "Parking (LTV)",
        "No Seatbelt (LTV)",
        "Traffic Signal Violation (LTV)",
        "Wrong Way (LTV)",
        "Tinted Windows (LTV)",
        "Speeding (Motorbike)",
        "Parking (Motorbike)",
        "No Helmet (Motorbike)",
        "Traffic Signal Violation (Motorbike)",
        "Wrong Way (Motorbike)",
        "Pillion Riding (Motorbike)",
        "Speeding (HTV)",
        "Parking (HTV)",
        "No Seatbelt (HTV)",
        "Traffic Signal Violation (HTV)",
        "Wrong Way (HTV)",
        "Tinted Windows (HTV)",
      ];

      // Fetch counts for each violation type
      const counts = await Promise.all(
        violationTypes.map(async (type) => {
          const count = await contractInstance.methods.getViolationCount(type).call();
          return { type, count: parseInt(count) }; // Convert the count to an integer
        })
      );

      // Update the state with the fetched counts
      const countsMap = {};
      counts.forEach(({ type, count }) => {
        countsMap[type] = count;
      });
      setViolationCounts(countsMap);
    };

    fetchViolationCounts();
  }, []);

  useEffect(() => {
    // Clean up previous chart instance if it exists
    if (window.myPieChart) {
      window.myPieChart.destroy();
    }

    const labels = Object.keys(violationCounts);
    const data = Object.values(violationCounts);

    let config = {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Violation Counts",
            backgroundColor: [
              "#ed64a6",
              "#4c51bf",
              "#ff6384",
              "#36a2eb",
              "#ffce56",
              "#e2e2e2",
              "#00aaff",
              "#7b1fa2",
              "#ff5733",
              "#33ff57",
              "#5733ff",
              "#f0c1c0",
              "#c1f0c0",
              "#c0c1f0",
              "#f0f1c0",
              "#c0f0f1",
              "#f1c0f0",
            ],
            data: data,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const datasetLabel = tooltipItem.dataset.label || '';
                const dataPoint = tooltipItem.raw;
                return `${datasetLabel}: ${dataPoint}`;
              },
            },
          },
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
      },
    };

    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myPieChart = new Chart(ctx, config);
  }, [violationCounts]);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
              Performance
            </h6>
            <h2 className="text-blueGray-700 text-xl font-semibold">
              Violation Counts
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-350-px">
          <canvas id="bar-chart"></canvas>
        </div>
      </div>
    </div>
  );
}
