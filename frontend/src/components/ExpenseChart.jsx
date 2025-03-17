import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ExpenseChart = () => {
  const [expenses, setExpenses] = useState([]);
  //const url=`https://smart-expense-tracker-f7q7.onrender.com`
const url=`http://localhost:5000`

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }
  };

  // Group expenses by category
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Prepare data for Pie Chart
  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
      },
    ],
  };

  // Group expenses by month
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  // Prepare data for Bar Chart
  const barChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Expenses per Month",
        data: Object.values(monthlyData),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Pie Chart - Expense by Category */}
      <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Expenses by Category</h2>
        <Pie data={pieChartData} />
      </div>

      {/* Bar Chart - Expense per Month */}
      <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Monthly Expense Trend</h2>
        <Bar data={barChartData} />
      </div>
    </div>
  );
};

export default ExpenseChart;
