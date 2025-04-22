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
  propertiesByOwnerId,
  handleGetAllSavedProperties,
  getPropertyByType,
  filterProperties,
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
  limits: { fileSize: 50 * 1024 * 1024 },
});

// Routes
router.post("/", upload.single("propertyImage"), createProperty); // Apply multer only to this route
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", upload.single("propertyImage"), updateProperty); // Apply multer for updates if needed
router.delete("/:id", deleteProperty);
router.get("/owner/:ownerId", propertiesByOwnerId);
router.post("/savedProperties", handleGetAllSavedProperties);
router.get("/type/:propertyType", getPropertyByType);
router.get("/filter", filterProperties);
module.exports = router;
