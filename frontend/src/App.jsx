import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { Toaster } from 'react-hot-toast';
import Courses from './components/Courses.jsx';
import Buy from './components/Buy.jsx';
import Purchases from './components/Purchases.jsx';
import AdminSignup from './admin/AdminSignup.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import Dashboard from './admin/Dashboard.jsx';
import CourseCreate from './admin/CourseCreate.jsx';
import UpdateCourse from './admin/UpdateCourse.jsx';
import OurCourses from './admin/OurCourses.jsx';
import Profile from './components/Profile.jsx';
import Cart from './components/Cart.jsx';
import Coursedetail from './components/Coursedetail.jsx';
import PaymentSuccess from './components/PaymentSuccess.jsx';

const App = () => {

  const user=JSON.parse(localStorage.getItem("user"))
  const admin=JSON.parse(localStorage.getItem("admin"))

  const [cart, setCart] = useState([]);
  const handleAddToCart = (course) => {
    setCart((prevCart) => [...prevCart, course]);
  };

  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />

      {/* Other Routes */}
      <Route path='/courses' element={<Courses handleAddToCart={handleAddToCart} />} />
      <Route path='/courses/public/:id' element={<Coursedetail handleAddToCart={handleAddToCart} />} />
      <Route path='/buy/:courseId' element={<Buy/>}/>
      <Route path='/purchases' element={<Purchases/>}/>
      <Route path='/profile' element={<Profile/>}/>

      {/* Admin Routes */}
      <Route path='/admin/signup' element={<AdminSignup/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route
          path="/admin/dashboard"
          element={admin ? <Dashboard /> : <Navigate to={"/admin/login"} />}
        />
      <Route path='/admin/create-course' element={<CourseCreate/>}/>
      <Route path='/admin/update-course/:id' element={<UpdateCourse/>}/>
      <Route path='/admin/our-courses' element={<OurCourses/>}/>
      <Route path='/cart' element={<Cart cart={cart} />} />
      <Route path='/PaymentSuccess' element={<PaymentSuccess />} />

      </Routes>
      <Toaster />
    </div>
  );
} ;


export default App;
