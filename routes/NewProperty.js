// src/routes/propertyRoutes.js
import express from "express";
import { upload } from "../multer.js";
import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getPropertiesByAgent,
  getPropertyById,
  updateProperty,
} from "../controllers/NewProperty.js";

const router = express.Router();

router.post("/", upload.array("images", 10), createProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);
router.post("/agent", getPropertiesByAgent);

export default router;
