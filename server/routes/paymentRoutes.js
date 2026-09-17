const express = require("express");

const {
    createPaymentOrder,
    verifyPayment
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Razorpay order
router.post(
    "/create-order",
    authMiddleware,
    createPaymentOrder
);

// Verify Razorpay payment
router.post(
    "/verify",
    authMiddleware,
    verifyPayment
);

module.exports = router;