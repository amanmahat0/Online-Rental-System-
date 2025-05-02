const User = require("../model/userModel");
const Property = require("../model/propertyModel");
const {
  hashPassword,
  comparePassword,
} = require("../EncoderDecoder/passwordEncoderDecoder");
const { forgotPassword } = require("../auth/auth");

async function handleUserSignUp(req, res) {
  try {
    // encode password
    const encodedPassword = await hashPassword(req.body.password);
    // set password to encoded password
    req.body.password = encodedPassword;

    const user = await User.create(req.body);
    return res
      .status(200)
      .json({ status: true, data: { id: user._id, name: user.name } });
  } catch (error) {
    console.error("Error in handleSignUp:", error);
    return res.status(500).json({ status: false, message: error });
  }
}

async function handleUserLogin(req, res) {
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
    return res
      .status(200)
      .json({ status: true, data: { id: user._id, name: user.name } });
  } catch (error) {
    console.error("Error in handleLogin:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function handleGetAllUsers(req, res) {
  try {
    const users = await User.find({});
    return res.status(200).json({ status: true, data: users });
  } catch (error) {
    console.error("Error in handleGetAllUsers:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function handleUserForgotPassword(req, res) {
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
    console.error("Error in handleForgotPassword:", error); // Log the error for debugging
    res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });
  }
}

async function handleUserChangePassword(req, res) {
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
    console.error("Error in handleChangePassword:", error); // Log the error for debugging
    res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });
  }
}

const handleUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.log("Error in handleUserId: ", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const handleUpdateUserById = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // Convert "null" strings to real nulls for all fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === "null") {
        updateData[key] = null;
      }
    });

    if (req.file) {
      const imageUrl = `/uploads/profileImage/${req.file.filename}`;
      updateData.profileImage = imageUrl; // Update the image URL in the database
    }
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    return res.status(200).json({ status: true, data: updatedUser });
  } catch (error) {
    console.log("Error in handleUpdateUserById: ", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const handleDeleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    // If user not found, return an error
    if (!deletedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Return success response
    return res.status(200).json({
      status: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error in handleDeleteUserById:", error); // Log the error for debugging
    return res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });
  }
};

const handleSaveAndUnsaveProperties = async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

    console.log("User ID:", userId);
    console.log("Property ID:", propertyId);

    // Validate input
    if (!userId || !propertyId) {
      return res.status(400).json({
        status: false,
        message: "User ID and Property ID are required.",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    // Check if the property is already saved
    const isPropertySaved = user.saveProperties.includes(propertyId);

    if (isPropertySaved) {
      // If the property is already saved, remove it (unsave)
      user.saveProperties = user.saveProperties.filter(
        (id) => id !== propertyId
      );
      await user.save();
      return res.status(200).json({
        status: true,
        message: "Property unsaved successfully.",
        data: user,
      });
    } else {
      // If the property is not saved, add it
      user.saveProperties.push(propertyId);
      await user.save();
      return res.status(200).json({
        status: true,
        message: "Property saved successfully.",
        data: user,
      });
    }
  } catch (error) {
    console.error("Error in handleSaveAndUnsaveProperties:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while saving or unsaving the property.",
    });
  }
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleGetAllUsers,
  handleUserForgotPassword,
  handleUserChangePassword,
  handleUpdateUserById,
  handleUserById,
  handleDeleteUserById,
  handleSaveAndUnsaveProperties,
};
