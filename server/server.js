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

class Server {
  constructor() {
    this.app = express();
    this.port = 5000;
    this.configureMiddleware();
    this.configureRoutes();
    this.connectDatabase();
  }

  configureMiddleware() {
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ limit: "10mb", extended: true }));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    this.app.use(cors());
  }

  configureRoutes() {
    this.app.use("/api/user", userRoute);
    this.app.use("/api/agent", agentRoute);
    this.app.use("/api/admin", adminRoute);
    this.app.use("/api/owner", ownerRoute);
    this.app.use("/api/properties", propertyRoute);
  }

  async connectDatabase() {
    try {
      await database.connect();
      const mongoosesInstance = database.getMongooseInstance();
    } catch (error) {
      console.log("Failed to connect to the database:", error);
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`server started on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
