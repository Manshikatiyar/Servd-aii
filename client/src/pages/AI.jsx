import { useState } from "react";
import axios from "axios";

function AI() {
    const [query, setQuery] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRecommend = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login first");
                return;
            }

            setLoading(true);
            setError("");
            setRecommendation("");

            const response = await axios.post(
                "http://localhost:5000/api/ai/recommend",
                { query },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRecommendation(response.data.recommendation);

        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "AI recommendation failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="max-w-2xl mx-auto">

                <h1 className="text-4xl font-bold text-center mb-3">
                    AI Service Assistant 🤖
                </h1>

                <p className="text-center text-gray-500 mb-10">
                    Tell us what service you need
                </p>

                <form
                    onSubmit={handleRecommend}
                    className="bg-white p-6 rounded-xl shadow"
                >
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Example: I need someone to clean my house"
                        required
                        rows="4"
                        className="w-full border p-3 rounded-lg mb-4"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold"
                    >
                        {loading
                            ? "Finding services..."
                            : "Get AI Recommendation"}
                    </button>
                </form>

                {error && (
                    <p className="text-red-500 text-center mt-5">
                        {error}
                    </p>
                )}

                {recommendation && (
                    <div className="bg-white p-6 rounded-xl shadow mt-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Recommended Services
                        </h2>

                        <p className="text-gray-700 whitespace-pre-line">
                            {recommendation}
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default AI;