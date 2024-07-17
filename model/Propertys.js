// src/models/Property.js
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["sale", "rent"],
      required: true,
    },
    amenities: [String],
    images: {
      type: [String],
      required: true,
    },
    videos: [String],
    address: String,
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    squareFootage: {
      type: Number,
      required: true,
    },
    yearBuilt: {
      type: Number,
    },
    floorNumber: {
      type: Number,
    },
    totalFloors: {
      type: Number,
    },
    furnishingStatus: {
      type: String,
      enum: ["furnished", "semi-furnished", "unfurnished"],
    },
    propertyStatus: {
      type: String,
      enum: ["available", "sold", "under offer"],
      required: true,
    },
    parking: {
      type: String,
    },
    nearbyAmenities: [String],
    propertyFeatures: [String],
    contactInfo: String,
    mapCoordinates: {
      lat: Number,
      lng: Number,
    },
    propertyID: {
      type: String,
    },
    virtualTourLink: String,
    floorPlans: [String],
    availabilityDate: Date,
    deposit: {
      type: Number,
    },
    maintenanceCharges: {
      type: Number,
    },
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    heatingCoolingSystem: String,
  },
  { timestamps: true }
);

const Propertys = mongoose.model("NewProperty", propertySchema);
export default Propertys;
