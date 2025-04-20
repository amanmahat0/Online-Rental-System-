const express = require("express");
const multer = require("multer");
const path = require("path");

const propertiesController = require("../controller/propertyController");

class PropertyRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeMulter();
    this.initializeRoutes();
  }

  // Initialize Multer for file uploads
  initializeMulter() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads")); // Save files to the "uploads" directory
      },
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Use a unique name for each file
      },
    });

    this.upload = multer({
      storage,
      limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
    });
  }

  // Initialize all routes
  initializeRoutes() {
    // Create a property (with image upload)
    this.router.post(
      "/",
      this.upload.single("propertyImage"),
      propertiesController.createProperty
    );

    // Get all properties
    this.router.get("/", propertiesController.getAllProperties);

    // Get property by ID
    this.router.get("/:id", propertiesController.getPropertyById);

    // Update property (with image upload)
    this.router.put(
      "/:id",
      this.upload.single("propertyImage"),
      propertiesController.updateProperty
    );

    // Delete property
    this.router.delete("/:id", propertiesController.deleteProperty);

    // Get properties by owner ID
    this.router.get(
      "/owner/:ownerId",
      propertiesController.propertiesByOwnerId
    );

    // Get all saved properties
    this.router.post(
      "/savedProperties",
      propertiesController.handleGetAllSavedProperties
    );

    // Get properties by type
    this.router.get(
      "/type/:propertyType",
      propertiesController.getPropertyByType
    );
  }

  // Get the router instance
  getRouter() {
    return this.router;
  }
}

module.exports = new PropertyRoutes().getRouter();
