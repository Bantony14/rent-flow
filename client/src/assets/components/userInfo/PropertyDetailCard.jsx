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