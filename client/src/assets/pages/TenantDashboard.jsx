
import RentDueCard from "../components/tenantDashboard/RentDueCard";
import NotificationsCard from "../components/tenantDashboard/NotificationCard";
import ProfileCard from "../components/tenantDashboard/ProfileCard";
import PaymentHistoryCard from "../components/tenantDashboard/PaymentHistoryCard";
import QuickActionsCard from "../components/tenantDashboard/QuickActionCard";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function TenantDashboard() {
    const { user } = useContext(AuthContext)
    console.log(user)
    return (

        <div className="min-h-screen bg-slate-100 font-sans">

            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-700 to-sky-500 px-6 py-8 pb-12">
                <p className="text-xs uppercase tracking-widest text-sky-200 mb-2 font-medium">
                    Tenant Portal
                </p>
                <h1 className="text-2xl sm:text-4xl font-bold text-white">
                    Welcome back, {user.fullName.split(" ")[0]}👋
                </h1>
                <p className="text-sky-100 mt-1 text-sm sm:text-base">
                    Manage your rent, receipts and profile in one place.
                </p>
            </section>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-4 pb-10 space-y-4">

                {/* Row 1 — Rent Due + Notifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Rent Due */}

                    <RentDueCard rentDue={user.rentPrice} />
                    {/* Notifications */}
                    <NotificationsCard />
                </div>

                {/* Row 2 — Profile + Payment History */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    {/* Profile */}
                    <ProfileCard name={user.fullName} email={user.email} phone={user.mobileNumber} room={user.roomNumber} />

                    {/* Payment History */}
                    <PaymentHistoryCard />
                </div>

                {/* Quick Actions */}
                <QuickActionsCard />

            </div>
        </div>
    );
}