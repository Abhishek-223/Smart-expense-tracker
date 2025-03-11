import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Title */}
      <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>

      {/* User Info & Logout */}
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">{user?.name}</span>
        <img
          src={user?.profilePic || "/default-avatar.png"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border"
        />
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
