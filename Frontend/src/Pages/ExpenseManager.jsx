import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContextProvider";
import TransactionTable from "../Components/TransactionTable";

function ExpenseManager() {
  const {user}=useContext(UserContext);
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    date: "",
    description: "",
    transactionId:user.phone
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await fetch("https://expense-manager-e0ha.onrender.com/api/user/saveTransaction",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body:JSON.stringify(formData)
      })
      const data =await res.json();
      console.log(data);
      
    } catch (error) {
      console.log("ERROR IN SAVING TRANSACTION FRONTEND",error);
      
    }
  };
  return (
  <>
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Expenditure Type
          </label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="savings">Savings</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter description"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Save Transaction
          </button>
        </div>
      </form>
    </div>
    <TransactionTable/>
  </>
  )
}

export default ExpenseManager