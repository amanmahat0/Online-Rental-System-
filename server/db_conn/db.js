// --------IMPORTING MONGOOSE PACKAGE--------
const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connectionString =
      "mongodb+srv://amanshrestha903:cWQNhScdMGlv8TXY@rentaldb.8qh06.mongodb.net/RentalSystemDB?retryWrites=true&w=majority&appName=RentalDB";
  }

  // Connect to the database
  async connect() {
    try {
      await mongoose.connect(this.connectionString);
      console.log("Connected to database!");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error; // Re-throw the error for better error handling
    }
  }

  // Get the mongoose instance
  getMongooseInstance() {
    return mongoose;
  }
}

module.exports = new Database();
