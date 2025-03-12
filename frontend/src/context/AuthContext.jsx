import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("https://smart-expense-tracker-f7q7.onrender.com/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setAuthToken(data.token);
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setAuthToken(""); // Reset authToken
  };

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
