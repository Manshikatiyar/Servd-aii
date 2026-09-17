import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || user.role !== "admin") {
            setAccessDenied(true);
            return;
        }

        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const usersResponse = await axios.get(
                    "http://localhost:5000/api/admin/users",
                    config
                );

                const servicesResponse = await axios.get(
                    "http://localhost:5000/api/admin/services",
                    config
                );

                const bookingsResponse = await axios.get(
                    "http://localhost:5000/api/admin/bookings",
                    config
                );

                setUsers(usersResponse.data.users);
                setServices(servicesResponse.data.services);
                setBookings(bookingsResponse.data.bookings);

            } catch (error) {
                console.error(error);
            }
        };

        fetchAdminData();

    }, []);

    if (accessDenied) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">

                    <h1 className="text-3xl font-bold mb-4">
                        Access Denied
                    </h1>

                    <p className="text-gray-500 mb-6">
                        Admin access is required.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg"
                    >
                        Go Home
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-12">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold mb-10">
                    Admin Dashboard
                </h1>

                {/* Stats */}

                <div className="grid md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-gray-500">
                            Total Users
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {users.length}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-gray-500">
                            Total Services
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {services.length}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-gray-500">
                            Total Bookings
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {bookings.length}
                        </p>
                    </div>

                </div>

                {/* Users */}

                <div className="bg-white p-6 rounded-xl shadow mb-8">

                    <h2 className="text-2xl font-bold mb-5">
                        Users
                    </h2>

                    <div className="space-y-3">

                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="border-b pb-3 flex justify-between"
                            >
                                <span>{user.name}</span>

                                <span className="text-gray-500">
                                    {user.email}
                                </span>
                            </div>
                        ))}

                    </div>

                </div>

                {/* Services */}

                <div className="bg-white p-6 rounded-xl shadow mb-8">

                    <h2 className="text-2xl font-bold mb-5">
                        Services
                    </h2>

                    <div className="space-y-3">

                        {services.map((service) => (
                            <div
                                key={service._id}
                                className="border-b pb-3 flex justify-between"
                            >
                                <span className="font-semibold">
                                    {service.title}
                                </span>

                                <span>
                                    ₹{service.price}
                                </span>
                            </div>
                        ))}

                    </div>

                </div>

                {/* Bookings */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold mb-5">
                        Bookings
                    </h2>

                    <div className="space-y-3">

                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="border-b pb-3"
                            >
                                <p className="font-semibold">
                                    {booking.service?.title}
                                </p>

                                <p className="text-gray-500">
                                    Customer: {booking.customer?.name}
                                </p>

                                <p>
                                    Status: {booking.status}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Admin;