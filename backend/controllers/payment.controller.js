import instance from "../utils/razorpay.js";
import { User } from "../models/user.model.js";
import { Purchase } from "../models/purchase.model.js";
import crypto from "crypto";

// CHECKOUT CONTROLLER
export const checkout = async (req, res) => {
  try {
    const price = Number(req.body.price);
    console.log("Price from frontend:", price);

    // ✅ Validate price
    if (!price || price <= 0) {
      return res.status(400).json({ success: false, error: "Invalid price value" });
    }

    const amountInPaise = price * 100;
    const options = {
      amount: amountInPaise,
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    console.log("Razorpay Order:", order);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ success: false, error });
  }
};

// VERIFY PAYMENT CONTROLLER
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
      email,
    } = req.body;

    // 🐞 DEBUG: Log request body to check for malformed/missing values
    console.log("🔍 Incoming payment verification payload:", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
      email,
    });

    // Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    // 🐞 DEBUG: Log expected vs received signature
    console.log("RAZORPAY_SECRET from env:", process.env.RAZORPAY_SECRET);

    console.log("🔐 Expected Signature:", expectedSignature);
    console.log("🔐 Razorpay Signature:", razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Get user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Save to Purchase collection and user's purchasedCourses
    for (let course of courses) {
      const existingPurchase = await Purchase.findOne({
        userId: user._id,
        courseId: course._id,
      });

      if (!existingPurchase) {
        await Purchase.create({
          userId: user._id,
          courseId: course._id,
        });

        if (!user.purchasedCourses.includes(course._id)) {
          user.purchasedCourses.push(course._id);
        }
      }
    }

    await user.save(); // ✅ Save the updated user document

    return res.status(200).json({ success: true, message: "Payment verified and purchases saved" });
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const fallbackPurchase = async (req, res) => {
  const { email, courses, payment_id, order_id, signature, status } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    for (let course of courses) {
      const existingPurchase = await Purchase.findOne({
        userId: user._id,
        courseId: course._id,
      });

      if (!existingPurchase) {
        await Purchase.create({
          userId: user._id,
          courseId: course._id,
          paymentId: payment_id,
          orderId: order_id,
          signature: signature,
          verified: false,
          status,
          fallback: true,
        });

        if (!user.purchasedCourses.includes(course._id)) {
          user.purchasedCourses.push(course._id);
        }
      }
    }

    await user.save();
    return res.status(200).json({ message: "Fallback purchase recorded." });
  } catch (err) {
    console.error("Fallback error:", err);
    res.status(500).json({ message: "Could not record fallback purchase." });
  }
};

