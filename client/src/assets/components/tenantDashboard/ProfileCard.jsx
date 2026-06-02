import { User, Mail, Phone, Home } from "lucide-react";

const profileData = {
    initials: "RS",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    room: "Room A-204",
};

function ProfileCard({ name, email, phone, room }) {
    const fields = [
        { icon: <User size={14} />, label: name },
        { icon: <Mail size={14} />, label: email },
        { icon: <Phone size={14} />, label: phone },
        { icon: <Home size={14} />, label: room },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <User size={18} className="text-blue-600" />
                <h2 className="text-sm font-semibold text-slate-800">Profile</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-base mx-auto mb-4">
                {profileData.initials}
            </div>
            {fields.map((r, i) => (
                <div
                    key={i}
                    className="flex items-center gap-2.5 py-2 border-b border-slate-100 last:border-0 text-sm text-slate-600"
                >
                    <span className="text-slate-400">{r.icon}</span> {r.label}
                </div>
            ))}
        </div>
    );
}

export default ProfileCard;