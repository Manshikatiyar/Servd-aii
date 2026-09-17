const express = require("express");

const {
    createProviderProfile,
    getMyProviderProfile,
    updateProviderProfile,
    getProviderById,
    searchProviders
} = require("../controllers/providerController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create provider profile
router.post("/profile", authMiddleware, createProviderProfile);

// Get my provider profile
router.get("/profile", authMiddleware, getMyProviderProfile);

// Update my provider profile
router.put("/profile", authMiddleware, updateProviderProfile);
router.get("/search", searchProviders);
// Get provider by ID
router.get("/:id", getProviderById);
// Search and filter providers


module.exports = router;