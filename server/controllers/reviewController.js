const Review = require("../models/Review");
const Service = require("../models/Service");

// ===============================
// CREATE REVIEW
// ===============================
const createReview = async (req, res) => {
    try {
        const {
            serviceId,
            rating,
            comment
        } = req.body;

        if (!serviceId || !rating || !comment) {
            return res.status(400).json({
                message: "Service, rating and comment are required"
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        // Same customer same service ko baar-baar review nahi de sakta
        const existingReview = await Review.findOne({
            customer: req.user.userId,
            service: serviceId
        });

        if (existingReview) {
            return res.status(400).json({
                message: "You have already reviewed this service"
            });
        }

        const review = await Review.create({
            customer: req.user.userId,
            service: serviceId,
            rating,
            comment
        });

        res.status(201).json({
            message: "Review created successfully",
            review
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// GET REVIEWS FOR SERVICE
// ===============================
const getServiceReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            service: req.params.serviceId
        })
            .populate("customer", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: reviews.length,
            reviews
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createReview,
    getServiceReviews
};