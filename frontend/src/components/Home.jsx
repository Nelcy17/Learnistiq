import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { Typewriter } from 'react-simple-typewriter';
import { CircleUserRound, BookOpen, LogOut, User, Moon, Sun, LogIn, UserPlus, Users, ShoppingCart } from 'lucide-react';
import { handleAddToCart } from "../utils/CartUtils.js";
import { BACKEND_URL } from '../utils/Utils.js';

const Home = () => {

  const navigate = useNavigate();

  const [tempCourses, setTempCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [userName, setUserName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cart, setCart] = useState([]);


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };



  console.log("Courses from API:", tempCourses);

  useEffect(() => {
    const token = localStorage.getItem("user");
    const userData = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }

    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserName(parsedData?.user?.firstName || "User");
    }
  }, [])

  const handleLoggout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      })
      toast.success((await response).data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setIsDropdownOpen(false);
      console.log("Navigating to login page...");
      navigate("/login");
    } catch (error) {
      console.log("Error in logging out", error)
      toast.error(error.response.data.errors || "Error in logging out")
    }
  }

  //fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses", error)
      }
    };
    fetchCourses();
  }, []);


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className='bg-gray dark:bg-[#121212] text-gray-100 overflow-x-hidden'>
      <div className='min-h-screen text-black bg-white dark:bg-black dark:text-white container mx-auto'>
        {/*Header*/}
        <header className='flex items-center justify-between p-6 bg-white dark:bg-[#1a1a1a] shadow-md'>
          <div className='flex items-center space-x-2'>
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">Learnistiq

              </span>
            </Link>
          </div>

          <div className='space-x-4 flex'>
            {isLoggedIn ? (
              <>
                <button onClick={toggleTheme}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 cursor-pointer transition-all">
                  {isDarkMode ? (
                    <Moon className="w-6 h-6 text-blue-300" />
                  ) : (
                    <Sun className="w-6 h-6 text-yellow-400" />
                  )}
                </button>



                <div className="relative">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 cursor-pointer relative"
                    onClick={() => navigate('/Cart')}
                  >
                    <ShoppingCart className="w-6 h-6 text-white" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </div>


                <div
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <CircleUserRound size={32} className="text-gray-400" />
                </div>


                {isDropdownOpen && (
                  <div className="absolute right-0 mt-14 w-56 bg-white text-black rounded-lg shadow-lg p-4">

                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-black"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      &times;
                    </button>


                    <div className="flex items-center space-x-2 mb-4">
                      <CircleUserRound size={40} className="text-gray-400" />
                      <div>
                        <p className="font-semibold">Hi, {userName}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="mt-3 space-y-2">
                      <Link to={"/profile"} className='flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg'><User className="w-5 h-5 mr-2" />
                        Profile</Link>
                      <button
                        onClick={handleLoggout}
                        className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        LogOut
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : <>
              <Link to={"/login"} className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
                <LogIn className="h-5 w-5" />
                <span>Login</span></Link>
              <Link to={"/signup"} className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                <UserPlus className="h-5 w-5" />
                <span>Register</span></Link>
            </>}
          </div>
        </header>


        <section className='text-center py-20'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900'>
            Unlock Your Potential: Learn{' '}
            <span className="text-indigo-600">
              <Typewriter
                words={['Development', 'Business', 'Design', 'Marketing', 'Finance', 'IT & Software']}
                loop={true}
                cursor
                cursorStyle='|'
                typeSpeed={90}
                deleteSpeed={90}
                delaySpeed={2000}
              />
            </span>{' '}
          </h1>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300  mx-4 mt-6">
            Join thousands of learners and gain the skills you need to succeed in today's competitive world. Our expert-led courses are designed to help you master new skills and advance your career.</p>


          <div className="flex justify-center space-x-4 mt-8">
            <Link
              to="/courses"
              className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
            >
              Browse Courses
            </Link>
            {!isLoggedIn && (
              <Link
                to="/signup"
                className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-50"
              >
                Get Started
              </Link>
            )}
          </div>

        </section>
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-8 text-gray-800">
              Popular Courses
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link
                  to={`/courses/public/${course._id}`}
                  key={course._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 flex flex-col"
                >


                  <div className="w-full h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={course.image.url}
                      alt={course.title}
                    />
                  </div>


                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>

                      <div className="flex items-center text-yellow-500 text-sm mb-4">
                        ★★★★☆ <span className="text-gray-400 ml-1">4.5</span>
                      </div>
                    </div>


                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{course.price}
                      </span>
                      <button onClick={() => handleAddToCart(course)} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>




        <br />
        <br />
        <section>
          <h1 className='text-4xl text-center font-bold text-black pr-10 mb-3.5'>Learners are Viewing</h1>
          <Slider {...settings}>
            {
              courses.slice(0, 4).map((course) => (
                <Link to={`/courses/public/${course._id}`} key={course._id} className='p-4'>
                  <div className='relative flex-shrink-0 w-80 transition-transform duration-300 transform hover:scale-105 mx-2'>
                    <div className='bg-gray-900 rounded-lg overflow-hidden shadow-lg'>
                      <img className='h-32 w-full object-cover' src={course.image.url} alt='' />
                      <div className='p-6 text-center'>
                        <h2 className='text-xl font-bold text-white'>{course.title}</h2>
                        <button className='mt-4 bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-blue-500 duration-300'>Enroll Now</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            }
          </Slider>
        </section>


        {/* Testimonials  */}
        <section className="py-16 bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              What Users Say About Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "Learnistiq helped me land my first tech job! The courses are top-notch and easy to follow."
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="User Avatar"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Aisha Sharma</h4>
                    <span className="text-sm text-gray-500">Software Developer</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "As a business owner, Learnistiq's business courses gave me the confidence to scale my startup."
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User Avatar"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Prince Rathore</h4>
                    <span className="text-sm text-gray-500">Entrepreneur</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "The instructors are extremely knowledgeable. I loved the UX design course!"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="User Avatar"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Priya Singh</h4>
                    <span className="text-sm text-gray-500">UX Designer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section class="max-w-5xl mx-auto px-4 py-16">
          <h2 class="text-4xl font-extrabold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>

          <div class="space-y-4">
            <details class="border border-gray-200 rounded-xl p-4">
              <summary class="text-lg font-semibold cursor-pointer text-gray-800 flex justify-between items-center">
                What is Learnistiq?
                <span class="ml-2 text-purple-600">+</span>
              </summary>
              <p class="mt-3 text-gray-600">
                Learnistiq is an online learning platform offering expert-led courses in tech, business, design, and more.
              </p>
            </details>

            <details class="border border-gray-200 rounded-xl p-4">
              <summary class="text-lg font-semibold cursor-pointer text-gray-800 flex justify-between items-center">
                Are the courses beginner friendly?
                <span class="ml-2 text-purple-600">+</span>
              </summary>
              <p class="mt-3 text-gray-600">
                Yes! We offer courses for all levels—whether you're just starting out or want to advance your skills.
              </p>
            </details>

            <details class="border border-gray-200 rounded-xl p-4">
              <summary class="text-lg font-semibold cursor-pointer text-gray-800 flex justify-between items-center">
                How do I enroll in a course?
                <span class="ml-2 text-purple-600">+</span>
              </summary>
              <p class="mt-3 text-gray-600">
                Simply create an account, browse the courses, and click on "Enroll Now." Complete the payment process to start learning immediately.
              </p>
            </details>

            <details class="border border-gray-200 rounded-xl p-4">
              <summary class="text-lg font-semibold cursor-pointer text-gray-800 flex justify-between items-center">
                Who are the instructors?
                <span class="ml-2 text-purple-600">+</span>
              </summary>
              <p class="mt-3 text-gray-600">
                Our instructors are experienced educators, subject matter experts, and professionals from top institutions with years of teaching and industry experience.
              </p>
            </details>

          </div>
        </section>


        <footer className="bg-gray-950 text-gray-200 py-16 mt-16">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 px-8">

            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-10 w-10 text-indigo-500" />
                <h1 className="text-3xl font-bold text-indigo-500">Learnistiq</h1>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                Learnistiq is your trusted platform for mastering new skills online. Explore thousands of expert-led courses across technology, business, design, and more.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Explore</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Courses</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Contact Us</a></li>
              </ul>
            </div>


            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Subscribe</h3>
              <p className="text-sm mb-4 text-gray-500">
                Get the latest updates and offers.
                <br /> Subscribe to our newsletter and never miss out on a course again!
              </p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 rounded-md"
                >
                  Subscribe
                </button>

              </form>
            </div>

          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-300 px-8">
            <p>© 2025 Learnistiq. All rights reserved.</p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-indigo-400 transition duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
              </a>
              <a href="#" className="hover:text-indigo-400 transition duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v5h-4v-5a2 2 0 00-4 0v5h-4v-5a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="#" className="hover:text-indigo-400 transition duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-10 10c0 4.42 3.58 8 8 8s8-3.58 8-8a10 10 0 00-8-10zm1.5 14h-3v-3h3v3zm0-4.5h-3V7h3v4.5z" /></svg>
              </a>
              <a href="#" className="hover:text-indigo-400 transition duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 8V7a4 4 0 00-4-4H7A4 4 0 003 7v10a4 4 0 004 4h10a4 4 0 004-4v-1h-5v-3h5z" /></svg>
              </a>
            </div>
          </div>
        </footer>


      </div>
    </div>
  )
}

export default Home;




