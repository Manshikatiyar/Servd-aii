const express = require("express");

const {
    createBooking,
    getMyBookings,
    updateBookingStatus
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create booking
router.post("/", authMiddleware, createBooking);

// Get my bookings
router.get("/my", authMiddleware, getMyBookings);

// Update booking status
router.put("/:id/status", authMiddleware, updateBookingStatus);

module.exports = router;