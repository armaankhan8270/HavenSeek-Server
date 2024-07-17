import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "./uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const fileName = "prefix-" + uniqueSuffix + ext;
    cb(null, fileName);
    // Optionally, you can store `fileName` in a database or return it to the client for later use.
  },
});

// Set up Multer to accept up to 10 images
export const upload = multer({
  storage: storage,
  limits: {
    files: 10, // Allow up to 10 files
  },
  fileFilter: function (req, file, cb) {
    // Accept image files only
    if (!file.originalname.match(/\.(jpg|avif|jpeg|png|gif)$/i)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});
