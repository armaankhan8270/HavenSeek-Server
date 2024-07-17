// src/controllers/propertyController.js
import Property from "../model/Property.js";
import path from "path";
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
    Address,
    agent,
  } = req.body;

  try {
    const imageFileNames = req.files.map((file) => file.filename);

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      type,
      amenities,
      images: imageFileNames,
      videos,
      Address,
      agent,
    });

    await newProperty.save();
    res.status(201).send("Property created successfully");
  } catch (error) {
    console.error("Failed to create property:", error);
    res.status(500).send("Failed to create property");
  }
};
export const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).send("Property not found");
    }
    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).send("Server error");
  }
};
export const getAllProperty = async (req, res) => {
  try {
    const allProperties = await Property.find();
    res.status(200).json(allProperties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    location,
    type,
    amenities,
    videos,
    Address,
    agent,
  } = req.body;
  const images = req.file ? req.file.path : null;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        location,
        type,
        amenities,
        images,
        videos,
        Address,
        agent,
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).send("Property not found");
    }

    res.json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).send("Failed to update property");
  }
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).send("Property not found");
    }
    res.send("Property deleted successfully");
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).send("Failed to delete property");
  }
};
export const getPropertyAddress = async (propertyId) => {
  try {
    const property = await Propertys.findById(propertyId);
    if (!property) {
      throw new Error(`Property not found with ID ${propertyId}`);
    }
    return property.location;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPropertyType = async (propertyId) => {
  try {
    const property = await Propertys.findById(propertyId);
    if (!property) {
      throw new Error(`Property not found with ID ${propertyId}`);
    }
    return property.type;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getPropertyTitle = async (propertyId) => {
  try {
    const property = await Propertys.findById(propertyId);
    if (!property) {
      throw new Error(`Property not found with ID ${propertyId}`);
    }
    return property.title;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getPropertyAgent = async (propertyId) => {
  try {
    const property = await Propertys.findById(propertyId);
    if (!property) {
      throw new Error(`Property not found with ID ${propertyId}`);
    }
    return property.agent;
  } catch (error) {
    console.error(error);
    return null;
  }
};
