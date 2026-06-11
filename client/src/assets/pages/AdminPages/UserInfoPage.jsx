import React from "react";
import { AuthContext } from "../../context/authContext"
import { useContext } from "react";
function UserInfoPage() {
    const { user } = useContext(AuthContext)
    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-6">

            <div className="max-w-[1600px] mx-auto space-y-6">

                {/* ==================== PROFILE HEADER ==================== */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 md:p-8 text-white shadow-xl">

                    <div className="flex flex-col lg:flex-row items-center gap-6">

                        {/* User Avatar */}
                        <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold border border-white/20">
                            {user?.fullName?.charAt(0)}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center lg:text-left">

                            <h1 className="text-3xl md:text-4xl font-bold">
                                {user?.fullName}
                            </h1>

                            <p className="text-white/80 mt-2">
                                {user?.email}
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">

                                <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm">
                                    {user?.role}
                                </span>

                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-medium ${user?.paymentStatus === "Paid"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                        }`}
                                >
                                    {user?.paymentStatus}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Header Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                            <p className="text-white/70 text-sm">
                                Room Number
                            </p>

                            <h3 className="text-xl font-bold mt-1">
                                {user?.roomNumber}
                            </h3>
                        </div>

                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                            <p className="text-white/70 text-sm">
                                Building
                            </p>

                            <h3 className="text-xl font-bold mt-1">
                                {user?.building}
                            </h3>
                        </div>

                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                            <p className="text-white/70 text-sm">
                                Monthly Rent
                            </p>

                            <h3 className="text-xl font-bold mt-1">
                                ₹ {user?.rentPrice}
                            </h3>
                        </div>

                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                            <p className="text-white/70 text-sm">
                                Members
                            </p>

                            <h3 className="text-xl font-bold mt-1">
                                {user?.member?.length || 0}
                            </h3>
                        </div>

                    </div>

                </div>

                {/* ==================== INFORMATION CARDS ==================== */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* ==================== PERSONAL DETAILS CARD ==================== */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">

                        <h2 className="text-xl font-bold text-slate-800 mb-6">
                            Personal Details
                        </h2>

                        <div className="space-y-4">

                            <InfoRow
                                label="Full Name"
                                value={user?.fullName}
                            />

                            <InfoRow
                                label="Email"
                                value={user?.email}
                            />

                            <InfoRow
                                label="Mobile Number"
                                value={user?.mobileNumber}
                            />

                            <InfoRow
                                label="Date Of Birth"
                                value={
                                    user?.dob
                                        ? new Date(user.dob).toLocaleDateString("en-IN")
                                        : "N/A"
                                }
                            />

                        </div>

                    </div>

                    {/* ==================== PROPERTY DETAILS CARD ==================== */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">

                        <h2 className="text-xl font-bold text-slate-800 mb-6">
                            Property Details
                        </h2>

                        <div className="space-y-4">

                            <InfoRow
                                label="Building Name"
                                value={user?.building}
                            />

                            <InfoRow
                                label="Room Number"
                                value={user?.roomNumber}
                            />

                            <InfoRow
                                label="Total Members"
                                value={user?.member?.length || 0}
                            />

                        </div>

                    </div>

                    {/* ==================== RENT INFORMATION CARD ==================== */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">

                        <h2 className="text-xl font-bold text-slate-800 mb-6">
                            Rent Information
                        </h2>

                        <div className="space-y-4">

                            <InfoRow
                                label="Monthly Rent"
                                value={`₹ ${user?.rentPrice}`}
                            />

                            <InfoRow
                                label="Payment Status"
                                value={user?.paymentStatus}
                            />

                        </div>

                    </div>

                    {/* ==================== ACCOUNT INFORMATION CARD ==================== */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">

                        <h2 className="text-xl font-bold text-slate-800 mb-6">
                            Account Information
                        </h2>

                        <div className="space-y-4">

                            <InfoRow
                                label="Role"
                                value={user?.role}
                            />

                            <InfoRow
                                label="User ID"
                                value={user?._id}
                            />

                            <InfoRow
                                label="Created At"
                                value={
                                    user?.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString("en-IN")
                                        : "N/A"
                                }
                            />

                            <InfoRow
                                label="Last Updated"
                                value={
                                    user?.updatedAt
                                        ? new Date(user.updatedAt).toLocaleDateString("en-IN")
                                        : "N/A"
                                }
                            />

                        </div>

                    </div>

                </div>

                {/* ==================== FAMILY MEMBERS CARD ==================== */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                        <h2 className="text-xl font-bold text-slate-800">
                            Family Members
                        </h2>

                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium w-fit">
                            {user?.member?.length || 0} Members
                        </span>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                        {user?.member?.map((member, index) => (

                            <div
                                key={index}
                                className="border border-slate-200 rounded-2xl p-4 hover:border-cyan-500 hover:shadow-md transition-all duration-300"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                                        {member?.fullName?.charAt(0)}
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-slate-800">
                                            {member?.fullName}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {member?.relation}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

const InfoRow = ({ label, value }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-slate-100 pb-3">

            <span className="text-slate-500 font-medium">
                {label}
            </span>

            <span className="text-slate-800 font-semibold break-all">
                {value || "N/A"}
            </span>

        </div>
    );
};

export default UserInfoPage;