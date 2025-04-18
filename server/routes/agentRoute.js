const express = require("express");
const multer = require("multer");
const path = require("path");

const agentController = require("../controller/agentController");

class AgentRoutes {
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
    // Signup agent
    this.router.post("/signup", agentController.signUp);

    // Login agent
    this.router.post("/login", agentController.login);

    // Get all agents
    this.router.get("/", agentController.getAllAgent);

    // Forgot password
    this.router.get("/forgot-password", agentController.forgotPassword);

    // Change password
    this.router.post("/changePassword", agentController.changePassword);

    // Get agent by ID
    this.router.get("/:id", agentController.agentById);

    // Update agent by ID (with profile image upload)
    this.router.put(
      "/:id",
      this.upload.single("profileImage"),
      agentController.updateAgentById
    );

    // Delete agent by ID
    this.router.delete("/:id", agentController.deleteAgentById);
  }

  // Get the router instance
  getRouter() {
    return this.router;
  }
}

module.exports = new AgentRoutes().getRouter();
