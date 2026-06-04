
import { useState } from "react";
import SearchBar from "../../components/adminDashboard/searchBar";
import UserCard from "../../components/adminDashboard/UserCard";
import TenantActions from "../../components/adminDashboard/TenantAction";


const AdminDashboard = () => {
    const [search, setSearch] = useState("");
    const placeholder = "search by email,mobileNumber or Name"



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