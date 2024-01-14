const express = require("express");
const router = express.Router();
const {
  get_seller_payments,
} = require("../../controllers/Payment/paymentController");

// GET request to retrieve seller payments
router.get("/payment/:sellerId", get_seller_payments);

module.exports = router;
