const Payment = require("../model/paymentModel");
const User = require("../model/userModel");
const Agent = require("../model/agentModel");
const Owner = require("../model/ownerModel");
const Property = require("../model/propertyModel");

// Process a payment
const processPayment = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      address,
      propertyId,
      amount,
      paymentMethod,
      transactionId,
      to,
      toModel,
      from,
      fromModel,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !contact ||
      !address ||
      !propertyId ||
      !amount ||
      !paymentMethod ||
      !transactionId ||
      !to ||
      !toModel ||
      !from ||
      !fromModel
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
      });
    }

    // Validate `toModel` and `fromModel`
    if (!["Owner", "Agent"].includes(toModel)) {
      return res.status(400).json({
        status: false,
        message: "Invalid toModel. Must be 'Owner' or 'Agent'.",
      });
    }

    if (!["User", "Agent"].includes(fromModel)) {
      return res.status(400).json({
        status: false,
        message: "Invalid fromModel. Must be 'User' or 'Agent'.",
      });
    }

    // Validate `to` reference
    let toEntity;
    if (toModel === "Owner") {
      toEntity = await Owner.findById(to);
    } else if (toModel === "Agent") {
      toEntity = await Agent.findById(to);
    }

    if (!toEntity) {
      return res.status(404).json({
        status: false,
        message: `No ${toModel} found with the provided ID.`,
      });
    }

    // Validate `from` reference
    let fromEntity;
    if (fromModel === "User") {
      fromEntity = await User.findById(from);
    } else if (fromModel === "Agent") {
      fromEntity = await Agent.findById(from);
    }

    if (!fromEntity) {
      return res.status(404).json({
        status: false,
        message: `No ${fromModel} found with the provided ID.`,
      });
    }

    // Validate property
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        status: false,
        message: "Property not found.",
      });
    }

    // Check if the transaction ID is unique
    const existingPayment = await Payment.findOne({ transactionId });
    if (existingPayment) {
      return res.status(400).json({
        status: false,
        message: "Transaction ID already exists.",
      });
    }

    // Create the payment
    const payment = new Payment({
      name,
      email,
      contact,
      address,
      propertyId,
      amount,
      paymentMethod,
      transactionId,
      to,
      toModel,
      from,
      fromModel,
    });

    await payment.save();

    if (
      property.acceptedCustomerId &&
      property.acceptedCustomerId.customer.toString() === from
    ) {
      property.acceptedCustomerId.paid = true;
      await property.save();
    }

    return res.status(201).json({
      status: true,
      message: "Payment processed successfully.",
      data: payment,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while processing the payment.",
    });
  }
};

const searchPayments = async (req, res) => {
  try {
    const { to, from, toModel, fromModel } = req.query;

    // Build the query object dynamically
    const query = {};

    // Use $or to handle multiple conditions
    if (to || from || toModel || fromModel) {
      query.$or = [];
      if (to) {
        query.$or.push({ to });
      }
      if (from) {
        query.$or.push({ from });
      }
      if (toModel) {
        if (!["Owner", "Agent"].includes(toModel)) {
          return res.status(400).json({
            status: false,
            message: "Invalid toModel. Must be 'Owner' or 'Agent'.",
          });
        }
        query.$or.push({ toModel });
      }
      if (fromModel) {
        if (!["User", "Agent"].includes(fromModel)) {
          return res.status(400).json({
            status: false,
            message: "Invalid fromModel. Must be 'User' or 'Agent'.",
          });
        }
        query.$or.push({ fromModel });
      }
    }

    // Search payments based on the query (or return all if no query is provided)
    const payments = await Payment.find(query).populate("to from propertyId");

    if (!payments || payments.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No payments found matching the criteria.",
      });
    }

    return res.status(200).json({
      status: true,
      data: payments,
    });
  } catch (error) {
    console.error("Error searching payments:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while searching for payments.",
    });
  }
};
module.exports = {
  processPayment,
  searchPayments,
};
