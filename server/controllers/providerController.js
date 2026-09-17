const Provider = require("../models/Provider");

// Create provider profile
const createProviderProfile = async (req, res) => {
    try {
        const {
            businessName,
            bio,
            skills,
            experience,
            location,
            profileImage
        } = req.body;

        // Check required fields
        if (!businessName || !location) {
            return res.status(400).json({
                message: "Business name and location are required"
            });
        }

        // Check profile already exists
        const existingProvider = await Provider.findOne({
            user: req.user.userId
        });

        if (existingProvider) {
            return res.status(400).json({
                message: "Provider profile already exists"
            });
        }

        // Create provider profile
        const provider = await Provider.create({
            user: req.user.userId,
            businessName,
            bio,
            skills,
            experience,
            location,
            profileImage
        });

        res.status(201).json({
            message: "Provider profile created successfully",
            provider
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get logged-in provider profile
const getMyProviderProfile = async (req, res) => {
    try {
        const provider = await Provider.findOne({
            user: req.user.userId
        }).populate("user", "name email role");

        if (!provider) {
            return res.status(404).json({
                message: "Provider profile not found"
            });
        }

        res.status(200).json({
            provider
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Update provider profile
const updateProviderProfile = async (req, res) => {
    try {
        const provider = await Provider.findOne({
            user: req.user.userId
        });

        if (!provider) {
            return res.status(404).json({
                message: "Provider profile not found"
            });
        }

        const {
            businessName,
            bio,
            skills,
            experience,
            location,
            profileImage,
            isAvailable
        } = req.body;

        // Sirf jo fields bheji gayi hain unko update karo
        if (businessName !== undefined) {
            provider.businessName = businessName;
        }

        if (bio !== undefined) {
            provider.bio = bio;
        }

        if (skills !== undefined) {
            provider.skills = skills;
        }

        if (experience !== undefined) {
            provider.experience = experience;
        }

        if (location !== undefined) {
            provider.location = location;
        }

        if (profileImage !== undefined) {
            provider.profileImage = profileImage;
        }

        if (isAvailable !== undefined) {
            provider.isAvailable = isAvailable;
        }

        await provider.save();

        res.status(200).json({
            message: "Provider profile updated successfully",
            provider
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get any provider by ID
const getProviderById = async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id)
            .populate("user", "name email role");

        if (!provider) {
            return res.status(404).json({
                message: "Provider not found"
            });
        }

        res.status(200).json({
            provider
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
// Search and filter providers
const searchProviders = async (req, res) => {
    try {
        const { skill, location, isAvailable } = req.query;

        let filter = {};

        if (skill) {
            filter.skills = {
                $regex: skill,
                $options: "i"
            };
        }

        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        if (isAvailable !== undefined) {
            filter.isAvailable = isAvailable === "true";
        }

        const providers = await Provider.find(filter)
            .populate("user", "name email role");

        res.status(200).json({
            count: providers.length,
            providers
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createProviderProfile,
    getMyProviderProfile,
    updateProviderProfile,
    getProviderById,
     searchProviders
};