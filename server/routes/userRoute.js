const express = require("express");
const multer = require("multer");
const path = require("path");

const userController = require("../controller/userController");

class UserRoutes {
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
    // Signup user
    this.router.post("/signup", userController.handleUserSignUp);

    // Login user
    this.router.post("/login", userController.handleUserLogin);

    // Get all users
    this.router.get("/", userController.handleGetAllUsers);

    // Forgot password
    this.router.post(
      "/forgot-password",
      userController.handleUserForgotPassword
    );

    // Change password
    this.router.post(
      "/changePassword",
      userController.handleUserChangePassword
    );

    // Get user by ID
    this.router.get("/:id", userController.handleUserById);

    // Update user by ID (with profile image upload)
    this.router.put(
      "/:id",
      this.upload.single("profileImage"),
      userController.handleUpdateUserById
    );

    // Delete user by ID
    this.router.delete("/:id", userController.handleDeleteUserById);

    // Save or unsave properties
    this.router.post(
      "/saveProperties",
      userController.handleSaveAndUnsaveProperties
    );
  }

  // Get the router instance
  getRouter() {
    return this.router;
  }
}

module.exports = new UserRoutes().getRouter();
