const { GoogleGenAI } = require("@google/genai");
const Service = require("../models/Service");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const recommendServices = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({
                message: "Query is required"
            });
        }

        const services = await Service.find({
            isActive: true
        }).populate("provider", "businessName location");

        if (services.length === 0) {
            return res.status(404).json({
                message: "No services available"
            });
        }

        const serviceData = services.map((service) => ({
            id: service._id,
            title: service.title,
            description: service.description,
            category: service.category,
            price: service.price,
            duration: service.duration,
            location: service.location,
            provider: service.provider?.businessName
        }));

        const prompt = `
You are a service marketplace assistant.

User wants:
"${query}"

Available services:
${JSON.stringify(serviceData)}

Recommend the most relevant services.

Keep the response short and useful.
Mention service name, price, location and why it matches.
Do not invent services that are not in the provided list.
`;
const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt
});

res.status(200).json({
    message: "AI recommendation generated successfully",
    recommendation: interaction.output_text
});

    } catch (error) {
        console.error("Gemini Error:", error);

        res.status(500).json({
            message: "AI recommendation failed"
        });
    }
};

module.exports = {
    recommendServices
};