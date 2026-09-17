
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Services() {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/services"
                );

                setServices(response.data.services);
                setFilteredServices(response.data.services);

            } catch (err) {
                console.error(err);
                setError("Unable to load services");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Search + category filter
    useEffect(() => {
        const result = services.filter((service) => {

            const matchesSearch =
                service.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                service.description
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" ||
                service.category === category;

            return matchesSearch && matchesCategory;
        });

        setFilteredServices(result);

    }, [search, category, services]);

    // Categories dynamically services se niklenge
    const categories = [
        "All",
        ...new Set(services.map((service) => service.category))
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-xl text-gray-600">
                    Loading services...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-red-500 text-lg">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ================= HEADER ================= */}
            <section className="bg-gray-900 text-white px-6 md:px-10 py-14">

                <div className="max-w-6xl mx-auto text-center">

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Explore Services
                    </h1>

                    <p className="text-gray-300 text-lg">
                        Find the right professional service for your needs.
                    </p>

                </div>

            </section>


            {/* ================= SEARCH + FILTER ================= */}
            <section className="px-6 md:px-10 py-8">

                <div className="max-w-6xl mx-auto">

                    <div className="bg-white p-5 rounded-xl shadow-sm">

                        <div className="flex flex-col md:flex-row gap-4">

                            {/* Search */}
                            <div className="flex-1">

                                <input
                                    type="text"
                                    placeholder="Search for a service..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-gray-900"
                                />

                            </div>


                            {/* Category */}
                            <div className="md:w-56">

                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white outline-none focus:ring-2 focus:ring-gray-900"
                                >

                                    {categories.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    ))}

                                </select>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= SERVICES ================= */}
            <section className="px-6 md:px-10 pb-16">

                <div className="max-w-6xl mx-auto">

                    {/* Result count */}
                    <div className="flex justify-between items-center mb-6">

                        <p className="text-gray-600">
                            {filteredServices.length} service
                            {filteredServices.length !== 1 ? "s" : ""} found
                        </p>

                    </div>


                    {filteredServices.length === 0 ? (

                        <div className="bg-white rounded-xl p-12 text-center shadow-sm">

                            <div className="text-4xl mb-4">
                                🔍
                            </div>

                            <h2 className="text-xl font-bold mb-2">
                                No services found
                            </h2>

                            <p className="text-gray-500">
                                Try changing your search or category filter.
                            </p>

                        </div>

                    ) : (

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {filteredServices.map((service) => (

                                <div
                                    key={service._id}
                                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
                                >

                                    {/* Card Top */}
                                    <div className="p-6">

                                        <div className="flex justify-between items-start gap-3 mb-4">

                                            <h2 className="text-xl font-bold">
                                                {service.title}
                                            </h2>

                                            <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full whitespace-nowrap">
                                                {service.category}
                                            </span>

                                        </div>


                                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {service.description}
                                        </p>


                                        {/* Price */}
                                        <div className="flex items-center justify-between mb-3">

                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Starting from
                                                </p>

                                                <p className="text-2xl font-bold">
                                                    ₹{service.price}
                                                </p>
                                            </div>

                                            <div className="text-right">

                                                <p className="text-xs text-gray-500">
                                                    Duration
                                                </p>

                                                <p className="font-semibold">
                                                    {service.duration} min
                                                </p>

                                            </div>

                                        </div>


                                        {/* Location */}
                                        <p className="text-sm text-gray-500 mb-6">
                                            📍 {service.location}
                                        </p>


                                        {/* Button */}
                                        <Link
                                            to={`/services/${service._id}`}
                                            className="block text-center bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                                        >
                                            View Details
                                        </Link>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </section>

        </div>
    );
}

export default Services;

