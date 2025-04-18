const express = require("express");
const multer = require("multer");
const path = require("path");

const ownerController = require("../controller/ownerController");

class OwnerRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeMulter();
    this.initializeRoutes();
  }

  // Initialize Multer for file uploads
  initializeMulter() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/profileImage")); // Save files to the "uploads" directory
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
    // Signup owner
    this.router.post("/signup", ownerController.signUp);

    // Login owner
    this.router.post("/login", ownerController.login);

    // Get all owners
    this.router.get("/", ownerController.getAllOwner);

    // Forgot password
    this.router.get("/forgot-password", ownerController.forgotPassword);

    // Change password
    this.router.post("/changePassword", ownerController.changePassword);

    // Get owner by ID
    this.router.get("/:id", ownerController.ownerById);

    // Update owner by ID (with profile image upload)
    this.router.put(
      "/:id",
      this.upload.single("profileImage"),
      ownerController.updateOwnerById
    );

    // Delete owner by ID
    this.router.delete("/:id", ownerController.deleteOwnerById);
  }

  // Get the router instance
  getRouter() {
    return this.router;
  }
}

module.exports = new OwnerRoutes().getRouter();
