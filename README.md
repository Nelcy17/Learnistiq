
# 🚀 Learnistiq – Full Stack MERN Course Selling Platform

> A production-ready EdTech platform built using the MERN stack with secure authentication and Razorpay payment integration.

---

## 📌 About The Project

Learnistiq is a full-stack online learning platform where users can:

- Browse courses
- Add to cart
- Purchase securely via Razorpay
- Manage their profile
- Access purchased courses
- Admins can create and manage courses

This project replicates a **real-world EdTech product architecture**.

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT-based Authentication
- Protected Routes
- Profile Update Functionality

---

### 🏠 Landing Page
- Hero Section
- Popular Courses
- Testimonials
- FAQ Section

---

### 📚 Course Browsing
- View All Courses
- Search by Name
- Filter by Price
- Course Cards with:
  - Summary
  - Rating
  - Price
  - Add to Cart
  - Buy Now

---

### 🛒 Cart & Checkout
- Add / Remove from Cart
- Coupon Code Input
- Checkout with Price Breakdown
- Secure Razorpay Payment

---

### 💰 Payment Integration
- Order Created from Backend
- Razorpay Checkout (Frontend)
- Server-side Payment Verification
- Secure Confirmation

---

### 💳 Purchases
- View Purchased Courses
- Restricted to Logged-in Users

---

### 🛠️ Admin Panel
- Admin Signup / Login
- Create / Update / Delete Courses
- View All Courses
- Admin Dashboard

---

## 🧠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Razorpay

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure
LEARNISTIQ/
│
├── backend/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── config.js
│ ├── index.js
│ └── .env
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── admin/
│ │ ├── components/
│ │ ├── assets/
│ │ ├── utils/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── vite.config.js
│
└── README.md

---

## 📸 Screenshots

### 🏠 Home Page
<img width="959" height="364" alt="image" src="https://github.com/user-attachments/assets/5eb79f04-c3e3-4cc7-b24f-af28a6c541f2" />

<img width="957" height="474" alt="image" src="https://github.com/user-attachments/assets/4933e6a8-bc17-40c1-8885-4ca423281140" />

<img width="958" height="473" alt="image" src="https://github.com/user-attachments/assets/51b8e4d4-1d48-4770-b71e-d0f1826b6586" />

---

### 📚 Courses Page
<img width="960" height="469" alt="image" src="https://github.com/user-attachments/assets/5951996f-64a0-4d1a-a93d-c628619bd767" />

<img width="950" height="477" alt="image" src="https://github.com/user-attachments/assets/4e2198f0-1c72-48a1-ba47-8cd0dcbaa64a" />

---

### 🛒 Checkout Page
<img width="952" height="464" alt="image" src="https://github.com/user-attachments/assets/b1edf2e0-457d-4d3e-b720-0890789d4614" />

<img width="955" height="463" alt="image" src="https://github.com/user-attachments/assets/8b9f96bd-6d4d-4a6b-ae66-ac7724aedb00" />

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Nelcy17/Learnistiq.git
cd Learnistiq

### 2️⃣ Backend Setup
cd backend
npm install

### 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
