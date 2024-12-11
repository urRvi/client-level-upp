import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { default as api } from "../store/apiSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseTracker() {
  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();
  const [transactions, setTransactions] = useState([]); // State to store transaction history

  const onSubmit = async (data) => {
    if (!data) return;
    await addTransaction(data).unwrap();
    setTransactions([...transactions, data]);
    resetField("name");
    resetField("amount");
  };

  // Compute totals for chart
  const totals = transactions.reduce(
    (acc, transaction) => {
      acc[transaction.type] += parseFloat(transaction.amount) || 0;
      return acc;
    },
    { Investment: 0, Expense: 0, Savings: 0 }
  );

  const chartData = {
    labels: ["Savings", "Expense", "Investment"],
    datasets: [
      {
        data: [totals.Savings, totals.Expense, totals.Investment],
        backgroundColor: ["#3498db", "#e74c3c", "#1abc9c"],
        hoverBackgroundColor: ["#66bb6a", "#e57373", "#ffa726"],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center pb-6">Expenses</h1>

      {/* Chart Section */}
      <div className="flex justify-center items-center pb-10">
        <div className="w-1/2">
          <Pie data={chartData} />
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">Total: ₹{
              totals.Savings + totals.Expense + totals.Investment
            }</h2>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="form max-w-sm mx-auto w-96">
        <h2 className="font-bold pb-4 text-xl">Transaction</h2>
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="input-group">
              <input
                type="text"
                {...register("name")}
                placeholder="Food, House Rent, SIP, Misc"
                className="form-input border p-2 w-full"
              />
            </div>
            <select className="form-input border p-2 w-full" {...register("type")}>
              <option value="Investment" defaultValue>
                Investment
              </option>
              <option value="Expense">Expense</option>
              <option value="Savings">Savings</option>
            </select>
            <div className="input-group">
              <input
                type="number"
                {...register("amount")}
                placeholder="Amount"
                className="form-input border p-2 w-full"
              />
            </div>
            <div className="submit-btn">
              <button className="border py-2 text-white bg-indigo-500 w-full">
                Make Transaction
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Transaction History Section */}
      <div className="history max-w-lg mx-auto mt-10">
        <h2 className="font-bold text-xl pb-4">History</h2>
        <ul className="divide-y divide-gray-300">
          {transactions.map((transaction, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2"
            >
              <span className="text-lg">{transaction.name}</span>
              <span
                className={`text-sm font-bold px-2 py-1 rounded-lg ${
                  transaction.type === "Expense"
                    ? "bg-red-100 text-red-600"
                    : transaction.type === "Savings"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                ₹{transaction.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



// import React from "react";
// import { useForm } from "react-hook-form";
// import List from "./List";
// import { default as api } from "../store/apiSlice";

// export default function Form() {
//   const { register, handleSubmit, resetField } = useForm();
//   const [addTransaction] = api.useAddTransactionMutation();

//   const onSubmit = async (data) => {
//     if (!data) return {};
//     await addTransaction(data).unwrap();
//     resetField("name");
//     resetField("amount");
//   };

//   return (
//     <div className="form max-w-sm mx-auto w-96">
//       <h1 className="font-bold pb-4 text-xl">Transaction</h1>

//       <form id="form" onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid gap-4">
//           <div className="input-group">
//             <input
//               type="text"
//               {...register("name")}
//               placeholder="Salary, House Rend, SIP"
//               className="form-input"
//             />
//           </div>
//           <select className="form-input" {...register("type")}>
//             <option value="Investment" defaultValue>
//               Investment
//             </option>
//             <option value="Expense">Expense</option>
//             <option value="Savings">Savings</option>
//           </select>
//           <div className="input-group">
//             <input
//               type="text"
//               {...register("amount")}
//               placeholder="Amount"
//               className="form-input"
//             />
//           </div>
//           <div className="submit-btn">
//             <button className="border py-2 text-white bg-indigo-500 w-full">
//               Make Transaction
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* <List></List> */}
//     </div>
//   );
// }
