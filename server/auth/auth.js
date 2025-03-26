const nodemailer = require("nodemailer");

const forgotPassword = async (email, model) => {
  try {
    // Check if the user exists using a service or other model
    const user = await model.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Generate a 6-digit numeric reset token
    const resetToken = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
    const resetTokenExpiry = Date.now() + 60000; // Token valid for 1 minute

    // Save the token and expiry using the service or model
    if (await saveResetToken(email, resetToken, resetTokenExpiry, model)) {
      // Send the reset email
      const transporter = nodemailer.createTransport({
        service: "Gmail", // Use your email service
        auth: {
          user: "rentalsystem42@gmail.com", // Replace with your email
          pass: "ofhe xvbp hwcr hesf", // Replace with your email password
        },
      });

      const mailOptions = {
        to: email,
        from: "rentalsystem42@gmail.com",
        subject: "Password Reset Request",
        text: `You are receiving this because you (or someone else) have requested to reset your password.\n\n
                 Your password reset token is: ${resetToken}\n\n
                 This token is valid for 1 minute.\n\n
                 If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);

      return { message: "Password reset token sent to your email" };
    } else {
      return { message: "could not update the data" };
    }
  } catch (error) {
    console.error("Error in forgotPassword:", error); // Improved error logging
    throw new Error("An error occurred while processing the request");
  }
};

const saveResetToken = async (email, resetToken, resetTokenExpiry, model) => {
  try {
    // Use the provided model to save the reset token and expiry
    const user = await model.findOneAndUpdate(
      { email },
      { resetToken, resetTokenExpiry },
      { new: true }
    );
    return user ? true : false;
  } catch (error) {
    console.error(`Error saving reset token for email ${email}:`, error); // Improved error logging
    throw new Error("An error occurred while saving the reset token.");
  }
};

// Export the functions
module.exports = { forgotPassword, saveResetToken };
