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