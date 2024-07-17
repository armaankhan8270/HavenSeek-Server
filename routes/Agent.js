import express from "express";
const router = express.Router();
import {
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
  loginAgent,
  registerAgent,
} from "../controllers/Agent.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { upload } from "../multer.js";

// Get all agents
router.get("/", getAllAgents);

// Get agent by ID
router.get("/:id", getAgentById);
router.post("/login", loginAgent);

// Create a new agent
router.post("/", upload.single("profilePicture"), registerAgent);

// Update an agent
router.put("/:id", authMiddleware, updateAgent);

// Delete an agent
router.delete("/:id", authMiddleware, deleteAgent);

export default router;
