//-----------Importing mongoose----------------
const mongoose = require("mongoose");

class AdminModel {
  constructor() {
    this.initializeSchema();
  }

  // Initialize the Admin schema
  initializeSchema() {
    const AdminSchema = mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
          min: 6,
          max: 255,
        },
        email: {
          type: String,
          required: true,
          min: 6,
          max: 255,
          unique: true,
          // match email regex pattern for email validation
          match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        },
        password: {
          type: String,
          required: true,
          min: 6,
          max: 1024,
        },
      },
      // Add timestamps to the schema (createdAt and updatedAt)
      { timestamps: true }
    );

    this.Admin = mongoose.model("Admin", AdminSchema);
  }

  // Get the Admin model
  getModel() {
    return this.Admin;
  }
}

module.exports = new AdminModel().getModel();
