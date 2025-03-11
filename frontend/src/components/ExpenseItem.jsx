import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import ExpenseForm from "./ExpenseForm";

const ExpenseItem = ({ expense }) => {
  const { deleteExpense } = useExpenses();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(expense._id);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
      {!isEditing ? (
        <>
          <div>
            <h3 className="text-lg font-semibold">{expense.title}</h3>
            <p className="text-gray-600">${expense.amount}</p>
            <p className="text-gray-500 text-sm">{new Date(expense.date).toLocaleDateString()}</p>
            {expense.receipt && (
              <img src={expense.receipt} alt="Receipt" className="w-16 h-16 mt-2 rounded" />
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <ExpenseForm existingExpense={expense} closeForm={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default ExpenseItem;
