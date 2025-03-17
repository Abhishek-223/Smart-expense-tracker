import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import axios from "axios";

const ExpenseList = ({ openEditForm }) => {
  const { expenses, deleteExpense, updateExpense } = useExpenses();
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Sort expenses
  const sortedExpenses = [...expenses].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.amount - a.amount;
      case "lowest":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  // Filter expenses
  const filteredExpenses =
    categoryFilter === "all"
      ? sortedExpenses
      : sortedExpenses.filter((expense) => expense.category === categoryFilter);

  // Handle Image Upload (Cloudinary)
  const handleImageUpload = async (e, expenseId) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("receipt", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://smart-expense-tracker-f7q7.onrender.com/api/uploads/receipt",
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        }
      );

      // Update expense with receipt URL
      await updateExpense(expenseId, { receiptUrl: response.data.url });

    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload receipt");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      {/* Filters */}
      <div className="flex justify-between mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="shopping">Shopping</option>
        </select>
      </div>

      {/* Expense Items */}
      {filteredExpenses.length > 0 ? (
        <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-xs md:text-sm">
              <th className="py-2 px-2 md:px-4 text-center">Date</th>
              <th className="py-2 px-2 md:px-4 text-center">Title</th>
              <th className="py-2 px-2 md:px-4 text-center">Category</th>
              <th className="py-2 px-2 md:px-4 text-center">Amount</th>
              <th className="py-2 px-2 md:px-4 text-center">Receipt</th>
              <th className="py-2 px-2 md:px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense._id} className="border-t text-xs md:text-sm">
                <td className="py-2 px-2 text-center">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="py-2 px-2 text-center">{expense.title}</td>
                <td className="py-2 px-2 text-center">{expense.category}</td>
                <td className="py-2 px-2 text-center">Rs.{expense.amount}</td>
                <td className="py-2 px-2 text-center">
                  {expense.receiptUrl ? (
                    <a href={expense.receiptUrl} target="_blank" rel="noopener noreferrer">
                      <img src={expense.receiptUrl} alt="Receipt" className="w-8 h-8 md:w-12 md:h-12 rounded" />
                    </a>
                  ) : (
                    <input type="file" onChange={(e) => handleImageUpload(e, expense._id)} className="border p-1" />
                  )}
                </td>
                <td className="py-2 px-2 text-center">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => openEditForm(expense)}>
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteExpense(expense._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      
      ) : (
        <p className="text-gray-500 text-center">No expenses found.</p>
      )}
    </div>
  );
};

export default ExpenseList;
