import React from "react";
import { Chart, registerables } from 'chart.js'; // Import Chart.js properly

// Register all necessary components
Chart.register(...registerables);

export default function CardBarChart() {
  React.useEffect(() => {
    // Clean up previous chart instance if it exists
    if (window.myPieChart) {
      window.myPieChart.destroy();
    }

    let config = {
      type: "pie", // Use pie chart
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Total Orders", // Keep a label for the dataset
            backgroundColor: [
              "#ed64a6",
              "#4c51bf",
              "#ff6384",
              "#36a2eb",
              "#ffce56",
              "#e2e2e2",
              "#00aaff",
            ],
            data: [30, 78, 56, 34, 100, 45, 13],
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
                const dataPoint = tooltipItem.raw; // Get the value of the pie slice
                return `${datasetLabel}: ${dataPoint}`; // Customize tooltip text
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
    window.myPieChart = new Chart(ctx, config); // Create a new chart instance
  }, []);
  
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Total orders
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
