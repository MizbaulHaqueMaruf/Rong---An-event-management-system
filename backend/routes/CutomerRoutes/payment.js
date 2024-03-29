const express = require("express");
const router = express.Router();
const {
  sellerPay,
  rongPay,
  get_seller_payments,
} = require("../../controllers/Payment/paymentController");

//give money to seller
router.post("/payment/sellerPay", sellerPay);
//give money to platform
router.post("/payment/rongPay", rongPay);
// GET request to retrieve seller payments
// router.get("/seller/payments/:sellerId", get_seller_payments);

module.exports = router;
