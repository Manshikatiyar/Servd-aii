
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* ================= HERO SECTION ================= */}
            <section className="bg-gray-900 text-white px-6 md:px-10 py-20 md:py-28">

                <div className="max-w-6xl mx-auto text-center">

                    <div className="inline-block bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm mb-6">
                        Smart & Simple Service Marketplace
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        Find the Right Service.
                        <br />
                        Book with Confidence.
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Discover reliable service providers, get AI-powered
                        recommendations, and book services easily with Servd AI.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">

                        <Link
                            to="/services"
                            className="bg-white text-gray-900 px-7 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                        >
                            Explore Services
                        </Link>

                        <Link
                            to="/ai"
                            className="border border-gray-600 px-7 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                        >
                            Try AI Assistant
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= SERVICE CATEGORIES ================= */}
            <section className="px-6 md:px-10 py-16">

                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl font-bold text-center mb-3">
                        Services for Your Everyday Needs
                    </h2>

                    <p className="text-gray-600 text-center mb-10">
                        Find professionals for a variety of home and personal services.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <div className="text-3xl mb-3">🧹</div>
                            <h3 className="font-bold">Cleaning</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Home cleaning services
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <div className="text-3xl mb-3">🔧</div>
                            <h3 className="font-bold">Plumbing</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Plumbing & repairs
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="font-bold">Electrical</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Electrical services
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                            <div className="text-3xl mb-3">🎨</div>
                            <h3 className="font-bold">Painting</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Home painting services
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* ================= WHY SERVD ================= */}
            <section className="bg-white px-6 md:px-10 py-16">

                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl font-bold text-center mb-3">
                        Why Choose Servd AI?
                    </h2>

                    <p className="text-gray-600 text-center mb-10">
                        Everything you need to discover and book services in one place.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        <div className="p-7 rounded-xl border border-gray-200 hover:shadow-lg transition">

                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mb-5">
                                👨‍🔧
                            </div>

                            <h3 className="text-xl font-bold mb-3">
                                Professional Providers
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                Browse service providers with their skills,
                                experience, pricing, and availability.
                            </p>

                        </div>


                        {/* Card 2 */}
                        <div className="p-7 rounded-xl border border-gray-200 hover:shadow-lg transition">

                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mb-5">
                                📅
                            </div>

                            <h3 className="text-xl font-bold mb-3">
                                Easy Booking
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                Select a service, choose your preferred date,
                                provide your address, and book in a few simple steps.
                            </p>

                        </div>


                        {/* Card 3 */}
                        <div className="p-7 rounded-xl border border-gray-200 hover:shadow-lg transition">

                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mb-5">
                                ✨
                            </div>

                            <h3 className="text-xl font-bold mb-3">
                                AI Recommendations
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                Describe what you need in natural language and
                                get relevant service recommendations using AI.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}
            <section className="bg-gray-900 text-white px-6 py-16">

                <div className="max-w-4xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Find Your Service?
                    </h2>

                    <p className="text-gray-300 mb-8">
                        Explore available services and book a professional today.
                    </p>

                    <Link
                        to="/services"
                        className="inline-block bg-white text-gray-900 px-7 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                        Browse Services
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Home;

