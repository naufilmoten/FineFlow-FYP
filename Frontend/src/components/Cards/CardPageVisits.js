import React, { useState } from "react";

export default function CardPageVisits() {
  // State to manage visibility of additional transactions
  const [showMore, setShowMore] = useState(false);

  // Sample data for transactions
  const transactions = [
    { id: "001234", amount: "₹500", status: "Pending", date: "2024-09-27" },
    { id: "001235", amount: "₹1000", status: "Paid", date: "2024-09-26" },
    { id: "001236", amount: "₹750", status: "Pending", date: "2024-09-25" },
    { id: "001237", amount: "₹1200", status: "Paid", date: "2024-09-24" },
  ];

  const additionalTransactions = [
    { id: "001238", amount: "₹300", status: "Pending", date: "2024-09-23" },
    { id: "001239", amount: "₹450", status: "Paid", date: "2024-09-22" },
  ];

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="rounded-t mb-0 px-4 py-4 border-0 bg-blueGray-800">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-white">Transaction History</h3>
            </div>
          </div>
        </div>
        
        {/* Transaction Table */}
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Transaction ID
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Amount
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                    {transaction.id}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                    {transaction.amount}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span className={transaction.status === "Pending" ? "text-orange-500" : "text-emerald-500"}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                    {transaction.date}
                  </td>
                </tr>
              ))}
              {showMore &&
                additionalTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {transaction.id}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                      {transaction.amount}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span className={transaction.status === "Pending" ? "text-orange-500" : "text-emerald-500"}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                      {transaction.date}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Show More/Less Button */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition ease-linear duration-150"
            type="button"
            onClick={toggleShowMore}
          >
            {showMore ? "Show Less" : "See All"}
          </button>
        </div>
      </div>
    </>
  );
}
