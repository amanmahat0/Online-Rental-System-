const express = require("express");

const app = express();

const {
  handelOwnerSignUp,
  handelOwnerLogin,
  handelGetAllOwner,
  handelOwnerForgotPassword,
  handelOwnerChangePassword,
} = require("../controller/ownerController");

app.post("/signup", handelOwnerSignUp);

app.post("/login", handelOwnerLogin);

// gets all owner
// handle get request for owner
app.get("/", handelGetAllOwner);

app.get("/forgot-password", handelOwnerForgotPassword);

app.post("/changePassword", handelOwnerChangePassword);

module.exports = app;
