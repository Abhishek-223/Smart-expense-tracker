import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"; 

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 p-4 flex w-full justify-between items-center relative z-50">
      <button
        className="hidden p-2 rounded-full text-gray-700 hover:bg-gray-100"
        onClick={toggleSidebar}
      >
        <Menu size={28} />
      </button>

      <h1 className="text-xl md:text-2xl font-bold text-blue-700 flex-1 text-center md:text-left">
        Smart Expense Tracker
      </h1>

      <div className="hidden md:flex items-center gap-4 relative">
        <span className="text-gray-700 font-medium">{user?.name}</span>
        <img
          src="/default-avatar.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        {isMenuOpen && (
          <div className="absolute right-0 top-12 bg-white/90 backdrop-blur-md shadow-lg rounded-lg w-44 border border-gray-200 z-50">
            <div className="p-4 text-center text-gray-700 font-medium">{user?.name}</div>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="md:hidden relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
        >
          <img
            src="/default-avatar.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border"
          />
        </button>

        {isMenuOpen && (
          <div className="absolute right-4 top-12 bg-white/90 backdrop-blur-md shadow-lg rounded-lg w-44 border border-gray-200 z-50">
            <div className="p-4 text-center text-gray-700 font-medium">{user?.name}</div>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
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
