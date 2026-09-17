const express = require("express");

const {
    getAllUsers,
    getAllServices,
    getAllBookings
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    getAllUsers
);

router.get(
    "/services",
    authMiddleware,
    adminMiddleware,
    getAllServices
);

router.get(
    "/bookings",
    authMiddleware,
    adminMiddleware,
    getAllBookings
);

module.exports = router;