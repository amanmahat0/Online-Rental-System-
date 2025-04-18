const express = require("express");

const AdminController = require("../controller/adminController");

class AdminRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  // Initialize all routes
  initializeRoutes() {
    // Signup admin
    this.router.post("/signup", AdminController.signUp);

    // Login admin
    this.router.post("/login", AdminController.login);

    // Get all admins
    this.router.get("/", AdminController.getAllAdmin);

    // Get admin by ID
    this.router.put("/:id", AdminController.getAdminById);

    // Delete admin by ID
    this.router.delete("/:id", AdminController.deleteAdmin);
  }

  // Get the router instance
  getRouter() {
    return this.router;
  }
}

module.exports = new AdminRoutes().getRouter();
