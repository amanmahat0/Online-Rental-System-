const User = require("../model/userModel");
const {
  hashPassword,
  comparePassword,
} = require("../EncoderDecoder/passwordEncoderDecoder");
const { forgotPassword } = require("../auth/auth");

async function handelUserSignUp(req, res) {
  try {
    // encode password
    const encodedPassword = await hashPassword(req.body.password);
    // set password to encoded password
    req.body.password = encodedPassword;

    const user = await User.create(req.body);
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error in handelSignUp:", error);
    return res.json({ status: false, message: error });
  }
}

async function handelUserLogin(req, res) {
  try {
    // find user by email and password
    const user = await User.findOne({
      email: req.body.email,
    });
    // if user not found return error
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // compare password
    const isMatch = await comparePassword(req.body.password, user.password);
    // if password not match return error
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // if user found return user data and status true
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error in handelLogin:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function handelGetAllUsers(req, res) {
  try {
    const users = await User.find({});
    return res.status(200).json({ status: true, data: users });
  } catch (error) {
    console.error("Error in handelGetAllUsers:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function handelUserForgotPassword(req, res) {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "Email is required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User with this email does not exist",
      });
    }

    // Call the forgotPassword function
    const forgotPasswordMessage = await forgotPassword(email, User);
    res.status(200).json({ message: forgotPasswordMessage });
  } catch (error) {
    console.error("Error in handelForgotPassword:", error); // Log the error for debugging
    res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });
  }
}

async function handelUserChangePassword(req, res) {
  try {
    const { email, resetToken, newPassword } = req.body;
    console.log(email, resetToken, newPassword);

    // Validate input
    if (!email || !resetToken || !newPassword) {
      return res.status(400).json({
        status: false,
        message: "Email, reset token, and new password are required",
      });
    }

    // Find the user by email and resetToken
    const user = await User.findOne({ email, resetToken });

    // If user not found or token is invalid
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or reset token",
      });
    }

    // Hash the new passworUserd
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password and clear the reset token and expiry
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    // Save the updated user
    await user.save();

    res.status(200).json({
      status: true,
      message: "Password has been changed successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in handelChangePassword:", error); // Log the error for debugging
    res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });
  }
}
module.exports = {
  handelUserSignUp,
  handelUserLogin,
  handelGetAllUsers,
  handelUserForgotPassword,
  handelUserChangePassword,
};
