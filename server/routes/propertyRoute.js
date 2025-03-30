const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controller/propertyController");

// Configure Multer for disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Use a unique name for each file
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 16 * 1024 * 1024 }, // Limit file size to 16MB
}).array("propertyImages", 5); // Allow up to 5 images

// Routes
router.post("/", upload, createProperty); // Apply multer only to this route
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", upload, updateProperty); // Apply multer for updates if needed
router.delete("/:id", deleteProperty);

module.exports = router;
