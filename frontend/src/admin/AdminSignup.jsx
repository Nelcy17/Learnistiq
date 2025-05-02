import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";
import { BACKEND_URL } from "../utils/Utils.js";

function AdminSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/admin/signup`,
        {
          firstName,
          lastName,
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
      console.log("Signup successful: ", response.data);
      toast.success(response.data.message);
      navigate("/admin/login");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Signup failed!!!"); 
        alert(error.response.data.errors);
      }
    }
  };

  return (
    <div className="bg-white text-black ">
      <div className="h-screen container mx-auto flex  items-center justify-center text-white">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5  ">
          <div className="flex items-center space-x-2">
          <div className="flex items-center mb-8">
          <BookOpen className="h-8 w-8 text-indigo-600" />
       <h1 className="text-3xl font-semibold text-indigo-600 ml-3">Learnistiq</h1>
     </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={"/admin/login"}
              className="bg-transparent text-black border border-gray-500 p-1 text-sm md:text-md md:py-2 md:px-4 rounded-md"
            >
              Login
            </Link>
          </div>
        </header>

        {/* Signup Form */}
        <div className="text-black bg-white p-8 rounded-lg shadow-lg w-[500px] m-8 md:m-0 mt-20">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome to <span className="text-indigo-600">Learnistiq</span>
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Just Signup to mess with dashboard!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstname" className=" text-gray-400 mb-2">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-md bg-white text-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your firstname"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className=" text-gray-400 mb-2">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-md bg-white text-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your lastname"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className=" text-gray-400 mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-white text-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className=" text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-white text-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  required
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md transition"
            >
              AdminSignup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;
