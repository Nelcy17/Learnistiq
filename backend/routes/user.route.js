import express from "express";
import { signup } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";
import { logout } from "../controllers/user.controller.js";
import { getUserPurchases } from "../controllers/user.controller.js";
import userMiddleware from "../Middlewares/user.mid.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login",login);
router.get("/logout",logout);
router.get("/purchases",getUserPurchases);

export default router;


