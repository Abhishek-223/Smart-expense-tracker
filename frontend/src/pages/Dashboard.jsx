import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";
import { useExpenses } from "../context/ExpenseContext";

const Dashboard = () => {
  const { expenses } = useExpenses();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const openAddForm = () => {
    setEditingExpense(null); // Reset editing state
    setShowForm(true);
  };

  const openEditForm = (expense) => {
    console.log("Editing Expense:", expense); // Debugging
    setEditingExpense(expense); // Set selected expense for editing
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingExpense(null); // Reset editing state after closing
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        <div className="p-6">
          {activeSection === "dashboard" && (
            <>
              {/* Summary Cards */}
              <SummaryCards />

              <div className="mt-6">
                {/* Show Expense Form when Editing */}
                {showForm ? (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">
                      {editingExpense ? "Edit Expense" : "Add Expense"}
                    </h2>
                    <ExpenseForm existingExpense={editingExpense} closeForm={closeForm} />
                  </div>
                ) : (
                  <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
                    <ExpenseList openEditForm={openEditForm} />
                  </div>
                )}
              </div>
            </>
          )}

          {activeSection === "add-expense" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
              <ExpenseForm existingExpense={editingExpense} closeForm={closeForm} />
            </div>
          )}

          {activeSection === "reports" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Expense Reports</h2>
              <ExpenseChart />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
