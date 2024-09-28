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
    // Add more transactions as needed
  ];

  const additionalTransactions = [
    { id: "001238", amount: "₹300", status: "Pending", date: "2024-09-23" },
    { id: "001239", amount: "₹450", status: "Paid", date: "2024-09-22" },
    // Add more additional transactions as needed
  ];

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-4">
        <div className="rounded-t mb-0 px-4 py-3 border-0 border-blueGray-800 bg-blueGray-800"> {/* Added border class */}
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-white">
                Transaction History
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Transaction ID
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Amount
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {transaction.id}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {transaction.amount}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span className={transaction.status === "Pending" ? "text-orange-500" : "text-emerald-500"}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {transaction.date}
                  </td>
                </tr>
              ))}
              {showMore &&
                additionalTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {transaction.id}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {transaction.amount}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span className={transaction.status === "Pending" ? "text-orange-500" : "text-emerald-500"}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {transaction.date}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Button to toggle more transactions */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
