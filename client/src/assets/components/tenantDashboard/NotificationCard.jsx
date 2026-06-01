import { Bell, AlertCircle, FileText, CheckCircle } from "lucide-react";

const notifications = [
    {
        icon: <AlertCircle size={14} className="text-blue-600" />,
        text: "Rent due in 5 days",
    },
    {
        icon: <FileText size={14} className="text-blue-600" />,
        text: "New notice from landlord",
    },
    {
        icon: <CheckCircle size={14} className="text-green-600" />,
        text: "Maintenance completed",
    },
];

function NotificationsCard() {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <Bell size={18} className="text-amber-500" />
                <h2 className="text-sm font-semibold text-slate-800">Notifications</h2>
                <span className="ml-auto text-xs font-semibold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full">
                    {notifications.length} new
                </span>
            </div>
            <div className="space-y-2">
                {notifications.map((n, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 text-sm text-slate-700"
                    >
                        {n.icon} {n.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationsCard;