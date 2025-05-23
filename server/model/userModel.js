//-----------Importing mongoose----------------
const mongoose = require("mongoose");
//-----------Creating Table Schema for User Collection--------
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
      // match email regex pattern for email validation change if not needed
      match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    // address: {
    //   type: String,
    //   required: true,
    //   min: 6,
    //   max: 255,
    // },
    contact: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    saveProperties: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
      ],
      default: [],
    },
    bookedProperties: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
      ],
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
  // add timestamps to the schema gives createdAt and updatedAt time
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
