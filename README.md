Learnistiq – Full Stack MERN Course Selling Platform

Learnistiq is a Full Stack MERN (MongoDB, Express, React, Node.js) based online learning platform where users can browse, purchase, and manage courses with secure authentication and integrated Razorpay payments.
It replicates real-world EdTech product architecture with authentication, cart management, payment gateway integration, and user dashboard features.

📌 Features
🔐 Authentication

User Registration

User Login

JWT-based authentication

Protected routes

Profile update functionality

🏠 Landing Page

Hero Section 

Popular Courses Section

Course Thumbnail

Rating

Price

Enroll Now Button

Learners Viewing Section

Testimonials ("What Users Say About Us")

FAQ Section

📚 Browse Courses

View all available courses (ML, AI, Python, Web Dev, Cyber Security, etc.)

Search courses by name

Filter courses by maximum price

Course Cards include:

Course Name

Course Summary

Price

Buy Now

Add to Cart

🛒 Cart & Checkout

Add to Cart functionality

Remove from Cart

Coupon code input 

Checkout page with price breakdown

Razorpay payment integration

Secure payment flow

💰 Payment Integration (Razorpay)

Orders created from backend

Razorpay checkout opened from frontend

Payment verification handled server-side

Secure order confirmation

💳 Purchases Section

Displays all purchased courses

Only accessible to logged-in users

🛠️ Admin Panel

Learnistiq includes a fully functional Admin Panel.

Admin Capabilities:

 Admin Signup / Login

 Create New Courses

 Update Existing Courses

 Delete Courses

 View All Created Courses

 Access Dashboard

👤 Profile Section

Update user details

Manage account information


🧠 Tech Stack
Frontend

React.js

React Router

Axios

Tailwind CSS / Custom CSS

Context API / State Management

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Razorpay Payment Gateway

Deployment

Frontend: Vercel

Backend: Render

📁 Project Architecture
🏗️ Folder Structure
LEARNISTIQ/
│
├── backend/
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── course.controller.js
│   │   ├── payment.controller.js
│   │   ├── paymnt.controller.js
│   │   └── user.controller.js
│   │
│   ├── Middlewares/
│   │   ├── admin.mid.js
│   │   └── user.mid.js
│   │
│   ├── models/
│   │   ├── admin.model.js
│   │   ├── course.model.js
│   │   ├── payment.model.js
│   │   ├── purchase.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── admin.route.js
│   │   ├── course.route.js
│   │   ├── payment.route.js
│   │   ├── paymnt.route.js
│   │   └── user.route.js
│   │
│   ├── utils/
│   │   └── razorpay.js
│   │
│   ├── config.js
│   ├── index.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminSignup.jsx
│   │   │   ├── CourseCreate.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── OurCourses.jsx
│   │   │   └── UpdateCourse.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Buy.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── CoursePage.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── PaymentSuccess.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Purchases.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── assets/
│   │   ├── utils/
│   │   │   └── CartUtils.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   │
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md


📸 Screenshots
🏠 Home Page

<img width="959" height="364" alt="image" src="https://github.com/user-attachments/assets/5eb79f04-c3e3-4cc7-b24f-af28a6c541f2" />

<img width="957" height="474" alt="image" src="https://github.com/user-attachments/assets/4933e6a8-bc17-40c1-8885-4ca423281140" />

<img width="958" height="473" alt="image" src="https://github.com/user-attachments/assets/51b8e4d4-1d48-4770-b71e-d0f1826b6586" />

📚 Courses Page

<img width="960" height="469" alt="image" src="https://github.com/user-attachments/assets/5951996f-64a0-4d1a-a93d-c628619bd767" />

<img width="950" height="477" alt="image" src="https://github.com/user-attachments/assets/4e2198f0-1c72-48a1-ba47-8cd0dcbaa64a" />

🛒 Checkout Page

<img width="952" height="464" alt="image" src="https://github.com/user-attachments/assets/b1edf2e0-457d-4d3e-b720-0890789d4614" />

<img width="955" height="463" alt="image" src="https://github.com/user-attachments/assets/8b9f96bd-6d4d-4a6b-ae66-ac7724aedb00" />


⚙️ Installation & Setup

1️⃣ Clone the Repository
git clone https://github.com/Nelcy17/Learnistiq.git
cd learnistiq

2️⃣ Backend Setup
cd server
npm install

Create .env file inside /server:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

Run backend:
npm run dev

3️⃣ Frontend Setup
cd client
npm install
npm start

👩‍💻 Author
Nelcy Rathore
B.Tech CSE(AIML)


