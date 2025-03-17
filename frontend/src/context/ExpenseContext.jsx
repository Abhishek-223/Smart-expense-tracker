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
  //const url=`https://smart-expense-tracker-f7q7.onrender.com/`
  const url=`http://localhost:5000/`

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!authToken) return; // Don't fetch if there's no token

      try {
        const response = await axios.get(`${url}/api/expenses`, {
          headers: { Authorization: `Bearer ${authToken}`},
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error.response ? error.response.data : error.message);
      }
    };

    fetchExpenses();
  }, [authToken]); // Fetch expenses whenever authToken changes

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(`${url}/api/expenses/add`, expense, {
        headers: { 
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json" // ✅ Ensures JSON is sent correctly
        },
      });

      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
    } catch (error) {
      console.error("Failed to add expense:", error.response ? error.response.data : error.message);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const response = await axios.put(`${url}/api/expenses/${id}`, updatedExpense, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) => (expense._id === id ? response.data : expense))
      );
    } catch (error) {
      console.error("Failed to update expense:", error.response ? error.response.data : error.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${url}/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Remove from state after deletion
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Failed to delete expense:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
