import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";
import cors from "cors";
import paymnt from "./routes/paymnt.route.js";//new
import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import paymentRoute from "./routes/payment.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cors({
    origin: ["https://learnistiq.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT" , "DELETE"],
    allowedHeaders: ["Content-Type","Authorization"],
})
);

//middleware   
app.use(express.json()); //data ko parse krna json s
app.use(cookieParser());

app.use(express.urlencoded({extended:true})); //data ko parse krna urlencoded s

//file upload 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
})
);




const port = process.env.PORT || 3000;
const DB_URI=process.env.MONGO_URI;

try{
   await mongoose.connect(DB_URI);
   console.log("Connected to MongoDB");
}catch(error){
    console.log(error);
}

//defining routes
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1", paymnt);//new

//cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});  

app.listen(port, () => {
    console.log(`server running on port ${port}`);    
});





