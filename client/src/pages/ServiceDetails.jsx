
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ServiceDetails() {
    const { id } = useParams();

    const [service, setService] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceResponse = await axios.get(
                    `http://localhost:5000/api/services/${id}`
                );

                setService(serviceResponse.data.service);

                const reviewResponse = await axios.get(
                    `http://localhost:5000/api/reviews/${id}`
                );

                setReviews(reviewResponse.data.reviews);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleReview = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            setReviewMessage("Please login to write a review");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/reviews",
                {
                    serviceId: id,
                    rating,
                    comment
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReviewMessage(response.data.message);
            setComment("");

            const reviewResponse = await axios.get(
                `http://localhost:5000/api/reviews/${id}`
            );

            setReviews(reviewResponse.data.reviews);

        } catch (error) {
            console.error(error);

            setReviewMessage(
                error.response?.data?.message ||
                "Failed to submit review"
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-lg text-gray-600">
                    Loading service...
                </p>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-3">
                        Service Not Found
                    </h1>

                    <p className="text-gray-500 mb-6">
                        The service you are looking for does not exist.
                    </p>

                    <Link
                        to="/services"
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Browse Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 md:px-10 py-10">

            <div className="max-w-6xl mx-auto">

                {/* ================= BREADCRUMB ================= */}

                <div className="mb-6 text-sm text-gray-500">
                    <Link
                        to="/services"
                        className="hover:text-gray-900"
                    >
                        Services
                    </Link>

                    <span className="mx-2">
                        /
                    </span>

                    <span>
                        {service.title}
                    </span>
                </div>


                {/* ================= MAIN SERVICE CARD ================= */}

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                    <div className="grid lg:grid-cols-3">

                        {/* Left / Main Content */}

                        <div className="lg:col-span-2 p-7 md:p-10">

                            <div className="flex flex-wrap items-center gap-3 mb-5">

                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {service.category}
                                </span>

                                {service.isActive && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Available
                                    </span>
                                )}

                            </div>


                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
                                {service.title}
                            </h1>


                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {service.description}
                            </p>


                            {/* Service Information */}

                            <div className="grid sm:grid-cols-2 gap-4">

                                <div className="border border-gray-200 rounded-xl p-5">
                                    <p className="text-sm text-gray-500 mb-1">
                                        Price
                                    </p>

                                    <p className="text-2xl font-bold">
                                        ₹{service.price}
                                    </p>
                                </div>


                                <div className="border border-gray-200 rounded-xl p-5">
                                    <p className="text-sm text-gray-500 mb-1">
                                        Duration
                                    </p>

                                    <p className="text-2xl font-bold">
                                        {service.duration} min
                                    </p>
                                </div>


                                <div className="border border-gray-200 rounded-xl p-5">
                                    <p className="text-sm text-gray-500 mb-1">
                                        Category
                                    </p>

                                    <p className="text-lg font-semibold">
                                        {service.category}
                                    </p>
                                </div>


                                <div className="border border-gray-200 rounded-xl p-5">
                                    <p className="text-sm text-gray-500 mb-1">
                                        Location
                                    </p>

                                    <p className="text-lg font-semibold">
                                        📍 {service.location}
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* Right Booking Card */}

                        <div className="bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 p-7 md:p-10 flex flex-col justify-center">

                            <p className="text-sm text-gray-500 mb-2">
                                Service Price
                            </p>

                            <p className="text-4xl font-bold mb-2">
                                ₹{service.price}
                            </p>

                            <p className="text-gray-500 mb-8">
                                {service.duration} minutes service
                            </p>


                            <Link
                                to={`/booking?serviceId=${service._id}`}
                                className="w-full text-center bg-gray-900 text-white py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition"
                            >
                                Book Now
                            </Link>


                            <p className="text-xs text-gray-500 text-center mt-4">
                                Secure booking through Servd AI
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= PROVIDER ================= */}

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8 mt-8">

                    <h2 className="text-2xl font-bold mb-6">
                        About the Provider
                    </h2>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                        <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-bold">
                            {service.provider?.businessName
                                ?.charAt(0)
                                ?.toUpperCase() || "P"}
                        </div>

                        <div>

                            <h3 className="text-xl font-bold">
                                {service.provider?.businessName ||
                                    "Service Provider"}
                            </h3>

                            {service.provider?.user?.name && (
                                <p className="text-gray-500 mt-1">
                                    Managed by {service.provider.user.name}
                                </p>
                            )}

                        </div>

                    </div>

                </div>


                {/* ================= REVIEW FORM ================= */}

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8 mt-8">

                    <h2 className="text-2xl font-bold mb-2">
                        Share Your Experience
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Tell other customers about your experience with this service.
                    </p>


                    <form
                        onSubmit={handleReview}
                        className="space-y-5"
                    >

                        {/* Rating */}

                        <div>

                            <label className="block font-semibold mb-2">
                                Rating
                            </label>

                            <select
                                value={rating}
                                onChange={(e) =>
                                    setRating(Number(e.target.value))
                                }
                                className="w-full sm:w-64 border border-gray-300 p-3 rounded-lg bg-white outline-none focus:ring-2 focus:ring-gray-900"
                            >

                                <option value="5">
                                    5 Stars ⭐⭐⭐⭐⭐
                                </option>

                                <option value="4">
                                    4 Stars ⭐⭐⭐⭐
                                </option>

                                <option value="3">
                                    3 Stars ⭐⭐⭐
                                </option>

                                <option value="2">
                                    2 Stars ⭐⭐
                                </option>

                                <option value="1">
                                    1 Star ⭐
                                </option>

                            </select>

                        </div>


                        {/* Comment */}

                        <div>

                            <label className="block font-semibold mb-2">
                                Comment
                            </label>

                            <textarea
                                value={comment}
                                onChange={(e) =>
                                    setComment(e.target.value)
                                }
                                placeholder="Write your review..."
                                required
                                rows="5"
                                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                            />

                        </div>


                        <button
                            type="submit"
                            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                        >
                            Submit Review
                        </button>

                    </form>


                    {reviewMessage && (
                        <div className="mt-5 bg-gray-100 px-4 py-3 rounded-lg">
                            <p className="font-semibold text-gray-700">
                                {reviewMessage}
                            </p>
                        </div>
                    )}

                </div>


                {/* ================= CUSTOMER REVIEWS ================= */}

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8 mt-8 mb-12">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">

                        <div>

                            <h2 className="text-2xl font-bold">
                                Customer Reviews
                            </h2>

                            <p className="text-gray-500 mt-1">
                                {reviews.length} review
                                {reviews.length !== 1 ? "s" : ""}
                            </p>

                        </div>

                    </div>


                    {reviews.length === 0 ? (

                        <div className="text-center py-10">

                            <div className="text-4xl mb-3">
                                ⭐
                            </div>

                            <h3 className="font-bold text-lg mb-2">
                                No reviews yet
                            </h3>

                            <p className="text-gray-500">
                                Be the first customer to review this service.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-6">

                            {reviews.map((review) => (

                                <div
                                    key={review._id}
                                    className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                                >

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">

                                        <div>

                                            <p className="font-bold">
                                                {review.customer?.name ||
                                                    "Customer"}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Customer review
                                            </p>

                                        </div>


                                        <p className="text-lg">
                                            {"⭐".repeat(review.rating)}
                                        </p>

                                    </div>


                                    <p className="text-gray-600 leading-relaxed">
                                        {review.comment}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ServiceDetails;

