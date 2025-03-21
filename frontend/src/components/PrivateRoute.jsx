import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { authToken } = useAuth(); // Get token from AuthContext

  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
