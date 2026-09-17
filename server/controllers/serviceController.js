const Service = require("../models/Service");
const Provider = require("../models/Provider");

// ===============================
// CREATE SERVICE
// ===============================
const createService = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            price,
            duration,
            location
        } = req.body;

        if (
            !title ||
            !description ||
            !category ||
            price === undefined ||
            duration === undefined ||
            !location
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const provider = await Provider.findOne({
            user: req.user.userId
        });

        if (!provider) {
            return res.status(404).json({
                message: "Provider profile not found"
            });
        }

        const service = await Service.create({
            provider: provider._id,
            title,
            description,
            category,
            price,
            duration,
            location
        });

        res.status(201).json({
            message: "Service created successfully",
            service
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// GET ALL SERVICES
// ===============================
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({
            isActive: true
        }).populate({
            path: "provider",
            populate: {
                path: "user",
                select: "name email"
            }
        });

        res.status(200).json({
            count: services.length,
            services
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// GET SERVICE BY ID
// ===============================
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
            .populate({
                path: "provider",
                populate: {
                    path: "user",
                    select: "name email"
                }
            });

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.status(200).json({
            service
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// UPDATE SERVICE
// ===============================
const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        const provider = await Provider.findOne({
            user: req.user.userId
        });

        if (!provider || service.provider.toString() !== provider._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        const {
            title,
            description,
            category,
            price,
            duration,
            location,
            isActive
        } = req.body;

        if (title !== undefined) service.title = title;
        if (description !== undefined) service.description = description;
        if (category !== undefined) service.category = category;
        if (price !== undefined) service.price = price;
        if (duration !== undefined) service.duration = duration;
        if (location !== undefined) service.location = location;
        if (isActive !== undefined) service.isActive = isActive;

        await service.save();

        res.status(200).json({
            message: "Service updated successfully",
            service
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// DELETE SERVICE
// ===============================
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        const provider = await Provider.findOne({
            user: req.user.userId
        });

        if (!provider || service.provider.toString() !== provider._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await service.deleteOne();

        res.status(200).json({
            message: "Service deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};