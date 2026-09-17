const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ===============================
// REGISTER USER
// ===============================
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check karo koi field missing toh nahi hai
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check karo email already registered toh nahi hai
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Password ko hash karo
        const hashedPassword = await bcrypt.hash(password, 10);

        // New user create karo
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// LOGIN USER
// ===============================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check karo email/password missing toh nahi hai
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Email se user database mein find karo
        const user = await User.findOne({ email });

        // User nahi mila
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Entered password ko hashed password se compare karo
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        // Password wrong hai
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Login successful -> JWT token generate karo
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // Successful response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// EXPORT FUNCTIONS
// ===============================
module.exports = {
    registerUser,
    loginUser
};