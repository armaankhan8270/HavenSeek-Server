import express from "express";
const router = express.Router();
import { processPayment } from "../controllers/Payment.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

// Process payment
router.post("/process", authMiddleware, processPayment);

export default router;
