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