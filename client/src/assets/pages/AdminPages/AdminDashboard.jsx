
import { useEffect, useState } from "react";
import SearchBar from "../../components/adminDashboard/searchBar";
import UserCard from "../../components/adminDashboard/UserCard";
import TenantActions from "../../components/adminDashboard/TenantAction";
import { getOneUser } from "../../api/authApi";
import toast from "react-hot-toast";


const AdminDashboard = () => {
    const [search, setSearch] = useState("");
    const [searchField, setSearchField] = useState("");
    let [tenantDetail, setTenantDetail] = useState("");
    let formData = {
        [searchField]: search
    };


    useEffect(() => {
        setSearch("")
    }, [searchField])

    console.log(formData)

    //  sending a API to finding a User By Name ,Email, MobileNumber
    async function sendApi() {

        try {
            const res = await getOneUser(formData);
            toast.success(res.data.message)
            setTenantDetail(res.data.user)
            setSearch("");

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <>
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

                <SearchBar props={{ search: search, setSearch: setSearch, searchField: searchField, setSearchField: setSearchField, handleSearch: sendApi }} />

                {/* Users Card */}

                {tenantDetail ? <UserCard user={tenantDetail} /> : ""}


                {/* All buttons */}
                <TenantActions />




            </div>
        </>
    );
};

export default AdminDashboard;