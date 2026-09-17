const Booking = require("../models/Booking");
const Service = require("../models/Service");

// ===============================
// CREATE BOOKING
// ===============================
const createBooking = async (req, res) => {
    try {
        const {
            serviceId,
            bookingDate,
            address
        } = req.body;

        if (!serviceId || !bookingDate || !address) {
            return res.status(400).json({
                message: "Service, booking date and address are required"
            });
        }

        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        if (!service.isActive) {
            return res.status(400).json({
                message: "Service is not available"
            });
        }

        const booking = await Booking.create({
            customer: req.user.userId,
            provider: service.provider,
            service: service._id,
            bookingDate,
            address,
            totalAmount: service.price
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// GET MY BOOKINGS
// ===============================
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            customer: req.user.userId
        })
            .populate("service")
            .populate("provider");

        res.status(200).json({
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// UPDATE BOOKING STATUS
// ===============================
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "confirmed",
            "completed",
            "cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid booking status"
            });
        }

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        booking.status = status;

        await booking.save();

        res.status(200).json({
            message: "Booking status updated successfully",
            booking
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createBooking,
    getMyBookings,
    updateBookingStatus
};