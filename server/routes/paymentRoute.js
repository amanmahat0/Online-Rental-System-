const express = require("express");
const router = express.Router();
const {
  processPayment,
  searchPayments,
} = require("../controller/paymentController");

// Route to process a payment
router.post("/process", processPayment);

// Route to search payments by `to` and `from`
router.get("/search", searchPayments);

module.exports = router;
