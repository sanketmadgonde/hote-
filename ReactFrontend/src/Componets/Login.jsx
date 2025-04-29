import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const isLoggedIn = localStorage?.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/home");
    }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/login", formData);
      alert(res.data.message || "Login successful");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", formData.username);
      navigate("/home", { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed! Please check credentials.";
      alert(errorMessage);
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="bg-yellow-500 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Hotel Celebration</h1>
        <Link to="/" className="hover:underline text-lg">
          Home
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6">Admin Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-400"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
