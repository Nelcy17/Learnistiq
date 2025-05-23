import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../../public/logo.webp";
import { BookOpen } from "lucide-react";
<<<<<<< HEAD
import { BACKEND_URL } from "../utils/Utils.js";
=======
>>>>>>> e1b21ea (first commit)


function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
<<<<<<< HEAD
        `${BACKEND_URL}/user/signup`,
=======
        "http://localhost:4001/api/v1/user/signup",
>>>>>>> e1b21ea (first commit)
        { firstName, lastName, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response?.data?.errors || "Signup failed!");
      toast.error(error.response?.data?.errors || "Signup failed");
    }
  };
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen flex items-center justify-center">


      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 shadow-sm bg-white/70 backdrop-blur-md">
        <div className="flex items-center gap-3">

          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">Learnistiq</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">

        </div>
      </header>

      <div className="flex items-center mb-8">

      </div>

      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md mt-28">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="First Name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              required
            />
            <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">👁️</span>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center text-sm mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;