import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { FaChartLine, FaDownload, FaUserCircle } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { handleAddToCart } from "../utils/CartUtils.js";
import { BACKEND_URL } from "../utils/Utils.js";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, { withCredentials: true });
        setCourses(response.data.courses);
        setFilteredCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching courses ", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let updatedCourses = courses;

    // Search Filter
    if (searchTerm) {
      updatedCourses = updatedCourses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price Filter
    if (priceFilter) {
      updatedCourses = updatedCourses.filter(course => course.price <= priceFilter);
    }

    setFilteredCourses(updatedCourses);
  }, [searchTerm, priceFilter, courses]);

    useEffect(() => {
      const token = localStorage.getItem("user");
      setIsLoggedIn(!!token);
    }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
      toast.success("Logged out successfully");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error("Error in logging out");
    }
  };

  return (
    <div className="flex bg-white text-gray-200 min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 min-h-screen bg-indigo-600 w-56 p-5 transform z-10 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

        <div className="flex items-center justify-center mb-8 mt-10">
        <BookOpen className="h-8 w-8 text-white" />
        </div>
        <nav>
          <ul className="space-y-6">
            <li><Link to="/" className="flex items-center hover:text-white"><RiHome2Fill className="mr-3" />Home</Link></li>
            <li><Link to="#" className="flex items-center text-white"><FaChartLine className="mr-3" />Courses</Link></li>
            <li><Link to="/purchases" className="flex items-center hover:text-white"><FaDownload className="mr-3" />Purchases</Link></li>
            
            <li>
              {isLoggedIn ? (
                        <button onClick={handleLogout} className="flex items-center text-white hover:text-red-500 transition">
                          <IoLogOut className="mr-3" /> Logout
                        </button>
                      ) : (
                        <Link to="/login" className="flex items-center text-white hover:text-green-500 transition">
                          <IoLogIn className="mr-3" /> Login
                        </Link>
                      )}
            </li>
          </ul>
        </nav>
      </aside>

      <main className="ml-0 md:ml-64 w-full p-8 pl-0">
      <header className="flex justify-between items-center mb-8">

  <button 
    className="md:hidden text-indigo-600 focus:outline-none text-3xl" 
    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
  >
    ☰
  </button>


  <h1 className="text-2xl font-bold text-indigo-600">Our Courses</h1>


  <div className="flex items-center space-x-4">
    <div className="flex">
      <input 
        type="text" 
        placeholder="Search courses..." 
        className="bg-white border border-gray-600 text-gray-400 rounded-l-full px-4 py-2 focus:outline-none" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="bg-indigo-600 rounded-r-full px-4 py-2 hover:bg-indigo-700">
        <FiSearch />
      </button>
    </div>
    <FaUserCircle className="text-3xl text-gray-500" />
  </div>
</header>


        <div className="mb-4">
          <label className="text-indigo-600">Filter by Price (₹): </label>
          <input 
            type="number" 
            className="bg-white border border-gray-600 text-black rounded px-4 py-2 ml-2" 
            placeholder="Max Price" 
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
        </div>


        <div>
          {loading ? (
            <p className="text-center text-gray-400">Loading courses...</p>
          ) : filteredCourses.length === 0 ? (
            <p className="text-center text-gray-400">No courses available.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
               <div key={course._id} className="bg-white text-gray-900 shadow-2xl rounded-lg p-5 hover:scale-105 transition">
               <Link to={
                  `/courses/public/${course._id}`
               }  className="block">
                 <img src={course.image?.url} alt={course.title} className="rounded mb-4 w-full h-40 object-cover" />
                 <h2 className="font-bold text-lg text-indigo-600">{course.title}</h2>
                 <p className="text-gray-700 mt-2 mb-4">
                   {course.description.length > 100 ? `${course.description.slice(0, 100)}...` : course.description}
                 </p>
                 <div className="flex justify-between items-center mb-4">
                   <span className="text-green-500 font-bold">₹{course.price}</span>
                   <span className="text-green-500">🔥 20% OFF</span>
                 </div>
               </Link>
               <button onClick={() => handleAddToCart(course)}
              className="bg-blue-600 text-white py-2 w-full block text-center rounded hover:bg-blue-700 transition mt-2"
               >
                 Buy Now
               </button>
             
               <button
                 onClick={() => handleAddToCart(course)}
                 className="bg-gray-700 text-white py-2 w-full block text-center rounded hover:bg-gray-600 transition mt-2"
               >
                 Add to Cart
               </button>
             </div>
             
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Courses;


