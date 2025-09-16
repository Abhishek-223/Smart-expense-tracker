import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import ReceiptUpload from "./ReceiptUpload";

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
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
        {existingExpense ? "Edit Expense" : "Add Expense"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            placeholder="Expense Title"
            className="border p-2 w-full rounded focus:ring focus:ring-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Amount</label>
          <div className="flex items-center border rounded overflow-hidden">
            <span className="bg-gray-200 px-3 py-2 text-gray-700 whitespace-nowrap">Rs.</span>
            <input
              type="number"
              placeholder="Amount"
              className="p-2 w-full rounded-r focus:ring focus:ring-blue-300"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="block text-gray-700 font-medium">Category</label>
          <select
            className="border p-2 w-full rounded focus:ring focus:ring-blue-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="shopping">Shopping</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="block text-gray-700 font-medium">Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded focus:ring focus:ring-blue-300"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Note</label>
          <textarea
            placeholder="Add a note (optional)"
            className="border p-2 w-full rounded focus:ring focus:ring-blue-300"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Upload Receipt (optional)</label>
          <ReceiptUpload onUpload={setReceiptUrl} />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
            disabled={loading}
          >
            {loading ? "Saving..." : existingExpense ? "Update Expense" : "Add Expense"}
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 w-full md:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
