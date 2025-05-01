import express from 'express';
import { checkout } from '../controllers/payment.controller.js';
import { verifyPayment } from '../controllers/payment.controller.js';
import { fallbackPurchase } from '../controllers/payment.controller.js';

const router = express.Router();

router.post("/checkout", checkout);
router.post('/verify', verifyPayment);
router.post("/purchase/fallback", fallbackPurchase);


export default router;



