const User = require("../models/user");
const Service = require("../models/Service");
const Booking = require("../models/Booking");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            count: users.length,
            users
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
};

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find()
            .populate("provider", "businessName");

        res.status(200).json({
            count: services.length,
            services
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch services"
        });
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("customer", "name email")
            .populate("provider", "businessName")
            .populate("service", "title price");

        res.status(200).json({
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch bookings"
        });
    }
};

module.exports = {
    getAllUsers,
    getAllServices,
    getAllBookings
};