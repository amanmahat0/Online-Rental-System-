// --------IMPORTING MONGOOSE PACKAGE--------
// --------DON'T CHANGE ANYTHING IN THIS FILE--------

// --------CONNECTING TO DATABASE--------
// --------DATABASE NAME: RentalSystemDB--------

const mongoose = require("mongoose");

// Connect to database
mongoose
  .connect(
    "mongodb+srv://amanshrestha903:cWQNhScdMGlv8TXY@rentaldb.8qh06.mongodb.net/RentalSystemDB?retryWrites=true&w=majority&appName=RentalDB"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = mongoose;
