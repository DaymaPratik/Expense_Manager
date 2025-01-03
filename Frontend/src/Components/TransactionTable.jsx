import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";

const TransactionTable = () => {
    const {user}=useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTransactions = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/transactions/${user.phone}`, // Ensure user.phone matches transactionId in the database
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const data = await response.json();
          setTransactions(data); // Update state with fetched transactions
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch transactions.");
          setLoading(false);
        }
      };
    fetchTransactions();
  }, [user.phone]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
    
        <table className="w-full border-collapse border border-gray-200 shadow-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200`}
            >
              <td className="border px-4 py-2">{transaction.date}</td>
              <td className="border px-4 py-2">{transaction.description}</td>
              <td className="border px-4 py-2">{transaction.amount}</td>
              <td
                className={`border px-4 py-2 ${
                  transaction.type === "Income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
