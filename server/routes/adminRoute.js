const express = require("express");
const {
  hashPassword,
  comparePassword,
} = require("../EncoderDecoder/passwordEncoderDecoder");
const app = express();

// Importing Admin Schema
const Admin = require("../model/adminModel");

// handle post request
app.post("/admin/signup", async (req, res) => {
  try {
    const encodedPassword = await hashPassword(req.body.password);
    req.body.password = encodedPassword;
    const admin = await Admin.create(req.body);
    res.status(200).json({ status: true, data: admin });
  } catch (error) {
    res.json({ status: false, message: error });
  }
});

//login admin
app.post("/admin/login", async (req, res) => {
  console.log(req.body);
  try {
    // find admin by email and password
    const admin = await Admin.findOne({
      email: req.body.email,
    });
    // if admin not found return error
    if (!admin) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // compare password
    const isMatch = await comparePassword(req.body.password, admin.password);
    // if password not match return error
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // if admin found and password match return admin data and status true
    res.status(200).json({ status: true, data: admin });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

app.get("/admin", async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).json({ status: true, data: admins });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = app;
