import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");

    useEffect(() => {
        const userData = localStorage.getItem("user");
    
        if (userData) {
          const parsedData = JSON.parse(userData);
          setEmail(parsedData?.user?.email || "");
          setName(parsedData?.user?.firstName || "User");

          console.log("Email:", parsedData?.user?.email);
          console.log("Name:", parsedData?.user?.name);

        }
      }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
       <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mt-10">Payment Successful!</h1>
            <p className="text-center mt-4">Thank you for your purchase. Your payment has been successfully processed.</p>
            
                <p className="text-center mt-4">
                    Reference ID:{referenceNum}
                </p>
                <Link to="/purchases" className="text-blue-500  mt-4 block text-center">Start Learning</Link>
       </div>
    </div>
  )
}

export default PaymentSuccess;
