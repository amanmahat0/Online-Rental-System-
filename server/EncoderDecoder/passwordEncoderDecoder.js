const bcrypt = require("bcrypt");
const saltNumber = 10;

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltNumber);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log("Error hashing password: " + error);
  }
}

async function comparePassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log("Error comparing password: " + error);
  }
}

module.exports = { hashPassword, comparePassword };
