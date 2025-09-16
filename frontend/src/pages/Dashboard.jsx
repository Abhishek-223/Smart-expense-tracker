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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const openAddForm = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const openEditForm = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 w-full">
      <Header toggleSidebar={toggleSidebar} className="relative z-50" /> 

      <div className="w-full flex relative">
        <Sidebar 
          setActiveSection={setActiveSection} 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />

        <div className="p-4 md:p-6 w-full pt-16 md:pt-6"> 
          {activeSection === "dashboard" && (
            <>
              <SummaryCards />
  
              <div className="mt-6 w-full">
                {showForm ? (
                  <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-4">
                      {editingExpense ? "Edit Expense" : "Add Expense"}
                    </h2>
                    <ExpenseForm existingExpense={editingExpense} closeForm={closeForm} />
                  </div>
                ) : (
                  <div className="bg-white/80 backdrop-blur-md p-4 shadow rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
                    <ExpenseList openEditForm={openEditForm} />
                  </div>
                )}
              </div>
            </>
          )}
  
          {activeSection === "add-expense" && (
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
              <ExpenseForm existingExpense={editingExpense} closeForm={closeForm} />
            </div>
          )}
  
          {activeSection === "reports" && (
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow">
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
