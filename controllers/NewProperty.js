// src/controllers/propertyController.js
import Agent from "../model/Agent.js"; // Assuming you have an Agent model
import AgentNew from "../model/DetailedAgent.js";
import Propertys from "../model/Propertys.js";
export const createProperty = async (req, res) => {
  const {
    title,
    description,
    price,
    location,
    type,
    amenities,
    videos,
    address,
    agent,
    bedrooms,
    bathrooms,
    squareFootage,
    yearBuilt,
    floorNumber,
    totalFloors,
    furnishingStatus,
    propertyStatus,
    parking,
    nearbyAmenities,
    propertyFeatures,
    contactInfo,
    mapCoordinates,
    virtualTourLink,
    floorPlans,
    availabilityDate,
    deposit,
    maintenanceCharges,
    petsAllowed,
    heatingCoolingSystem,
  } = req.body;

  try {
    // Check if agent exists
    const agentExists = await AgentNew.findById(
      agent ? agent : "668ce5b1235c0be0eacaa7e3"
    );
    if (!agentExists) {
      return res.status(400).json({ error: "Agent does not exist" });
    }
    const imageFileNames = req.files.map((file) => file.filename);
    const newProperty = new Propertys({
      title,
      description,
      price,
      location,
      type,
      amenities,
      images: imageFileNames,
      videos,
      address,
      agent,
      bedrooms,
      bathrooms,
      squareFootage,
      yearBuilt,
      floorNumber,
      totalFloors,
      furnishingStatus,
      propertyStatus,
      parking,
      nearbyAmenities,
      propertyFeatures,
      contactInfo,
      mapCoordinates,
      virtualTourLink,
      floorPlans,
      availabilityDate,
      deposit,
      maintenanceCharges,
      petsAllowed,
      heatingCoolingSystem,
      agent: agent,
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Propertys.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPropertiesByAgent = async (req, res) => {
  const { agentId } = req.body;

  try {
    // Find properties by agent ID
    const properties = await Propertys.find({ agent: agentId });
    if (!properties.length) {
      return res
        .status(404)
        .json({ message: "No properties found for this agent" });
    }
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Propertys.findById(id);
    if (!property) {
      return res.status(404).send("Property not found");
    }
    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).send("Server error");
  }
};
export const getProperty = async (req, res) => {
  try {
    const property = await Propertys.findById(req.params.id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Propertys.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    await Propertys.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
