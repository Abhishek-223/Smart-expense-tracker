import axios from "axios";

const API_URL = "https://smart-expense-tracker-f7q7.onrender.com/expenses";

export const fetchExpenses = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addExpense = async (expense, token) => {
  const response = await axios.post(`${API_URL}/add`, expense, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateExpense = async (id, expense, token) => {
  const response = await axios.put(`${API_URL}/${id}`, expense, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteExpense = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};