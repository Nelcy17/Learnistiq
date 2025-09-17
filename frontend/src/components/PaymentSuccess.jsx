import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // success icon

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-green-200">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-extrabold text-green-600">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mt-3">
          Thank you <span className="font-semibold">{name}</span> for your
          purchase. We’ve received your payment successfully.
        </p>

        <div className="bg-gray-50 border rounded-lg p-3 mt-5">
          <p className="text-sm text-gray-500">Reference ID</p>
          <p className="font-mono text-lg text-gray-800">{referenceNum}</p>
        </div>

        <Link
          to="/purchases"
          className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
        >
          Start Learning
        </Link>

        {email && (
          <p className="text-xs text-gray-400 mt-4">
            A confirmation has been sent to <span className="font-medium">{email}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

