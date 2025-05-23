import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { FaDiscourse, FaChartLine, FaDownload } from "react-icons/fa";
=======
import { FaDiscourse,FaChartLine, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
>>>>>>> e1b21ea (first commit)
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
<<<<<<< HEAD
import { BACKEND_URL } from "../utils/Utils";


=======

const BACKEND_URL = "http://localhost:4001/api/v1";
>>>>>>> e1b21ea (first commit)

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const token = user?.token;

    const fetchPurchases = async () => {
      if (!token) {
        setErrorMessage("Please login to view your purchases.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setPurchases(response.data.purchasedCourses || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setErrorMessage(
          error?.response?.data?.errors || "Failed to fetch purchase data"
        );
      }
    };

    fetchPurchases();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error?.response?.data?.errors || "Error in logging out");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen bg-indigo-600 w-48 p-4 transform z-10 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}>

<<<<<<< HEAD
        <div className="flex items-center justify-center mb-8 mt-10">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <nav>
          <ul className="space-y-6">
            <li><Link to="/" className="flex items-center text-white transition"><RiHome2Fill className="mr-3" />Home</Link></li>
            <li><Link to="/courses" className="flex items-center text-white transition"><FaChartLine className="mr-3" />Courses</Link></li>
            <li><Link to="/purchases" className="flex items-center text-white transition"><FaDownload className="mr-3" />Purchases</Link></li>
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
=======
  <div className="flex items-center justify-center mb-8 mt-10">
    <BookOpen className="h-8 w-8 text-white" />
  </div>
  <nav>
    <ul className="space-y-6">
      <li><Link to="/" className="flex items-center text-white transition"><RiHome2Fill className="mr-3" />Home</Link></li>
      <li><Link to="/courses" className="flex items-center text-white transition"><FaChartLine className="mr-3" />Courses</Link></li>
      <li><Link to="/purchases" className="flex items-center text-white transition"><FaDownload className="mr-3" />Purchases</Link></li>
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
>>>>>>> e1b21ea (first commit)


      <button
        className="fixed top-5 left-5 z-50 md:hidden bg-blue-600 text-white p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
      </button>


      <main className={`flex-1 p-6 md:ml-48 transition-all duration-300 ${isSidebarOpen ? "ml-48" : ""}`}>

<<<<<<< HEAD
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">My Purchases</h1>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">
            {errorMessage}
          </div>
        )}

        {purchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {purchases.map((purchase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-center text-center"
              >
                <img
                  className="rounded-lg w-full h-40 object-cover mb-4"
                  src={purchase.image?.url || "https://via.placeholder.com/200"}
                  alt={purchase.title}
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {purchase.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {purchase.description?.length > 80
                    ? `${purchase.description.slice(0, 80)}...`
                    : purchase.description}
                </p>
                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Purchased
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">No Purchases Yet</h2>
            <p className="text-gray-500 text-base">You have not purchased any course yet.</p>
            <Link
              to="/courses"
              className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </main>
=======
  <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">My Purchases</h1>

  {errorMessage && (
    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">
      {errorMessage}
    </div>
  )}

  {purchases.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {purchases.map((purchase, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-center text-center"
        >
          <img
            className="rounded-lg w-full h-40 object-cover mb-4"
            src={purchase.image?.url || "https://via.placeholder.com/200"}
            alt={purchase.title}
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {purchase.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {purchase.description?.length > 80
              ? `${purchase.description.slice(0, 80)}...`
              : purchase.description}
          </p>
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            Purchased
          </span>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">No Purchases Yet</h2>
      <p className="text-gray-500 text-base">You have not purchased any course yet.</p>
      <Link
        to="/courses"
        className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Browse Courses
      </Link>
    </div>
  )}
</main>
>>>>>>> e1b21ea (first commit)

    </div>
  );
};


const SidebarLink = ({ icon, label, to, active }) => (
  <Link
    to={to}
<<<<<<< HEAD
    className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${active
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
      }`}
=======
    className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
      active
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`}
>>>>>>> e1b21ea (first commit)
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Purchases;

