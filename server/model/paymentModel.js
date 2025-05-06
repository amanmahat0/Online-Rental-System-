const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["esewa", "khalti", "bank"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "toModel",
      required: true,
    },
    toModel: {
      type: String,
      enum: ["Owner", "Agent"],
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "fromModel",
      required: true,
    },
    fromModel: {
      type: String,
      enum: ["User", "Agent"],
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
