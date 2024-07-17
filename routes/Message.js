import express from "express";
const router = express.Router();
import { getMessagesForUser, sendMessage } from "../controllers/Message.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

// Get all messages for a user
router.get("/", authMiddleware, getMessagesForUser);

// Send a message
router.post("/", authMiddleware, sendMessage);

export default router;
