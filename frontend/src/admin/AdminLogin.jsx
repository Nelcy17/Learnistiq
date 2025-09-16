import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";
import { BACKEND_URL } from "../utils/Utils.js";

const AdminLogin = () => { 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/admin/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("AdminLogin successful: ", response.data);
      toast.success(response.data.message);
      localStorage.setItem("admin", JSON.stringify(response.data));
      navigate("/admin/dashboard");
    } catch (error) {
      if(error.response) {
        setErrorMessage(error.response.data.errors || "AdminLogin failed!! ");
      }
    }
  };
 
    return (
      <div className="bg-white text-black min-h-screen">
        <div className="container mx-auto flex items-center justify-center min-h-screen text-white">
  
          
          <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 shadow-md">
            <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-indigo-600" />
              <Link to="/" className="text-2xl font-extrabold text-indigo-600 flex items-center gap-2">
              Learnistiq
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin/signup" className="border bg-white text-black border-gray-500 px-5 py-2 rounded hover:bg-indigo-500 transition">
                Signup
              </Link>
              
            </div>
          </header>
  
          {/* Login Form Styled Like a Trading Widget */}
          <div className="bg-white text-black p-10 rounded-xl shadow-2xl w-full max-w-md mt-20">
            <h2 className="text-3xl font-semibold text-center mb-6">
              Welcome to <span className="text-indigo-600">Learnistiq</span>
            </h2>
            <p className="text-center text-gray-400 mb-8">Login to access admin dashboard</p>
  
            <form onSubmit={handleSubmit}>
  
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm mb-2 bg-white text-black">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full px-4 py-3 rounded-lg bg-white text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
  
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm mb-2 text-gray-400">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-4 py-3 rounded-lg bg-white text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
  
              {errorMessage && (
                <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
              )}
  
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
              >
                Sign In
              </button>
            </form>
          </div>
  
        </div>
      </div>
    );
 
};

export default AdminLogin;
 

