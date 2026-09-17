
import { useEffect, useState } from "react";
import axios from "axios";

function Provider() {
    const [profile, setProfile] = useState({
        businessName: "",
        bio: "",
        skills: "",
        experience: "",
        location: "",
        isAvailable: true
    });

    const [services, setServices] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const [newService, setNewService] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        duration: "",
        location: ""
    });

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // Provider profile load
    useEffect(() => {
        const loadData = async () => {
            try {
                const profileResponse = await axios.get(
                    "http://localhost:5000/api/providers/profile",
                    config
                );

                const data = profileResponse.data.provider;

                if (data) {
                    setProfile({
                        businessName: data.businessName || "",
                        bio: data.bio || "",
                        skills: data.skills?.join(", ") || "",
                        experience: data.experience || "",
                        location: data.location || "",
                        isAvailable: data.isAvailable ?? true
                    });
                }

                // Provider ki services
                const servicesResponse = await axios.get(
                    "http://localhost:5000/api/services",
                    config
                );

                const allServices = servicesResponse.data.services || [];

                setServices(
                    allServices.filter(
                        (service) =>
                            service.provider?._id === data?._id ||
                            service.provider === data?._id
                    )
                );

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            loadData();
        } else {
            setLoading(false);
        }
    }, []);

    // Profile update
    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                "http://localhost:5000/api/providers/profile",
                {
                    businessName: profile.businessName,
                    bio: profile.bio,
                    skills: profile.skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean),
                    experience: Number(profile.experience),
                    location: profile.location,
                    isAvailable: profile.isAvailable
                },
                config
            );

            setMessage(response.data.message || "Profile updated successfully");

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        }
    };

    // Create service
    const handleServiceSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/services",
                {
                    title: newService.title,
                    description: newService.description,
                    category: newService.category,
                    price: Number(newService.price),
                    duration: Number(newService.duration),
                    location: newService.location
                },
                config
            );

            setServices((prev) => [
                ...prev,
                response.data.service
            ]);

            setNewService({
                title: "",
                description: "",
                category: "",
                price: "",
                duration: "",
                location: ""
            });

            setMessage("Service created successfully");

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to create service"
            );
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <h1 className="text-2xl font-bold">
                    Please login first.
                </h1>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg text-gray-600">
                    Loading provider dashboard...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 md:px-10 py-10">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold mb-2">
                    Provider Dashboard
                </h1>

                <p className="text-gray-500 mb-8">
                    Manage your profile and services.
                </p>

                {message && (
                    <div className="bg-gray-900 text-white px-4 py-3 rounded-lg mb-8">
                        {message}
                    </div>
                )}


                {/* ================= PROFILE ================= */}

                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 mb-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Provider Profile
                    </h2>

                    <form
                        onSubmit={handleProfileSubmit}
                        className="grid md:grid-cols-2 gap-5"
                    >

                        <input
                            type="text"
                            placeholder="Business Name"
                            value={profile.businessName}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    businessName: e.target.value
                                })
                            }
                            required
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="text"
                            placeholder="Location"
                            value={profile.location}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    location: e.target.value
                                })
                            }
                            required
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="text"
                            placeholder="Skills (e.g. Cleaning, Plumbing)"
                            value={profile.skills}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    skills: e.target.value
                                })
                            }
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="number"
                            placeholder="Experience in years"
                            value={profile.experience}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    experience: e.target.value
                                })
                            }
                            required
                            className="border p-3 rounded-lg"
                        />

                        <textarea
                            placeholder="About your services"
                            value={profile.bio}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    bio: e.target.value
                                })
                            }
                            rows="4"
                            className="border p-3 rounded-lg md:col-span-2"
                        />

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={profile.isAvailable}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        isAvailable: e.target.checked
                                    })
                                }
                                className="w-4 h-4"
                            />

                            <span className="font-medium">
                                Available for bookings
                            </span>
                        </label>

                        <div className="md:col-span-2">

                            <button
                                type="submit"
                                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
                            >
                                Save Profile
                            </button>

                        </div>

                    </form>

                </div>


                {/* ================= CREATE SERVICE ================= */}

                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 mb-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Add New Service
                    </h2>

                    <form
                        onSubmit={handleServiceSubmit}
                        className="grid md:grid-cols-2 gap-5"
                    >

                        <input
                            type="text"
                            placeholder="Service Title"
                            value={newService.title}
                            onChange={(e) =>
                                setNewService({
                                    ...newService,
                                    title: e.target.value
                                })
                            }
                            required
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="text"
                            placeholder="Category"
                            value={newService.category}
                            onChange={(e) =>
                                setNewService({
                                    ...newService,
                                    category: e.target.value
                                })
                            }
                            required
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={newService.price}
                            onChange={(e) =>
                                setNewService({
                                    ...newService,
                                    price: e.target.value
                                })
                            }
                            required
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="number"
                            placeholder="Duration in minutes"
                            value={newService.duration}
                            onChange={(e) =>
                                setNewService({
                                    ...newService,
                                    duration: e.target.value
                                })
                            }
                            required
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="text"
                            placeholder="Service Location"
                            value={newService.location}
                            onChange={(e) =>
                                setNewService({
                                    ...newService,
                                    location: e.target.value
                                })
                            }
                            required
                            className="border p-3 rounded-lg"
                        />

                        <textarea
                            placeholder="Service Description"
                            value={newService.description}
                            onChange={(e) =>
                                setNewService({
                                    ...newService,
                                    description: e.target.value
                                })
                            }
                            required
                            rows="3"
                            className="border p-3 rounded-lg md:col-span-2"
                        />

                        <div className="md:col-span-2">

                            <button
                                type="submit"
                                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
                            >
                                Add Service
                            </button>

                        </div>

                    </form>

                </div>


                {/* ================= MY SERVICES ================= */}

                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        My Services
                    </h2>

                    {services.length === 0 ? (

                        <p className="text-gray-500">
                            You have not added any services yet.
                        </p>

                    ) : (

                        <div className="grid md:grid-cols-2 gap-5">

                            {services.map((service) => (

                                <div
                                    key={service._id}
                                    className="border border-gray-200 rounded-xl p-5"
                                >

                                    <div className="flex justify-between gap-3 mb-3">

                                        <h3 className="text-xl font-bold">
                                            {service.title}
                                        </h3>

                                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm h-fit">
                                            {service.category}
                                        </span>

                                    </div>

                                    <p className="text-gray-600 mb-4">
                                        {service.description}
                                    </p>

                                    <div className="flex justify-between text-sm text-gray-500">

                                        <span>
                                            ₹{service.price}
                                        </span>

                                        <span>
                                            {service.duration} min
                                        </span>

                                        <span>
                                            📍 {service.location}
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

export default Provider;

