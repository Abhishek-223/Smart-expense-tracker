import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔹 Handle Manual Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to register:", error);
      alert("Registration failed. Please try again.");
    }
  };

  // 🔹 Handle Google Sign-Up Success
  const handleGoogleSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      console.log("Google Token Received:", googleToken);

      // Send Google token to backend
      const res = await axios.post("http://localhost:5000/api/auth/google", { token: googleToken });

      if (res.data.token) {
        console.log("Backend Response:", res.data);

        // 🔹 Store token & user details
        login(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // 🔹 Navigate to Dashboard
        navigate("/dashboard");
      } else {
        console.error("Google login failed: No token received from backend");
        alert("Google sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Sign-Up failed", error);
      alert("Google sign-in failed. Please check the console for details.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="bg-cover min-h-screen flex items-center justify-center">
        <div className="flex bg-transparent min-h-screen bg-gray-400 bg-opacity-30 items-center backdrop-blur-md w-2/3 shadow-lg justify-center">
          <div className="bg-login bg-opacity-70 w-1/2 backdrop-blur-md p-8 max-w-md animate-fade-in"></div>
          <div className="bg-opacity-70 p-8 min-h-screen shadow-lg w-full max-w-md animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            
            {/* 🔹 Manual Sign-Up Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border p-2 w-full rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 w-full rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-2 w-full rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
                Register
              </button>
            </form>

            {/* 🔹 Google Sign-Up Button */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">Or sign up with Google</p>
              <div className="flex justify-center mt-2">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.error("Google Sign-Up Failed")} />
              </div>
            </div>

            <h2 className="mt-4 text-center">
              Have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Sign In
              </a>
            </h2>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;
