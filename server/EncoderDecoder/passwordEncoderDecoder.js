const bcrypt = require("bcrypt");

class PasswordEncoderDecoder {
  constructor() {
    this.saltRounds = 10; // Number of salt rounds for hashing
  }

  // Hash a password
  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.log("Error hashing password: " + error);
      throw error; // Re-throw the error for better error handling
    }
  }

  // Compare a password with a hashed password
  async comparePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.log("Error comparing password: " + error);
      throw error; // Re-throw the error for better error handling
    }
  }
}

module.exports = new PasswordEncoderDecoder();
