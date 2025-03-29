const express = require("express");
const app = express();

const {
  handelGetAllAdmin,
  handelAdminLogin,
  handelAdminSignUp,
} = require("../controller/adminController");

// handle post request
app.post("/signup", handelAdminSignUp);

//login admin
app.post("/login", handelAdminLogin);

app.get("/", handelGetAllAdmin);

module.exports = app;
