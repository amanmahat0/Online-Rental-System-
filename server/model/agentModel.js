//-----------Importing mongoose----------------
const mongoose = require("mongoose");

class AgentModel {
  constructor() {
    this.initializeSchema();
  }

  // Initialize the Agent schema
  initializeSchema() {
    const AgentSchema = mongoose.Schema(
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
          unique: true,
          min: 6,
          max: 255,
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
        companyName: {
          type: String,
          min: 6,
          max: 255,
        },
        properties: [
          {
            type: String,
            ref: "Property",
            default: [],
          },
        ],
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

    this.Agent = mongoose.model("Agent", AgentSchema);
  }

  // Get the Agent model
  getModel() {
    return this.Agent;
  }
}

module.exports = new AgentModel().getModel();
