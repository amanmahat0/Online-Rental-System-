const express = require("express");
const {
  hashPassword,
  comparePassword,
} = require("../EncoderDecoder/passwordEncoderDecoder");
const app = express();

// Importing User Schema
const User = require("../model/userModel");

// handle post request
app.post("/user/signup", async (req, res) => {
  try {
    // encode password
    const encodedPassword = await hashPassword(req.body.password);
    // set password to encoded password
    req.body.password = encodedPassword;
    const user = await User.create(req.body);
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.json({ status: false, message: error });
  }
});

//login user
app.post("/user/login", async (req, res) => {
  try {
    // find user by email and password
    const user = await User.findOne({
      email: req.body.email,
    });
    // if user not found return error
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // compare password
    const isMatch = await comparePassword(req.body.password, user.password);
    // if password not match return error
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // if user found return user data and status true
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// api to get all users
// handle get request for users
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ status: true, data: users });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = app;
