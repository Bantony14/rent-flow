import {
    User,
    Mail,
    Phone,
    Home,
    Building2,
    Calendar,
    IndianRupee,
} from "lucide-react";

function ProfileCard({ tenant }) {
    const initials = tenant?.fullName
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const fields = [
        {
            icon: <User size={16} />,
            label: "Full Name",
            value: tenant?.fullName,
        },
        {
            icon: <Mail size={16} />,
            label: "Email",
            value: tenant?.email,
        },
        {
            icon: <Phone size={16} />,
            label: "Mobile",
            value: tenant?.mobileNumber,
        },
        {
            icon: <Building2 size={16} />,
            label: "Building",
            value: tenant?.building,
        },
        {
            icon: <Home size={16} />,
            label: "Room No.",
            value: tenant?.roomNumber,
        },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm p-3 h-full">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
                <div className="p-2 rounded-lg bg-blue-100">
                    <User size={18} className="text-blue-600" />
                </div>

                <div>
                    <h2 className="text-base font-semibold text-slate-800">
                        Tenant Profile
                    </h2>
                    <p className="text-xs text-slate-500">
                        Personal information
                    </p>
                </div>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                    {initials}
                </div>

                <h3 className="mt-3 font-semibold text-slate-800 text-center">
                    {tenant?.fullName}
                </h3>

                <p className="text-xs text-slate-500">
                    {tenant?.role}
                </p>
            </div>

            {/* Details */}
            <div className="space-y-3">
                {fields.map((field, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-50"
                    >
                        <div className="text-slate-500 mt-0.5">
                            {field.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-slate-500">
                                {field.label}
                            </p>

                            <p className="text-sm font-medium text-slate-800 break-words">
                                {field.value || "-"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfileCard;