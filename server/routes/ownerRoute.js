const express = requier("express");
const {
  hashPassword,
  comparePassword,
} = require("../EncoderDecoder/passwordEncoderDecoder");
const app = express();

const Owner = require("../model/ownerModel");

app.post("/owner/signup", async (req, res) => {
  try {
    const encodedPassword = await hashPassword(req.body.password);
    req.body.password = encodedPassword;
    const owner = await Owner.create(req.body);
    res.status(200).json({ status: true, data: owner });
  } catch (error) {
    res.status(500).json({ status: false, messag: error.message });
  }
});

app.post("/owner/login", async (req, res) => {
  console.log(req.body);
  try {
    // find owner by email
    const owner = await Owner.findOne({
      email: req.body.email,
    });
    // if owner not found return error
    if (!owner) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // compare password
    const isMatch = await comparePassword(req.body.password, owner.password);
    // if password not match return error
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // if agent found and password match return owner data and status true
    res.status(200).json({ status: true, data: owner });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// gets all owner
// handle get request for owner
app.get("/agent", async (req, res) => {
  try {
    const owner = await Owner.find({});
    res.status(200).json({ status: true, data: owner });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = app;
