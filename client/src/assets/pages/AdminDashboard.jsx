import { useState } from "react";

const AdminDashboard = () => {
    const [search, setSearch] = useState("");

    const user = {
        _id: "6a117401a76a103b1b5024aa",
        fullName: "Rahul Sharma",
        email: "rahul@example.com",
        mobileNumber: "9876543210",
        dob: "15 May 2002",
        roomNumber: "101",
        building: "Shivam Residency",
        role: "USER",
        rentPrice: 5000,
        paymentStatus: true,
        createdAt: "23 May 2026",
        updatedAt: "23 May 2026",
    };

    const users = [
        {
            _id: "1",
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            role: "Tenant",
        },
        {
            _id: "2",
            name: "Aman Verma",
            email: "aman@gmail.com",
            role: "Owner",
        },
        {
            _id: "3",
            name: "Raj Patel",
            email: "raj@gmail.com",
            role: "Admin",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800">
                        User Management
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage all platform users
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button className="px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg hover:scale-105 transition">
                        Get All Users
                    </button>

                    <button className="px-5 py-3 rounded-xl text-white font-semibold bg-green-600 shadow-lg hover:scale-105 transition">
                        Create User
                    </button>

                    <button className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 transition">
                        Refresh
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5 mb-6">
                <input
                    type="text"
                    placeholder="Search user by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 hover:shadow-2xl transition-all duration-300">

                <div className="flex items-center gap-4">

                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                        R
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-slate-800">
                            Rahul Sharma
                        </h2>

                        <p className="text-slate-500">
                            rahul@gmail.com
                        </p>

                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium">
                            Tenant
                        </span>
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-slate-500 text-sm">User ID</p>
                        <p className="font-semibold">#USR001</p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-slate-500 text-sm">Status</p>
                        <p className="font-semibold text-green-600">Active</p>
                    </div>

                </div>

                <div className="flex flex-wrap gap-3 mt-6">

                    <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold">
                        View Details
                    </button>

                    <button className="flex-1 py-3 rounded-xl bg-yellow-100 text-yellow-700 font-semibold">
                        Edit User
                    </button>

                    <button className="flex-1 py-3 rounded-xl bg-red-100 text-red-600 font-semibold">
                        Delete User
                    </button>

                </div>

            </div>






















            <div className="min-h-screen bg-slate-50 p-6">

                {/* ======================================
          BACK BUTTON
      ====================================== */}

                <button className="mb-6 px-4 py-2 bg-white rounded-xl shadow border">
                    ← Back To Users
                </button>

                {/* ======================================
          HERO SECTION
      ====================================== */}

                <div className="relative overflow-hidden rounded-3xl shadow-xl">

                    {/* Gradient Banner */}
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-cyan-500" />

                    {/* Profile Content */}
                    <div className="bg-white px-8 pb-8">

                        <div className="-mt-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                            {/* Avatar + User Info */}
                            <div className="flex items-center gap-5">

                                <div className="h-28 w-28 rounded-3xl bg-white border-4 border-white shadow-2xl flex items-center justify-center text-4xl font-bold text-cyan-600">
                                    RS
                                </div>

                                <div>
                                    <h1 className="text-3xl font-bold">
                                        {user.fullName}
                                    </h1>

                                    <p className="text-slate-500 mt-1">
                                        {user.email}
                                    </p>

                                    <div className="flex gap-2 mt-3">

                                        <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm">
                                            {user.role}
                                        </span>

                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                                            Active
                                        </span>

                                    </div>
                                </div>

                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">

                                <button className="px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-500">
                                    Edit User
                                </button>

                                <button className="px-5 py-3 rounded-xl bg-red-100 text-red-600 font-semibold">
                                    Delete User
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ======================================
          QUICK STATS
      ====================================== */}

                <div className="grid md:grid-cols-4 gap-5 mt-6">

                    <div className="bg-white rounded-2xl p-5 shadow-lg">
                        <p className="text-slate-500">Monthly Rent</p>
                        <h2 className="text-3xl font-bold">
                            ₹{user.rentPrice}
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-lg">
                        <p className="text-slate-500">Room Number</p>
                        <h2 className="text-3xl font-bold">
                            {user.roomNumber}
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-lg">
                        <p className="text-slate-500">Building</p>
                        <h2 className="font-bold">
                            {user.building}
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-lg">
                        <p className="text-slate-500">Payment</p>

                        <h2 className="font-bold text-green-600">
                            {user.paymentStatus ? "Paid" : "Pending"}
                        </h2>
                    </div>

                </div>

                {/* ======================================
          PERSONAL + RENTAL INFO
      ====================================== */}

                <div className="grid lg:grid-cols-2 gap-6 mt-6">

                    {/* Personal Information */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <h2 className="text-xl font-bold mb-5">
                            Personal Information
                        </h2>

                        <div className="space-y-4">

                            <div>
                                <p className="text-slate-500 text-sm">
                                    Full Name
                                </p>
                                <p className="font-semibold">
                                    {user.fullName}
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-500 text-sm">
                                    Email
                                </p>
                                <p className="font-semibold">
                                    {user.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-500 text-sm">
                                    Mobile Number
                                </p>
                                <p className="font-semibold">
                                    {user.mobileNumber}
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-500 text-sm">
                                    Date Of Birth
                                </p>
                                <p className="font-semibold">
                                    {user.dob}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Rental Information */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <h2 className="text-xl font-bold mb-5">
                            Rental Information
                        </h2>

                        <div className="space-y-4">

                            <div>
                                <p className="text-slate-500 text-sm">
                                    Building
                                </p>
                                <p className="font-semibold">
                                    {user.building}
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-500 text-sm">
                                    Room Number
                                </p>
                                <p className="font-semibold">
                                    {user.roomNumber}
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-500 text-sm">
                                    Rent Price
                                </p>
                                <p className="font-semibold">
                                    ₹{user.rentPrice}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* ======================================
          RECENT ACTIVITY
      ====================================== */}

                <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

                    <h2 className="text-xl font-bold mb-5">
                        Recent Activity
                    </h2>

                    <div className="space-y-4">

                        <div>● Rent Paid Successfully</div>
                        <div>● Room Assigned</div>
                        <div>● Account Created</div>

                    </div>

                </div>

                {/* ======================================
          ACCOUNT INFORMATION
      ====================================== */}

                <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

                    <h2 className="text-xl font-bold mb-5">
                        Account Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <p className="text-slate-500 text-sm">
                                User ID
                            </p>
                            <p className="font-semibold break-all">
                                {user._id}
                            </p>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Role
                            </p>
                            <p className="font-semibold">
                                {user.role}
                            </p>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Created At
                            </p>
                            <p className="font-semibold">
                                {user.createdAt}
                            </p>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Updated At
                            </p>
                            <p className="font-semibold">
                                {user.updatedAt}
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;