const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const {
  handelUserSignUp,
  handelUserLogin,
  handelGetAllUsers,
  handelUserForgotPassword,
  handelUserChangePassword,
  handelUserById,
  handelUpdateUserById,
  handelDeleteUserById,
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

app.post("/signup", handelUserSignUp);

app.post("/login", handelUserLogin);

app.get("/", handelGetAllUsers);

app.post("/forgot-password", handelUserForgotPassword);

app.post("/changePassword", handelUserChangePassword);

app.get("/:id", handelUserById);

app.put("/:id", upload.single("profileImage"), handelUpdateUserById);

app.delete("/:id", handelDeleteUserById);
module.exports = app;
