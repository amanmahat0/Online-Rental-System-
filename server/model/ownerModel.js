//-----------Importing mongoose----------------
//-----------Creating Table Schema for Agent Collection--------

const mongoose = require("mongoose");

// change the schema properties as needed
const OwnerSchema = mongoose.Schema(
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
      unique: true,
      min: 6,
      max: 255,
      // match email regex pattern for email validation change if not needed
      match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    address: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    contact: {
      type: String,
      required: true,
      min: 6,
      max: 255,
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
  // add timestamps to the schema gives createdAt and updatedAt time
  { timestamps: true }
);

const Owner = mongoose.model("Owner", OwnerSchema);
module.exports = Owner;
