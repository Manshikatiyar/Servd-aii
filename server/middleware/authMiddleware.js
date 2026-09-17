const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Authorization header se token nikalo
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        // "Bearer TOKEN" mein se actual token nikalo
        const token = authHeader.split(" ")[1];

        // Token verify karo
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // User ki information request mein attach karo
        req.user = decoded;

        // Next middleware/controller par jao
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;