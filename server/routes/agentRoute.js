const express = require("express");
const {
  hashPassword,
  comparePassword,
} = require("../EncoderDecoder/passwordEncoderDecoder");
const app = express();

// Importing Agent Schema
const Agent = require("../model/agentModel");
const e = require("express");

// handle post request
// signup agent
app.post("/agent/signup", async (req, res) => {
  try {
    const encodedPassword = await hashPassword(req.body.password);
    req.body.password = encodedPassword;
    const agent = await Agent.create(req.body);
    res.status(200).json({ status: true, data: agent });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
});

//login agent
app.post("/agent/login", async (req, res) => {
  console.log(req.body);
  try {
    // find agent by email and password
    const agent = await Agent.findOne({
      email: req.body.email,
    });
    // if agent not found return error
    if (!agent) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // compare password
    const isMatch = await comparePassword(req.body.password, agent.password);
    // if password not match return error
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // if agent found and password match return agent data and status true
    res.status(200).json({ status: true, data: agent });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// gets all admin
// handle get request for admin
app.get("/agent", async (req, res) => {
  try {
    const agents = await Agent.find({});
    res.status(200).json({ status: true, data: agents });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = app;
