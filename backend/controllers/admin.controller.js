import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { Admin } from "../models/admin.model.js";

export const signup = async (req, res) => {
    const { firstName, lastName, email, password }=req.body;

    const hashedPassword=await bcrypt.hash(password,10)

    try {
        const existingAdmin=await Admin.findOne({email: email});
    if(existingAdmin){
        return res.status(400).json({errors: "Admin already exists"});
    }
    const newAdmin=new Admin({ firstName, lastName, email, password:hashedPassword });
    await newAdmin.save();
    res.status(201).json({message:"Signup succeedded",newAdmin});
    } catch (error) {
        res.status(500).json({errors: "Error in signup"});
        console.log("Error in signup", error);
    }
};

export const login = async (req, res) => {
   const { email, password } = req.body;
   try {
      const adminUser = await Admin.findOne({ email: email });
      const isPasswordCorrect = await bcrypt.compare(password, adminUser.password);

      if(!adminUser || !isPasswordCorrect) {
        return res.status(403).json({ errors: "Invqlid Credentials" });
      }

      //jwt code
      const token = jwt.sign(
        {
        id: adminUser._id,        
      },  
      config.JWT_ADMIN_PASSWORD,
      { expiresIn: "1d" }
    );
      const cookieOptions={
        expires: new Date(Date.now() + 24*60 * 60 * 1000), //1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", //true for https only
        samesite:"Strict"
      }
      res.cookie("jwt",token,cookieOptions);
      res.status(201).json({ message: "Login Successful",Admin,token });
   } catch (error) {
       res.status(500).json({ errors: "Error in login" });
       console.log("error in login", error);
   }
};

export const logout=(req, res) => {
   try {
    if(!req.cookies.jwt){
        return res.status(401).json({ errors: "Kindly login first" });
    }
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
   } catch (error) {
     res.status(500).json({ errors: "Error in logout" });
     console.log("Error in logout", error);
   }
};