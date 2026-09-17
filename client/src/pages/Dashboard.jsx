
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login to view your dashboard.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    "http://localhost:5000/api/bookings/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setBookings(response.data.bookings);

            } catch (err) {
                console.error(err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load bookings"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-lg text-gray-600">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
                <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md">

                    <h1 className="text-2xl font-bold mb-3">
                        Unable to Load Dashboard
                    </h1>

                    <p className="text-red-500 mb-6">
                        {error}
                    </p>

                    <Link
                        to="/login"
                        className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Login
                    </Link>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 md:px-10 py-10">

            <div className="max-w-6xl mx-auto">

                {/* Header */}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">

                    <div>
                        <p className="text-sm text-gray-500 mb-1">
                            Welcome back
                        </p>

                        <h1 className="text-4xl font-bold">
                            My Dashboard
                        </h1>
                    </div>

                    <Link
                        to="/services"
                        className="bg-gray-900 text-white px-5 py-3 rounded-lg font-semibold hover:bg-gray-800 transition text-center"
                    >
                        Browse Services
                    </Link>

                </div>


                {/* Stats */}

                <div className="grid sm:grid-cols-3 gap-5 mb-10">

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-500 text-sm">
                            Total Bookings
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            {bookings.length}
                        </p>
                    </div>


                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-500 text-sm">
                            Pending
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            {
                                bookings.filter(
                                    (booking) =>
                                        booking.status === "pending"
                                ).length
                            }
                        </p>
                    </div>


                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-500 text-sm">
                            Completed
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            {
                                bookings.filter(
                                    (booking) =>
                                        booking.status === "completed"
                                ).length
                            }
                        </p>
                    </div>

                </div>


                {/* Bookings */}

                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        My Bookings
                    </h2>


                    {bookings.length === 0 ? (

                        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">

                            <div className="text-4xl mb-4">
                                📅
                            </div>

                            <h3 className="text-xl font-bold mb-2">
                                No Bookings Yet
                            </h3>

                            <p className="text-gray-500 mb-6">
                                Your booked services will appear here.
                            </p>

                            <Link
                                to="/services"
                                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold"
                            >
                                Explore Services
                            </Link>

                        </div>

                    ) : (

                        <div className="space-y-5">

                            {bookings.map((booking) => (

                                <div
                                    key={booking._id}
                                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                                >

                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                                        <div>

                                            <h3 className="text-xl font-bold mb-2">
                                                {booking.service?.title ||
                                                    "Service"}
                                            </h3>

                                            <p className="text-gray-600 mb-1">
                                                Provider:{" "}
                                                <span className="font-medium">
                                                    {booking.provider?.businessName ||
                                                        "Provider"}
                                                </span>
                                            </p>

                                            <p className="text-gray-600">
                                                Date:{" "}
                                                {new Date(
                                                    booking.bookingDate
                                                ).toLocaleString()}
                                            </p>

                                        </div>


                                        <div className="md:text-right">

                                            <p className="text-2xl font-bold">
                                                ₹{booking.totalAmount}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Booking amount
                                            </p>

                                        </div>

                                    </div>


                                    {/* Status */}

                                    <div className="border-t border-gray-200 mt-5 pt-5 flex flex-wrap gap-3">

                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                            Status:{" "}
                                            <span className="font-semibold">
                                                {booking.status}
                                            </span>
                                        </span>


                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                booking.paymentStatus === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            Payment:{" "}
                                            <span className="font-semibold">
                                                {booking.paymentStatus}
                                            </span>
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;

