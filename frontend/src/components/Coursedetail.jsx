import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star } from 'lucide-react';
import { handleAddToCart } from "../utils/CartUtils.js";

const Coursedetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/v1/course/public/${id}`, { withCredentials: true });
        console.log(response.data);
        setCourse(response.data.course);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
  
    fetchCourse();
  }, [id]);
  

  if (!course) {
    return (
      <div className="text-center mt-10">
        <p>Loading...</p>
        <p className="text-red-500">Failed to load course details. Please try again.</p>
      </div>
    );
  }
  

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-xl overflow-hidden">
        <img
          src={course.image?.url}
          alt={course.title}
          className="w-full md:w-1/2 h-80 object-cover"
        />

        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-sm text-gray-500">Instructor: <span className="font-semibold text-gray-700">{course.instructor || "N/A"}</span></p>
            <p className="text-sm text-gray-500">Language: <span className="font-semibold text-gray-700">{course.language || "English"}</span></p>

            <div className="flex items-center gap-2">
              <span className="text-yellow-500 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(course.rating) ? 'fill-yellow-400' : 'fill-gray-200'}`}
                  />
                ))}
              </span>
              <span className="text-sm text-gray-700 font-medium">{course.rating?.toFixed(1) || "4.0"} / 5</span>
            </div>

            <div className="text-xl font-semibold text-white inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full shadow">
              ₹{course.price}
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => handleAddToCart(course)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleAddToCart(course)}
              className="border-2 border-purple-600 text-purple-600 font-semibold px-6 py-2 rounded-lg hover:bg-purple-50 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What you'll learn</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Introduction to {course.title}</li>
            <li>Advanced {course.title} Techniques</li>
            <li>Real-world Applications of {course.title}</li>
            <li>Best Practices in {course.title}</li>
            <li>Hands-on Projects</li>
            <li>Expert Tips and Tricks</li>
            <li>Networking Opportunities</li>
            <li>Career Guidence</li>
            <li>Q&A Session</li>
        </ul>
      </div>

      {course.reviews && course.reviews.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Reviews</h2>
          <div className="space-y-4">
            {course.reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 shadow rounded-lg">
                <p className="font-semibold text-gray-800">{review.user}</p>
                <p className="text-gray-600">{review.comment}</p>
                <div className="flex gap-1 mt-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400' : 'fill-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Coursedetail;



