const express = require("express");

const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create service
router.post("/", authMiddleware, createService);

// Get all services
router.get("/", getAllServices);

// Get service by ID
router.get("/:id", getServiceById);

// Update service
router.put("/:id", authMiddleware, updateService);

// Delete service
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;