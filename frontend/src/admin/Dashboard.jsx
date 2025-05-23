import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BookOpen } from "lucide-react";
<<<<<<< HEAD
import { BACKEND_URL } from "../utils/Utils.js";
=======
>>>>>>> e1b21ea (first commit)

function Dashboard() {
  const handleLogout = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`${BACKEND_URL}/admin/logout`, {
=======
      const response = await axios.get("http://localhost:4001/api/v1/admin/logout", {
>>>>>>> e1b21ea (first commit)
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("admin");
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-5">
        <div className="flex items-center flex-col mb-10">
        <BookOpen className="h-10 w-10 text-indigo-600" />
          <h2 className="text-lg font-semibold mt-4">I'm Admin</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/our-courses">
            <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
              Our Courses
            </button>
          </Link>
          <Link to="/admin/create-course">
            <button className="w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded">
              Create Course
            </button>
          </Link>

          <Link to="/">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
              Home
            </button>
          </Link>
          <Link to="/admin/login">
            <button
              onClick={handleLogout}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
            >
              Logout
            </button>
          </Link>
        </nav>
      </div>
      <div className="flex h-screen items-center justify-center ml-[40%]">
<<<<<<< HEAD
        Welcome to Learnify!!
=======
        Welcome to Learnistiq!!
>>>>>>> e1b21ea (first commit)
      </div>
    </div>
  );
}

export default Dashboard;

 