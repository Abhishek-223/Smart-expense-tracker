import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import AuthContext to get authToken

const ExpenseContext = createContext();

export const useExpenses = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const { authToken } = useAuth(); // Get authToken from AuthContext

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!authToken) return; // Don't fetch if there's no token

      try {
        const response = await axios.get("https://smart-expense-tracker-f7q7.onrender.com/expenses", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, [authToken]); // Fetch expenses whenever authToken changes

  const addExpense = async (expense) => {
    try {
      const response = await axios.post("https://smart-expense-tracker-f7q7.onrender.com/api/expenses/add", expense, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const response = await axios.put(`https://smart-expense-tracker-f7q7.onrender.com/api/expenses/${id}`, updatedExpense, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) => (expense._id === id ? response.data : expense))
      );
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, updateExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
