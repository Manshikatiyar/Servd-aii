
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import AI from "./pages/AI";
import Admin from "./pages/Admin";
import Provider from "./pages/Provider";


// ================= PROTECTED ROUTE =================

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}


// ================= ROLE PROTECTED ROUTE =================

function RoleRoute({ role, children }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
}


function App() {
    return (
        <BrowserRouter>

            {/* ================= NAVBAR ================= */}

            <nav className="bg-gray-900 text-white px-6 md:px-10 py-4">

                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="text-white text-2xl font-bold hover:text-gray-300 transition"
                    >
                        Servd AI
                    </Link>


                    {/* Navigation */}

                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base">

                        <Link
                            to="/"
                            className="text-white hover:text-gray-300 transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/services"
                            className="text-white hover:text-gray-300 transition"
                        >
                            Services
                        </Link>

                        <Link
                            to="/ai"
                            className="text-white hover:text-gray-300 transition"
                        >
                            AI Assistant
                        </Link>

                        <Link
                            to="/dashboard"
                            className="text-white hover:text-gray-300 transition"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/provider"
                            className="text-white hover:text-gray-300 transition"
                        >
                            Provider
                        </Link>

                        <Link
                            to="/admin"
                            className="text-white hover:text-gray-300 transition"
                        >
                            Admin
                        </Link>

                        <Link
                            to="/login"
                            className="text-white hover:text-gray-300 transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                        >
                            Register
                        </Link>

                    </div>

                </div>

            </nav>


            {/* ================= ROUTES ================= */}

            <Routes>

                {/* Public */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/services"
                    element={<Services />}
                />

                <Route
                    path="/services/:id"
                    element={<ServiceDetails />}
                />

                <Route
                    path="/ai"
                    element={<AI />}
                />


                {/* Logged-in users */}

                <Route
                    path="/booking"
                    element={
                        <ProtectedRoute>
                            <Booking />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Provider only */}

                <Route
                    path="/provider"
                    element={
                        <RoleRoute role="provider">
                            <Provider />
                        </RoleRoute>
                    }
                />


                {/* Admin only */}

                <Route
                    path="/admin"
                    element={
                        <RoleRoute role="admin">
                            <Admin />
                        </RoleRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;

