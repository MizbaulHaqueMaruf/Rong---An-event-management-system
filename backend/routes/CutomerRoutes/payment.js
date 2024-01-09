const express = require('express');
const router = express.Router();
const {initiatePayment} = require('../../controllers/Payment/paymentController.js');
//initiate payment
router.get('/payment/init', initiatePayment);