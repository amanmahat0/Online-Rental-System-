const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const {
  handleUserSignUp,
  handleUserLogin,
  handleGetAllUsers,
  handleUserForgotPassword,
  handleUserChangePassword,
  handleUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleSaveAndUnsaveProperties,
} = require("../controller/userController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/profileImage")); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Use a unique name for each file
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

app.post("/signup", handleUserSignUp);

app.post("/login", handleUserLogin);

app.get("/", handleGetAllUsers);

app.post("/forgot-password", handleUserForgotPassword);

app.post("/changePassword", handleUserChangePassword);

app.put("/:id", upload.single("profileImage"), handleUpdateUserById);

app.get("/:id", handleUserById);

app.delete("/:id", handleDeleteUserById);

app.post("/saveProperties", handleSaveAndUnsaveProperties);

module.exports = app;
