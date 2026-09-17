import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Booking() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const serviceId = searchParams.get("serviceId");

    const [bookingDate, setBookingDate] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleBooking = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            // 1. Booking create karo
            const bookingResponse = await axios.post(
                "http://localhost:5000/api/bookings",
                {
                    serviceId,
                    bookingDate,
                    address
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const booking = bookingResponse.data.booking;

            // Booking ID save karo
            localStorage.setItem(
                "latestBookingId",
                booking._id
            );

            // 2. Razorpay order create karo
            const paymentResponse = await axios.post(
                "http://localhost:5000/api/payments/create-order",
                {
                    bookingId: booking._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const order = paymentResponse.data.order;

            // 3. Razorpay checkout open karo
            const options = {
               key: paymentResponse.data.keyId,
                amount: order.amount,
                currency: order.currency,
                name: "Servd AI",
                description: "Service Booking",

                order_id: order.id,

                handler: async function (response) {
    try {
        // Razorpay payment ko backend par verify karo
        const verifyResponse = await axios.post(
            "http://localhost:5000/api/payments/verify",
            {
                bookingId: booking._id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(
            "Payment verified:",
            verifyResponse.data
        );

        setMessage(
            "Booking created and payment verified successfully!"
        );

        setTimeout(() => {
            navigate("/dashboard");
        }, 1500);

    } catch (error) {
        console.error("Payment verification error:", error);

        setMessage(
            error.response?.data?.message ||
            "Payment verification failed"
        );
    }
},

                prefill: {
                    name: JSON.parse(
                        localStorage.getItem("user")
                    )?.name || "",
                    email: JSON.parse(
                        localStorage.getItem("user")
                    )?.email || ""
                },

                theme: {
                    color: "#111827"
                }
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Booking or payment failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-8">
                    Book Service
                </h1>

                <form
                    onSubmit={handleBooking}
                    className="space-y-6"
                >
                    <div>
                        <label className="block font-semibold mb-2">
                            Booking Date & Time
                        </label>

                        <input
                            type="datetime-local"
                            value={bookingDate}
                            onChange={(e) =>
                                setBookingDate(e.target.value)
                            }
                            required
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">
                            Service Address
                        </label>

                        <textarea
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            placeholder="Enter your address"
                            required
                            rows="4"
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold"
                    >
                        {loading
                            ? "Processing..."
                            : "Confirm & Pay"}
                    </button>
                </form>

                {message && (
                    <p className="mt-6 text-center font-semibold">
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
}

export default Booking;