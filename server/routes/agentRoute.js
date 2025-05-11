const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

const {
  handelAgentSignUp,
  handelAgentLogin,
  handelGetAllAgent,
  handelAgentForgotPassword,
  handelAgentChangePassword,
  handelAgentById,
  handelUpdateAgentById,
  handelDeleteAgentById,
  handleSaveAndUnsaveProperties,
} = require("../controller/agentController");

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

// handle post request
// signup agent
app.post("/signup", handelAgentSignUp);

//login agent
app.post("/login", handelAgentLogin);

// gets all admin
// handle get request for admin
app.get("/", handelGetAllAgent);

app.post("/forgot-password", handelAgentForgotPassword);

app.post("/changePassword", handelAgentChangePassword);

app.get("/:id", handelAgentById);

app.put("/:id", upload.single("profileImage"), handelUpdateAgentById);

app.delete("/:id", handelDeleteAgentById);

app.post("/saveProperties", handleSaveAndUnsaveProperties);

module.exports = app;
