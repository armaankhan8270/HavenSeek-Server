import express from "express";
const router = express.Router();
import { register, login } from "../controllers/Auth.js";

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);

export default router;
