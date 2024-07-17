import bcrypt from "bcryptjs";
import AgentNew from "../model/DetailedAgent.js";
import jwt from "jsonwebtoken";
import path from "path";
// Create a new agent
export const createAgent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      experience,
      certifications,
      areasOfExpertise,
      languagesSpoken,
      biography,
      socialMediaLinks,
      officeLocation,
      availability,
    } = req.body;
    let fileName = req.body.profilePicture; // Fallback to provided URL
    if (req.file) {
      const imagePath = req.file.path;
      fileName = path.basename(imagePath);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new AgentNew({
      name,
      email,
      phone,
      profilePicture: fileName,
      password: hashedPassword,
      experience,
      certifications,
      areasOfExpertise,
      languagesSpoken,
      biography,
      socialMediaLinks,
      officeLocation,
      availability,
    });

    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all agents
export const getAllAgents = async (req, res) => {
  try {
    const agents = await AgentNew.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get agent by ID
export const getAgentById = async (req, res) => {
  try {
    const agent = await AgentNew.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAgentDetails = async (id) => {
  console.log(id);
  try {
    const ConvertId = id.toString();
    const agent = await AgentNew.findById(ConvertId);
    console.log(ConvertId);
    console.log(agent.email);
    // if (!agent) throw new Error("Agent not found");
    return agent.email;
  } catch (error) {
    // throw new Error(error.message);
  }
};
// Update an agent
export const updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (req.file) {
      updatedData.profilePicture = req.file.path;
    }

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedAgent = await AgentNew.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedAgent)
      return res.status(404).json({ message: "Agent not found" });
    res.status(200).json(updatedAgent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const loginAgent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const agent = await AgentNew.findOne({ email });
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, agent.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: agent._id, email: agent.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, agent });
    // res.json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
