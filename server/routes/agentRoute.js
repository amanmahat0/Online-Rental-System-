const express = require("express");

const app = express();

const {
  handelAgentSignUp,
  handelAgentLogin,
  handelGetAllAgent,
  handelAgentForgotPassword,
  handelAgentChangePassword,
} = require("../controller/agentController");

// handle post request
// signup agent
app.post("/signup", handelAgentSignUp);

//login agent
app.post("/login", handelAgentLogin);

// gets all admin
// handle get request for admin
app.get("/", handelGetAllAgent);

app.get("/forgot-password", handelAgentForgotPassword);

app.post("/changePassword", handelAgentChangePassword);

module.exports = app;
