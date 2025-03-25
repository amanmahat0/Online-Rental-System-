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
const app = express();

// Importing database connection
const database = require("./db_conn/db");

// ---------------Import Routes-------------------
// don't change the route path
// add more routes below this line
const userRoute = require("./routes/userRoute");
const agentRoute = require("./routes/agentRoute");
const adminRoute = require("./routes/adminRoute");

// Middle ware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", userRoute);
app.use("/api", agentRoute);
app.use("/api", adminRoute);

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

// start server
app.listen(5000, () => {
  console.log("server started on port 5000");
});
