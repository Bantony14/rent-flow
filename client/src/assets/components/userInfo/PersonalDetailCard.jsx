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