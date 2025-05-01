import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const Buy = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData ? userData.token : null;
 


  const handlePurchase = async () => {
     if(!token){
      toast.error("please login to purchase the courses");
      navigate("/login");
      return;
     }
     console.log("Authorization Header", `Bearer ${token}`);
     try {
      setLoading(true);
      const response=await axios.post(`http://localhost:4001/api/v1/course/buy/${courseId}`,{},{
        headers:{
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true,
      })
      toast.success(response.data.message || "course purchased successfully");
      navigate("/purchases");
      setLoading(false)
     } catch (error) {
       setLoading(false)
       if(error?.response?.status===400){
        toast.error("you have already purchased this course")
       }
       else{
        toast.error(error?.response?.data?.errors)
       }
     }
  } 

  return (
    <div className="flex h-screen items-center justify-center">
       <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 duration-300" onClick={handlePurchase} disabled={loading}>
          {loading ? "processing..." : "Buy Now"}
       </button>
    </div>
  )
}

export default Buy;
