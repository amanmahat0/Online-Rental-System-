//-----------Importing mongoose----------------
const mongoose = require("mongoose");

class UserModel {
  constructor() {
    this.initializeSchema();
  }

  // Initialize the User schema
  initializeSchema() {
    const UserSchema = mongoose.Schema(
      {
        profileImage: {
          type: String,
          default: null,
        },
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
          // Match email regex pattern for email validation
          match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        },
        password: {
          type: String,
          required: true,
          min: 6,
          max: 1024,
        },
        contact: {
          type: String,
          required: true,
          min: 6,
          max: 255,
        },
        saveProperties: {
          type: [String],
          default: [],
        },
        resetToken: {
          type: String,
          default: null,
        },
        resetTokenExpiry: {
          type: Date,
          default: null,
        },
      },
      // Add timestamps to the schema (createdAt and updatedAt)
      { timestamps: true }
    );

    this.User = mongoose.model("User", UserSchema);
  }

  // Get the User model
  getModel() {
    return this.User;
  }
}

module.exports = new UserModel().getModel();
