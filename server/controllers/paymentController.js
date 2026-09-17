const crypto = require("crypto");
const Razorpay = require("razorpay");
const Booking = require("../models/Booking");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ===============================
// CREATE RAZORPAY ORDER
// ===============================
const createPaymentOrder = async (req, res) => {
    try {
        const { bookingId } = req.body;

        if (!bookingId) {
            return res.status(400).json({
                message: "Booking ID is required"
            });
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Sirf booking ka customer hi payment kar sakta hai
        if (booking.customer.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        const options = {
            amount: booking.totalAmount * 100,
            currency: "INR",
            receipt: `booking_${booking._id}`
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            message: "Payment order created successfully",
            order,
            keyId: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Payment order creation failed"
        });
    }
};

// ===============================
// VERIFY RAZORPAY PAYMENT
// ===============================
const verifyPayment = async (req, res) => {
    try {
        const {
            bookingId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (
            !bookingId ||
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                message: "Payment details are required"
            });
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Sirf booking ka customer payment verify kar sakta hai
        if (booking.customer.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        // Razorpay signature verify karna
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Invalid payment signature"
            });
        }

        // Payment successful
        booking.paymentStatus = "paid";

        await booking.save();

        res.status(200).json({
            message: "Payment verified successfully",
            paymentStatus: booking.paymentStatus
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Payment verification failed"
        });
    }
};

module.exports = {
    createPaymentOrder,
    verifyPayment
};