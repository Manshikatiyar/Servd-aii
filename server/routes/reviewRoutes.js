const express = require("express");

const {
    createReview,
    getServiceReviews
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create review
router.post("/", authMiddleware, createReview);

// Get reviews for a service
router.get("/:serviceId", getServiceReviews);

module.exports = router;