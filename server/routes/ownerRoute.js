const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const {
  handelOwnerSignUp,
  handelOwnerLogin,
  handelGetAllOwner,
  handelOwnerForgotPassword,
  handelOwnerChangePassword,
  handelOwnerById,
  handelUpdateOwnerById,
  handelDeleteOwnerById,
} = require("../controller/ownerController");

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

app.post("/signup", handelOwnerSignUp);

app.post("/login", handelOwnerLogin);

// gets all owner
// handle get request for owner
app.get("/", handelGetAllOwner);

app.get("/forgot-password", handelOwnerForgotPassword);

app.post("/changePassword", handelOwnerChangePassword);

app.get("/:id", handelOwnerById);

app.put("/:id", upload.single("profileImage"), handelUpdateOwnerById);

app.delete("/:id", handelDeleteOwnerById);

module.exports = app;
