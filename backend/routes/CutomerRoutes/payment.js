const express = require('express');
const router = express.Router();
const {sellerPay, rongPay} = require('../../controllers/Payment/paymentController');

//give money to seller
router.post('/payment/sellerPay', sellerPay);
//give money to platform
router.post('/payment/rongPay', rongPay);
module.exports = router;