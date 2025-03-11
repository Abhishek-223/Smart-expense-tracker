import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import ReceiptUpload from "./ReceiptUpload";
import axios from "axios";

const ExpenseForm = ({ existingExpense, closeForm }) => {
  const { addExpense, updateExpense } = useExpenses();
  const [title, setTitle] = useState(existingExpense?.title || "");
  const [amount, setAmount] = useState(existingExpense?.amount || "");
  const [category, setCategory] = useState(existingExpense?.category || "food");
  const [date, setDate] = useState(existingExpense?.date || new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState(existingExpense?.note || "");
  const [receiptUrl, setReceiptUrl] = useState(existingExpense?.receiptUrl || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const expenseData = { title, amount, category, date, note, receiptUrl };

    try {
      if (existingExpense) {
        await updateExpense(existingExpense._id, expenseData);
      } else {
        await addExpense(expenseData);
      }
    } catch (error) {
      console.error("Failed to add/update expense:", error);
    }

    setLoading(false);
    closeForm();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{existingExpense ? "Edit Expense" : "Add Expense"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Expense Title"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="border p-2 w-full rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="shopping">Shopping</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Note</label>
          <textarea
            placeholder="Note"
            className="border p-2 w-full rounded"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload Receipt (optional)</label>
          <ReceiptUpload onUpload={setReceiptUrl} />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Saving..." : existingExpense ? "Update Expense" : "Add Expense"}
          </button>
          <button type="button" onClick={closeForm} className="text-gray-500">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;