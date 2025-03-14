import React, { useState, useEffect } from "react";
import { useExpenses } from "../context/ExpenseContext";

const SummaryCards = () => {
  const { expenses } = useExpenses();
  const [monthlyBudget, setMonthlyBudget] = useState(
    localStorage.getItem("monthlyBudget") || 3000
  );
  const [remainingBalance, setRemainingBalance] = useState(0);

  // Calculate Total Expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);

  // Update Remaining Balance when budget or expenses change
  useEffect(() => {
    const updatedBalance = monthlyBudget - totalExpenses;
    setRemainingBalance(updatedBalance);
  }, [monthlyBudget, totalExpenses]);

  // Handle Budget Change
  const handleBudgetChange = (e) => {
    const newBudget = Number(e.target.value.replace(/[^0-9]/g, "")); // Allow only numbers
    setMonthlyBudget(newBudget);
    localStorage.setItem("monthlyBudget", newBudget); // Persist budget
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Expenses */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold">Total Expenses</h2>
        <p className="text-2xl font-bold text-red-500">Rs. {totalExpenses.toFixed(2)}</p>
      </div>

      {/* Monthly Budget - Editable */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold">Monthly Budget</h2>
        <div className="flex items-center border rounded p-2">
          <span className="text-xl font-bold text-black mr-1">Rs.</span>
          <input
            type="text"
            value={`${monthlyBudget}`}
            onChange={handleBudgetChange}
            className="w-full text-xl font-bold text-left outline-none"
          />
        </div>
      </div>

      {/* Remaining Balance */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold">Remaining Balance</h2>
        <p className={`text-2xl font-bold ${remainingBalance < 0 ? "text-red-500" : "text-green-500"}`}>
          Rs. {remainingBalance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
