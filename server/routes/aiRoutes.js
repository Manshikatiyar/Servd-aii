const express = require("express");

const {
    recommendServices
} = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// AI service recommendation
router.post(
    "/recommend",
    authMiddleware,
    recommendServices
);

module.exports = router;