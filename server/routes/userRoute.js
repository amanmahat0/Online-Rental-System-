const express = require("express");

const app = express();

const {
  handelUserSignUp,
  handelUserLogin,
  handelGetAllUsers,
  handelUserForgotPassword,
  handelUserChangePassword,
} = require("../controller/userController");

app.post("/signup", handelUserSignUp);

app.post("/login", handelUserLogin);

app.get("/", handelGetAllUsers);

app.post("/forgot-password", handelUserForgotPassword);

app.post("/changePassword", handelUserChangePassword);

module.exports = app;
