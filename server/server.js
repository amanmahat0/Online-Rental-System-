//---------------------IMPORTANT NOTE----------------------
// This is the core file of the server
// This file is responsible for starting the server
// This file is responsible for handling all the requests
// Do not change the file name or the location of the file
// Do not remove the required modules
// Do not remove the database connection code
// Don't remove routes it is required for the server to work

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

// Importing database connection
const database = require("./db_conn/db");

// ---------------Import Routes-------------------
const userRoute = require("./routes/userRoute");
const agentRoute = require("./routes/agentRoute");
const adminRoute = require("./routes/adminRoute");
const ownerRoute = require("./routes/ownerRoute");
const propertyRoute = require("./routes/propertyRoute");
const paymentRoute = require("./routes/paymentRoute");

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Enable CORS
app.use(cors());

// Routes
app.use("/api/user", userRoute);
app.use("/api/agent", agentRoute);
app.use("/api/admin", adminRoute);
app.use("/api/owner", ownerRoute);
app.use("/api/properties", propertyRoute);
app.use("/api/payment", paymentRoute);

// Start server
app.listen(5000, () => {
  console.log("server started on port 5000");
});
