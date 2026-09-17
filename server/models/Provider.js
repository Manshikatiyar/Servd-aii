const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        businessName: {
            type: String,
            required: true,
            trim: true
        },

        bio: {
            type: String,
            trim: true
        },

        skills: [
            {
                type: String,
                trim: true
            }
        ],

        experience: {
            type: Number,
            default: 0
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        profileImage: {
            type: String,
            default: ""
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Provider = mongoose.model("Provider", providerSchema);

module.exports = Provider;