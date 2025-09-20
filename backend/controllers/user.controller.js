import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { Course } from "../models/course.model.js";

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const userSchema = z.object({
           password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
            email: z.string().email({ message: "Invalid email address" }),
            firstName: z.string().min(1, { message: "First name is required" }),
            lastName: z.string().min(1, { message: "Last name is required" })
        });

        const validateData = userSchema.safeParse(req.body);
        if (!validateData.success) {
            return res.status(400).json({ errors: validateData.error.errors[0].message });
        }

        // Validate input fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ errors: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ errors: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Signup succeeded", newUser });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ errors: "Error in signup" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ errors: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({ errors: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(403).json({ errors: "Invalid Credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            config.JWT_USER_PASSWORD,
            { expiresIn: "1d" } // Correct expiration format
        );

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict" // Correct spelling
        };

        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({ message: "Login Successful", user, token });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ errors: "Error in login" });
    }
};

export const logout = (req, res) => {
  try {
    // Clear cookie regardless of whether it exists
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",   // or "strict" depending on your case
      secure: true        // required if using HTTPS (Vercel/Render prod env)
    });
    
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout", error);
    return res.status(500).json({ errors: "Error in logout" });
  }
};



export const getUserPurchases = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate('purchasedCourses');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const purchasedCourses = user.purchasedCourses.filter(course => course !== null);
    res.status(200).json({
      purchasedCourses: purchasedCourses,
    });
  } catch (error) {
    console.error("Error fetching user purchases:", error);
    res.status(500).json({ message: "Failed to fetch user purchases", errors: error.message });
  }
};