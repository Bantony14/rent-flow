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