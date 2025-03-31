const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // Reference to the user who owns the property
    //   //   required: true,
    // },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    propertyType: {
      type: String,
      enum: ["Room", "Apartment", "Commercial"], // Dropdown options
      required: true,
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
      require: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
