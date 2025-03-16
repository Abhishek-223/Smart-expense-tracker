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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-center">Date</th>
                <th className="py-2 px-4 text-center">Title</th>
                <th className="py-2 px-4 text-center">Category</th>
                <th className="py-2 px-4 text-center">Amount</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense._id} className="border-t">
                  <td className="py-2 px-4 text-center">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 text-center">{expense.title}</td>
                  <td className="py-2 px-4 text-center">{expense.category}</td>
                  <td className="py-2 px-4 text-center">Rs.{expense.amount}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => openEditForm(expense)} // ✅ Wrapped in arrow function
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteExpense(expense._id)} // ✅ Wrapped in arrow function
                    >
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
