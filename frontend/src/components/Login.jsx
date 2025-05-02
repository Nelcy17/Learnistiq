import React, { useState } from 'react';
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";
import { BACKEND_URL } from "../utils/Utils.js";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/login`,
        { email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      console.log("login successful: ", response.data);
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Login failed!");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen">
  <div className="container mx-auto flex items-center justify-center min-h-screen">


    <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 shadow-sm bg-white/70 backdrop-blur-md">
      <div className="flex items-center gap-3">
        
        <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">Learnistiq</span>
            </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/signup" className="border border-gray-400 text-gray-700 px-5 py-2 rounded-md hover:text-indigo-600 transition">
          Register
        </Link>
        
      </div>
    </header>


    <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md mt-28">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Welcome to <span className="text-indigo-600">Learnistiq</span>
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Please sign in to your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@gmail.com"
            className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center text-sm">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-md transition"
        >
          Sign In
        </button>
      </form>
    </div>

  </div>
</div>
  );
};

export default Login;

