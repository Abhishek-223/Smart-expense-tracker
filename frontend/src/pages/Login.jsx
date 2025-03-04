import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../Styles/Login.css'; // Import the custom CSS file for animation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="bg-cover min-h-screen flex items-center justify-center">
      <div className="flex bg-transparent bg-gray-400 bg-opacity-30 items-center backdrop-blur-md tr w-2/3 shadow-lg justify-center">
      <div className="bg-login bg-opacity-70 w-1/2 backdrop-blur-md p-8 max-w-md animate-fade-in">
      </div>
      <div className=" bg-opacity-70 w-1/2 backdrop-blur-md p-8  max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary-charcoal">Smart Expense Tracker</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-secondary-charcoal">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-secondary-charcoal">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="border p-2 w-full rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-accent text-white p-2 w-full rounded hover:bg-pink-600 mb-4">
            Login
          </button>
        </form>
        <button onClick={handleGoogleSignIn} className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 mb-4">
          Sign in with Google
        </button>
        <button onClick={handleSignUp} className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600">
          Sign Up
        </button>
      </div>
      </div>
    </div>
  );
};

export default Login;