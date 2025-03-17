import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseChart from "../components/ExpenseChart";
import { useExpenses } from "../context/ExpenseContext";

const Dashboard = () => {
  const { expenses } = useExpenses();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const openAddForm = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        <div className="p-4 sm:p-6">
          {activeSection === "dashboard" && (
            <>
              {/* Summary Cards */}
              <SummaryCards />

              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold">Expense Tracker</h1>
                <button
                  onClick={openAddForm}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Expense
                </button>
              </div>

              {showForm && <ExpenseForm existingExpense={editingExpense} />}

              {/* Expense Table & Chart */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-2 bg-white p-4 shadow rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
                  <ExpenseList />
                </div>

                <div className="bg-white p-4 shadow rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Spending Insights</h2>
                  <ExpenseChart />
                </div>
              </div>
            </>
          )}

          {activeSection === "add-expense" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg md:text-2xl font-bold mb-4">Add Expense</h2>
              <ExpenseForm existingExpense={editingExpense} />
            </div>
          )}

          {activeSection === "reports" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg md:text-2xl font-bold mb-4">Expense Reports</h2>
              <ExpenseChart />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
