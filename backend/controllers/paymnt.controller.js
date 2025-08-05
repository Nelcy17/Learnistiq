import { instance } from '../utils/razorpay.js';
import dotenv from "dotenv";
import crypto from "crypto";
import { Payment } from '../models/payment.model.js';
import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";

dotenv.config();

export const processPayment = async (req, res) => {
    const { price, userId, courseIds } = req.body;
  
    const options = {
      amount: Number(price * 100),
      currency: "INR",
      notes: {
        userId: userId,
        courseIds: JSON.stringify(courseIds) // Store array as string
      }
    };
  
    const order = await instance.orders.create(options);
  
    res.status(200).json({
      success: true,
      order,
    });
  }
    

export const getKey = async (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY,
    })
}

export const paymentVerification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex');
    
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      const order = await instance.orders.fetch(razorpay_order_id);  // fetch the order details
  
      const userId = order.notes.userId;
      const courseIds = JSON.parse(order.notes.courseIds);
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Add purchased course IDs to user's purchasedCourses array
      user.purchasedCourses.push(...courseIds);
      await user.save();
  
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId: user._id,
        courseId: courseIds[0], // if multiple courses you can handle separately
      });
  
      return res.redirect(`https://learnistiq.vercel.app/PaymentSuccess?reference=${razorpay_payment_id}`);
    } else {     
      res.status(404).json({ success: false });
    }
  }
  
  