import React from "react";

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="w-64 bg-blue-600 text-white p-6 min-h-screen">
      <h2 className="text-2xl font-bold">Expense Tracker</h2>
      <ul className="mt-6 space-y-4">
        <li>
          <button onClick={() => setActiveSection("dashboard")} className="block w-full text-left p-2 hover:bg-blue-500 rounded">
            Dashboard
          </button>
        </li>
        <li>
          <button onClick={() => setActiveSection("add-expense")} className="block w-full text-left p-2 hover:bg-blue-500 rounded">
            Add Expense
          </button>
        </li>
        <li>
          <button onClick={() => setActiveSection("reports")} className="block w-full text-left p-2 hover:bg-blue-500 rounded">
            Reports
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;