
import { useState } from "react";
import SearchBar from "../../components/adminDashboard/searchBar";
import UserCard from "../../components/adminDashboard/UserCard";
import TenantActions from "../../components/adminDashboard/TenantAction";


const AdminDashboard = () => {
    const [search, setSearch] = useState("");
    const placeholder = "search by email,mobileNumber or Name"

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

            {/* Good thought */}
            <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-xl">

                <h1 className="text-3xl md:text-4xl font-bold">
                    Welcome Back, Admin 👋
                </h1>

                <p className="mt-3 text-cyan-100 max-w-2xl">
                    Manage users, monitor activities, update records, and keep
                    your platform running smoothly from one centralized dashboard.
                </p>

            </div>

            {/* Search */}
            <SearchBar props={{ search: search, setSearch: setSearch, placeholder: placeholder }} />

            {/* All buttons */}
            <TenantActions />

            {/* Users Card */}

            <UserCard />


        </div>
    );
};

export default AdminDashboard;