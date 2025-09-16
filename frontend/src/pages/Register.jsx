import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link,useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, login, loginWithToken } = useContext(AuthContext);
  const navigate = useNavigate();
const url=`${import.meta.env.VITE_BACKEND_URL}`
// const url=`http://localhost:5000`

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

  const handleGoogleSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      console.log("Google Token Received:", googleToken);
      if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        alert('Missing VITE_GOOGLE_CLIENT_ID env. Please set it and restart dev server.');
        return;
      }
      const res = await axios.post(`${url}/api/auth/google`, { token: googleToken });

      if (res.data.token) {
        console.log("Backend Response:", res.data);
        loginWithToken(res.data.user, res.data.token);
        navigate("/dashboard");
      } else {
        console.error("Google login failed: No token received from backend");
        alert("Google sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Sign-Up failed", error);
      const msg = error?.response?.data?.error || error?.message || 'Unknown error';
      alert(`Google sign-in failed: ${msg}. Check Authorized origins and Client IDs.`);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-blue-700">Create your account</h2>
          <p className="text-center text-gray-600 mb-6">Track and visualize your spending easily</p>

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
            <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700">
              Create account
            </button>
          </form>

          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/80 px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={(err) => { console.error("Google Sign-Up Failed", err); }} />
            </div>
          </div>

          <h2 className="mt-6 text-center text-gray-700">
            Have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </h2>
        </div>
      </div>
    </GoogleOAuthProvider>
  ); 
};

export default Register;
