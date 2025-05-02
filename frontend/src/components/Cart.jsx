import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/Utils";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);

    if (userData) {
      const parsedData = JSON.parse(userData);
      setEmail(parsedData?.user?.email || "");
    }
  }, []);

  const { initialPrice, discount, payableAmount } = useMemo(() => {
    const initial = cartItems.reduce(
      (total, course) => total + (course.originalPrice || course.price || 0),
      0
    );
    const discountValue = cartItems.reduce(
      (total, course) =>
        total + ((course.price || course.price || 0) - (course.discountedPrice || course.price || 0)),
      0
    );
    const payable = initial - discountValue;
    return { initialPrice: initial, discount: discountValue, payableAmount: payable };
  }, [cartItems]);

  const handleRemoveCourse = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  const checkoutHndlr = async (price) => {
    const { data: keyData } = await axios.get(`${BACKEND_URL}/getKey`);
    const { key } = keyData;

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.user?._id;
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const courseIds = cartData.map(course => course._id);

    const { data: orderData } = await axios.post(`${BACKEND_URL}/paymnt/process`, {
      price,
      userId,
      courseIds
    });

    const { order } = orderData;

    const options = {
      key,
      amount: price,
      currency: "INR",
      name: "Learnistiq",
      description: "Course Payment",
      order_id: order.id,
      callback_url: `${BACKEND_URL}/paymntVerification`,
      prefill: {
        name: "Student",
        email: userData?.user?.email || "student@gmail.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }



  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>
      <p className="text-xl font-semibold pb-6">{cartItems.length}{cartItems.length > 1 ? "" : ""} course in cart</p>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center mt-20 text-2xl">Looks like your cart is empty! Browse our Courses to get started and start Learning.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">

          <div className="flex-1 space-y-6">
          {cartItems.map((course, index) => (
  <div
    key={index}
    className="flex gap-6 bg-white rounded-lg shadow p-5 hover:shadow-md transition border border-gray-200"
  >

    <div className="w-40 h-28 flex-shrink-0 rounded overflow-hidden">
      <img
        src={course.image.url}
        alt={course.title}
        className="w-full h-full object-cover object-center"
      />
    </div>


    <div className="flex flex-col justify-between flex-1">
      <div>
        <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full w-fit mb-2">
          Course
        </span>

        <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>


        {course.instructor && (
          <p className="text-sm text-gray-500 mt-1">by {course.instructor}</p>
        )}


        <div className="flex items-center text-yellow-500 text-sm mt-2">
          ★★★★☆ <span className="text-gray-400 ml-1">4.5</span>
        </div>


        <p className="text-gray-400 text-sm mt-2">(1 Year Access)</p>
      </div>


      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3 text-lg">
          <span className="line-through text-gray-400">
            ₹{course.originalPrice + 1000 || course.price + 1000}
          </span>
          <span className="text-green-500 font-bold">
            ₹{course.discountedPrice || course.price}
          </span>
        </div>

        <button
          onClick={() => handleRemoveCourse(index)}
          className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
))}


          </div>


          <div className="bg-white rounded-2xl shadow-lg p-8 w-full md:w-96">
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="flex-1 bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="bg-indigo-500 text-white px-4 py-3 rounded-lg hover:bg-indigo-600 transition">
                Apply
              </button>
            </div>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Initial Price</span>
                <span>₹{initialPrice}</span>
              </div>
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-6 pt-6">
              <p className="text-lg font-semibold text-black">Payable Amount</p>
              <p className="text-3xl font-bold mt-2 text-black">₹{payableAmount}</p>
              <p className="text-xs text-gray-400 mt-1">* Inclusive of all taxes</p>
            </div>

            <button
              onClick={() => checkoutHndlr(initialPrice)}
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold w-full py-3 rounded-lg mt-6 transition disabled:opacity-50"
              disabled={cartItems.length === 0 || payableAmount <= 0}
            >
              Proceed to Pay
            </button>

            <p className="text-xs text-purple-500 mt-4 text-center">
              No cost EMI Available. Contact Support
            </p>
          </div>
        </div>
      )}
    </div>
  );

};

export default CartPage;


