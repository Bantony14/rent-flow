import {
    User, Mail, Phone, Building2, Home,
    CreditCard, Calendar, IndianRupee, BadgeCheck,
    Users, CheckCircle, XCircle
} from "lucide-react";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

function TenantProfile() {
    const { user } = useContext(AuthContext);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "numeric", month: "long", year: "numeric",
        });

    // Generate initials from a name
    const getInitials = (name = "") =>
        name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    // Cycle avatar colors for members
    const avatarColors = [
        "bg-blue-100 text-blue-700",
        "bg-green-100 text-green-700",
        "bg-amber-100 text-amber-700",
        "bg-purple-100 text-purple-700",
        "bg-pink-100 text-pink-700",
    ];

    const Info = ({ icon, title, value, danger = false }) => (
        <div className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0 last:pb-0">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-xs text-slate-400">{title}</p>
                <p className={`text-sm font-medium break-all ${danger ? "text-red-500" : "text-slate-800"}`}>
                    {value}
                </p>
            </div>
        </div>
    );

    const MetricCard = ({ title, value, danger = false }) => (
        <div className="bg-slate-50 rounded-2xl p-4">
            <p className="text-xs text-slate-400 mb-1">{title}</p>
            <p className={`text-xl font-semibold ${danger ? "text-red-500" : "text-slate-800"}`}>
                {value}
            </p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-4">

                {/* ── Header Banner ── */}
                <div className="bg-blue-600 rounded-3xl p-6 text-white">
                    <div className="flex flex-col md:flex-row items-center gap-5">
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <img
                                src={user?.profileImage?.secure_url}
                                alt=""
                                className="w-25 h-30 rounded-full object-cover"
                            />
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-2xl font-bold">{user.fullName}</h1>
                            <p className="text-blue-200 text-sm mt-0.5">{user.email}</p>
                            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                                <span className="bg-white/20 text-blue-100 px-3 py-1 rounded-full text-xs font-medium">
                                    {user.role}
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${user.paymentStatus === "Paid"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {user.paymentStatus === "Paid"
                                        ? <CheckCircle size={12} />
                                        : <XCircle size={12} />}
                                    {user.paymentStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Personal + Property Info ── */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-3xl p-5 shadow-sm">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                            Personal Information
                        </p>
                        <Info icon={<Mail size={16} />} title="Email" value={user.email} />
                        <Info icon={<Phone size={16} />} title="Mobile Number" value={user.mobileNumber} />
                        <Info icon={<CreditCard size={16} />} title="Aadhaar Number" value={user.aadhaarNumber} />
                        <Info icon={<Calendar size={16} />} title="Date of Birth" value={formatDate(user.dob)} />
                        <Info icon={<Calendar size={16} />} title="Joining Date" value={formatDate(user.joiningDate)} />
                    </div>

                    <div className="bg-white rounded-3xl p-5 shadow-sm">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                            Property Information
                        </p>
                        <Info icon={<Building2 size={16} />} title="Building" value={user.building} />
                        <Info icon={<Home size={16} />} title="Room Number" value={user.roomNumber} />
                        <Info icon={<IndianRupee size={16} />} title="Monthly Rent" value={`₹${user.rentPrice}`} />
                        <Info
                            icon={<IndianRupee size={16} />}
                            title="Due Amount"
                            value={`₹${user.dueAmount}`}
                            danger={user.dueAmount > 0}
                        />
                        <Info icon={<BadgeCheck size={16} />} title="Last Rent Paid" value={`₹${user.lastRentAmount}`} />
                        <Info icon={<Calendar size={16} />} title="Next Rent Month" value={user.nextRentGeneratedMonth} />
                    </div>
                </div>

                {/* ── Rent Summary ── */}
                <div className="bg-white rounded-3xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Rent Summary
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <MetricCard title="Current Rent" value={`₹${user.rentPrice}`} />
                        <MetricCard title="Due Amount" value={`₹${user.dueAmount}`} danger={user.dueAmount > 0} />
                        <MetricCard title="Payment Status" value={user.paymentStatus} />
                    </div>
                </div>

                {/* ── Members ── */}
                <div className="bg-white rounded-3xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Members
                        </p>
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                            {user.member?.length ?? 0}
                        </span>
                    </div>

                    {user.member && user.member.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {user.member.map((member, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl"
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${avatarColors[index % avatarColors.length]
                                            }`}
                                    >
                                        {getInitials(member.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-800 truncate">
                                            {member.name}
                                        </p>
                                        <p className="text-xs text-slate-400">{member.relation}</p>
                                    </div>
                                    {member.age && (
                                        <span className="text-xs text-slate-400 flex-shrink-0">
                                            {member.age} yrs
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2 py-8 text-slate-400 bg-slate-50 rounded-2xl">
                            <Users size={18} />
                            <p className="text-sm">No members added</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default TenantProfile;