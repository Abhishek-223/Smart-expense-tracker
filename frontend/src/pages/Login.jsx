import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Styles/Login.css'; 

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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-blue-700">Welcome back</h2>
          <p className="text-center text-gray-600 mb-6">Log in to your account</p>
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
            <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 mb-4">
              Sign in
            </button>
          </form>
          <h2 className="text-center text-gray-700">
            Don't have an account?
            <span onClick={handleSignUp} className="text-blue-600 cursor-pointer ml-1 hover:underline">
              Create one
            </span>
          </h2>
      </div>
    </div>
  );
};

export default Login;