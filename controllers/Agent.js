import path from "path";
import Agent from "../model/Agent.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new agent
export const registerAgent = async (req, res) => {
  const { name, email, password, phone } = req.body;
  let fileName = req.body.profilePicture; // Fallback to provided URL
  if (req.file) {
    const imagePath = req.file.path;
    fileName = path.basename(imagePath);
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const agent = new Agent({
      name,
      email,
      password: hashedPassword,
      phone,
      profilePicture: fileName,
    });

    await agent.save();
    res.status(201).json({ message: "Agent registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login an agent
export const loginAgent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        profilePicture: agent.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all agents
export const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get agent by ID
export const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new agent
export const createAgent = async (req, res) => {
  const { name, email, phone } = req.body;

  // If req.file exists (i.e., a file was uploaded)
  let fileName = req.body.profilePicture; // Fallback to provided URL
  if (req.file) {
    const imagePath = req.file.path;
    fileName = path.basename(imagePath);
  }

  try {
    const agent = new Agent({
      name,
      email,
      phone,
      profilePicture: fileName,
    });
    await agent.save();
    res.status(201).json({ message: "Agent created successfully", agent });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

// Update an agent
export const updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an agent
export const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }
    res.json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const NameOfAgent = async (agent_id) => {
  try {
    const agent = await Agent.findById(agent_id);
    if (!agent) {
      throw new Error(`Agent not found with ID ${agent_id}`);
    }
    return agent.name;
  } catch (error) {
    return error;
  }
};

export const MailOfAgent = async (agent_id) => {
  try {
    const agent = await Agent.findById(agent_id);
    if (!agent) {
      throw new Error(`Agent not found with ID ${agent_id}`);
    }
    return agent.email;
  } catch (error) {
    return error;
  }
};
