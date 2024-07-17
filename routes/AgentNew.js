import express from "express";
const router = express.Router();
import {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgent,
  loginAgent,
} from "../controllers/AgentNew.js";
import { upload } from "../multer.js";

// Get all agents

// Create a new agent
router.post("/", upload.single("profilePicture"), createAgent);
router.get("/", getAllAgents);
router.post("/login", loginAgent);
// Get agent by ID
router.get("/:id", getAgentById);
// Update an agent

// Delete an agent

export default router;
