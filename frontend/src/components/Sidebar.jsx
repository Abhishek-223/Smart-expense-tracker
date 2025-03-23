import React, { useState } from "react";
import { Menu, X, ChevronLeft, ChevronRight, Home, PlusCircle, BarChart } from "lucide-react";

const Sidebar = ({ setActiveSection, isSidebarOpen, toggleSidebar }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Mobile Sidebar Toggle Button (☰ / ✖) */}
      <button
  className={`fixed top-24  z-50 p-2 bg-blue-600 text-white rounded-full transition-all duration-300 
    ${isCollapsed ? "left-14" : "left-60"}`}
  onClick={handleToggleCollapse}
>
  {isCollapsed ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
</button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 bg-blue-600 text-white min-h-screen p-6 transition-all duration-300
          md:relative md:translate-x-0 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <h2 className={`text-2xl font-bold transition-opacity duration-300 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
          Expense Tracker
        </h2>

        <ul className="mt-6 space-y-4">
          <li>
            <button
              onClick={() => {
                setActiveSection("dashboard");
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className="flex items-center w-full text-left p-2 hover:bg-blue-500 rounded"
            >
              <Home size={24} />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
                Dashboard
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveSection("add-expense");
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className="flex items-center w-full text-left p-2 hover:bg-blue-500 rounded"
            >
              <PlusCircle size={24} />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
                Add Expense
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveSection("reports");
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className="flex items-center w-full text-left p-2 hover:bg-blue-500 rounded"
            >
              <BarChart size={24} />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
                Reports
              </span>
            </button>
          </li>
        </ul>
      </div>

      {/* Sidebar Collapse Toggle Button (Always Visible) */}
      {isSidebarOpen && (
        <button
          className={`hidden md:block fixed top-1/2 transform -translate-y-1/2 z-50 p-2 bg-blue-600 text-white rounded-full transition-all duration-300 
            ${isCollapsed ? "left-24" : "left-64"}`}
          onClick={handleToggleCollapse}
        >
          {isCollapsed ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
        </button>
      )}
    </div>
  );
};

export default Sidebar;
