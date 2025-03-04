import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    navigate("/dashboard");
  };

  return (
    <div className="bg-cover min-h-screen flex items-center justify-center">
      <div className="flex bg-transparent bg-gray-400 bg-opacity-30 items-center backdrop-blur-md tr w-2/3 shadow-lg justify-center">
        <div className="bg-login bg-opacity-70 w-1/2 backdrop-blur-md p-8 max-w-md animate-fade-in">
        </div>
        <div className="bg-white h-440 p-8  shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
        </div>
      </div>
    </div>
  );
};

export default Register;


