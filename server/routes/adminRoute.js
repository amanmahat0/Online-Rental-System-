const express = require("express");
const app = express();

const {
  handelGetAllAdmin,
  handelAdminLogin,
  handelAdminSignUp,
  handelGetAdminById,
  handelDeleteAdmin,
} = require("../controller/adminController");

// handle post request
app.post("/signup", handelAdminSignUp);

//login admin
app.post("/login", handelAdminLogin);

app.get("/", handelGetAllAdmin);

app.put("/:id", handelGetAdminById);

app.delete("/:id", handelDeleteAdmin);

module.exports = app;
