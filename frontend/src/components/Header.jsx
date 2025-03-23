import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"; // ✅ Sidebar toggle icon

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ Mobile dropdown state

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md p-4 flex w-full justify-between items-center relative z-50">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="md:hidden p-2 rounded-full text-gray-700 hover:bg-gray-200"
        onClick={toggleSidebar}
      >
        <Menu size={28} />
      </button>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold text-blue-600 flex-1 text-center md:text-left">
        Dashboard
      </h1>

      {/* User Info & Logout (Desktop) */}
      <div className="hidden md:flex items-center gap-4 relative">
        <span className="text-gray-700 font-medium">{user?.name}</span>
        <img
          src={user?.profilePic || "/default-avatar.png"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        
        {/* ✅ Fixed Logout Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-40 border border-gray-300 z-50">
            <div className="p-4 text-center text-gray-700 font-medium">{user?.name}</div>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* User Info & Logout (Mobile Dropdown) */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200"
        >
          <img
            src={user?.profilePic || "/default-avatar.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border"
          />
        </button>

        {/* ✅ Mobile Logout Dropdown Positioned Properly */}
        {isMenuOpen && (
          <div className="absolute right-4 top-12 bg-white shadow-lg rounded-lg w-40 border border-gray-300 z-50">
            <div className="p-4 text-center text-gray-700 font-medium">{user?.name}</div>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
