import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Styles/Login.css'; // Import the custom CSS file for animation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Failed:", error.message);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="bg-cover min-h-screen flex items-center justify-center">
      <div className="flex bg-transparent bg-gray-400 bg-opacity-30 items-center backdrop-blur-md w-2/3 shadow-lg justify-center">
        <div className="bg-login bg-opacity-70 w-1/2 backdrop-blur-md p-8 max-w-md animate-fade-in">
        </div>
        <div className="bg-opacity-70 w-1/2 backdrop-blur-md p-8 max-w-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-center text-grey-700">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-grey-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-grey-700">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
            <button type="submit" className="bg-primary-green text-white p-2 w-full rounded hover:bg-primary-green mb-4">
              Login
            </button>
          </form>
          <h2>
            Don't have an account?
            <a href="/register" className="text-blue-300">
              Sign Up
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;