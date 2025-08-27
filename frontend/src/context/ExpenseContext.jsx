import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; 

const ExpenseContext = createContext();

export const useExpenses = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const { authToken } = useAuth(); 
  const url=`${import.meta.env.VITE_BACKEND_URL}`
  // const url=`http://localhost:5000`

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!authToken) return; 

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
  }, [authToken]); 

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(`${url}/api/expenses/add`, expense, {
        headers: { 
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json" 
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
