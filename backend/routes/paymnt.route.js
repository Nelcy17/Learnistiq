import express from 'express';
const router = express.Router();
import { processPayment, getKey, paymentVerification } from '../controllers/paymnt.controller.js';


router.route("/paymnt/process").post(processPayment);
router.route("/getkey").get(getKey);
router.route("/paymntVerification").post(paymentVerification);

export default router;

 