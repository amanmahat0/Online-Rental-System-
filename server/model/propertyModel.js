const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "role",
      required: true,
    },
    role: {
      type: String,
      enum: ["Owner", "Agent"],
      default: "Owner",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    propertyType: {
      type: String,
      enum: ["Apartment", "House", "Room", "Commercial", "Office"], // Dropdown options
      required: true,
    },
    customerId: {
      type: [
        {
          customer: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "customerRole",
          },
          customerRole: {
            type: String,
            enum: ["User", "Agent"],
          },
        },
      ],
      default: [],
    },
    acceptedCustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "customerRole",
      default: null,
    },
    location: {
      city: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
    },
    pricePerMonth: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availabilityStatus: {
      type: Boolean,
      default: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
