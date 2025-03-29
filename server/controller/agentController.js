const Agent = require("../model/agentModel");
const {
  hashPassword,
  comparePassword,
} = require("../EncoderDecoder/passwordEncoderDecoder");
const { forgotPassword } = require("../auth/auth");

async function handelAgentSignUp(req, res) {
  try {
    const encodedPassword = await hashPassword(req.body.password);
    req.body.password = encodedPassword;
    const agent = await Agent.create(req.body);
    res.status(200).json({ status: true, data: agent });
  } catch (error) {
    console.error("Error in handelAgentSignUp:", error);
    res.status(500).json({ status: false, message: error });
  }
}

async function handelAgentLogin(req, res) {
  try {
    // find agent by email and password
    const agent = await Agent.findOne({
      email: req.body.email,
    });
    // if agent not found return error
    if (!agent) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // compare password
    const isMatch = await comparePassword(req.body.password, agent.password);
    // if password not match return error
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    // if agent found and password match return agent data and status true
    res.status(200).json({ status: true, data: agent });
  } catch (error) {
    console.error("Error in handelAgentLogin:", error);
    res.status(500).json({ status: false, message: error.message });
  }
}

async function handelGetAllAgent(req, res) {
  try {
    const agents = await Agent.find({});
    res.status(200).json({ status: true, data: agents });
  } catch (error) {
    console.error("Error in handelGetAllAgent:", error);
    res.status(500).json({ status: false, message: error.message });
  }
}

async function handelAgentForgotPassword(req, res) {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "Email is required" });
    }

    // Find the agent by email
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(404).json({
        status: false,
        message: "Agent with this email does not exist",
      });
    }

    // Call the forgotPassword function
    const forgotPasswordMessage = await forgotPassword(email, Agent);
    return res.status(200).json({ message: forgotPasswordMessage });
  } catch (error) {
    console.error("Error in handelAgentForgotPassword:", error); // Log the error for debugging
    return res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
    });
  }
}

async function handelAgentChangePassword(req, res) {
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

    // Find the agent by email and resetToken
    const agent = await Agent.findOne({ email, resetToken });

    // If agent not found or token is invalid
    if (!agent) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or reset token",
      });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the agent's password and clear the reset token and expiry
    agent.password = hashedPassword;
    agent.resetToken = null;
    agent.resetTokenExpiry = null;

    // Save the updated agent
    await agent.save();

    res.status(200).json({
      status: true,
      message: "Password has been changed successfully",
      data: agent,
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
  handelAgentSignUp,
  handelAgentLogin,
  handelGetAllAgent,
  handelAgentForgotPassword,
  handelAgentChangePassword,
};
