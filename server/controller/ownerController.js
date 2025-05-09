const Owner = require("../model/ownerModel");
const {
  hashPassword,
  comparePassword,
} = require("../EncoderDecoder/passwordEncoderDecoder");
const { forgotPassword } = require("../auth/auth");

async function handelOwnerSignUp(req, res) {
  try {
    // Hash the password
    const encodedPassword = await hashPassword(req.body.password);
    req.body.password = encodedPassword;

    // Create the owner
    const owner = await Owner.create(req.body);
    return res
      .status(200)
      .json({ status: true, data: { id: owner._id, name: owner.name } });
  } catch (error) {
    console.error("Error in handelOwnerSignUp:", error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        status: false,
        message: "Email already exists. Please use a different email.",
      });
    }
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function handelOwnerLogin(req, res) {
  try {
    // find owner by email
    const owner = await Owner.findOne({
      email: req.body.email,
    });
    // if owner not found return error
    if (!owner) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // compare password
    const isMatch = await comparePassword(req.body.password, owner.password);
    // if password not match return error
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "password didn't match" });
    }
    // if agent found and password match return owner data and status true
    return res
      .status(200)
      .json({ status: true, data: { id: owner._id, name: owner.name } });
  } catch (error) {
    console.error("Error in handelOwnerLogin:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function handelGetAllOwner(req, res) {
  try {
    const owner = await Owner.find({});
    return res.status(200).json({ status: true, data: owner });
  } catch (error) {
    console.error("Error in handelGetAllOwner:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
}

async function handelOwnerForgotPassword(req, res) {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "Email is required" });
    }

    // Find the owner by email
    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(404).json({
        status: false,
        message: "Owner with this email does not exist",
      });
    }

    // Call the forgotPassword function
    const forgotPasswordMessage = await forgotPassword(email, Owner);
    return res.status(200).json({ message: forgotPasswordMessage });
  } catch (error) {
    console.error("Error in handelOwnerForgotPassword:", error); // Log the error for debugging
    return res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });
  }
}

async function handelOwnerChangePassword(req, res) {
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

    // Find the owner by email and resetToken
    const owner = await Owner.findOne({ email, resetToken });

    // If owner not found or token is invalid
    if (!owner) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or reset token",
      });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the owner's password and clear the reset token and expiry
    owner.password = hashedPassword;
    owner.resetToken = null;
    owner.resetTokenExpiry = null;

    // Save the updated owner
    await owner.save();

    return res.status(200).json({
      status: true,
      message: "Password has been changed successfully",
      data: owner,
    });
  } catch (error) {
    console.error("Error in handelOwnerChangePassword:", error); // Log the error for debugging
    return res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });
  }
}

const handelOwnerById = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res
        .status(400)
        .json({ status: false, message: "Owner not found" });
    }
    return res.status(200).json({ status: true, data: owner });
  } catch (error) {
    console.log("Error in handelOwnerId: ", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const handelUpdateOwnerById = async (req, res) => {
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
    const ownerId = req.params.id;
    const updatedOwner = await Owner.findByIdAndUpdate(ownerId, updateData, {
      new: true,
    });

    if (!updatedOwner) {
      return res
        .status(404)
        .json({ status: false, message: "Owner not found" });
    }
    return res.status(200).json({ status: true, data: updatedOwner });
  } catch (error) {
    console.log("Error in handelUpdateOwnerById: ", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const handelDeleteOwnerById = async (req, res) => {
  try {
    const ownerId = req.params.id;

    // Find the owner by ID and delete
    const deletedOwner = await Owner.findByIdAndDelete(ownerId);

    // If owner not found, return an error
    if (!deletedOwner) {
      return res
        .status(404)
        .json({ status: false, message: "Owner not found" });
    }

    // Return success response
    return res.status(200).json({
      status: true,
      message: "Owner deleted successfully",
      data: deletedOwner,
    });
  } catch (error) {
    console.error("Error in handelDeleteOwnerById:", error); // Log the error for debugging
    return res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });
  }
};

module.exports = {
  handelOwnerSignUp,
  handelOwnerLogin,
  handelGetAllOwner,
  handelOwnerForgotPassword,
  handelOwnerChangePassword,
  handelOwnerById,
  handelUpdateOwnerById,
  handelDeleteOwnerById,
};
