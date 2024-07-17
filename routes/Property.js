// src/routes/propertyRoutes.js
import express from "express";
import { upload } from "../multer.js";
import {
  createProperty,
  deleteProperty,
  getAllProperty,
  getPropertyById,
  updateProperty,
} from "../controllers/Property.js";

const router = express.Router();

router.post("/", upload.array("images", 10), createProperty);
router.get("/", getAllProperty);
router.get("/:id", getPropertyById);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;
