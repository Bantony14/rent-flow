function TenantProfileHeader({ user, edit, onEditToggle, onDelete }) {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 md:p-8 text-white shadow-xl">


            {/* Top bar - Edit/Delete buttons */}
            <div className="flex justify-end gap-3 mb-6">

                {edit ? (
                    <button
                        onClick={onSave}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 transition"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={onEditToggle}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl text-sm font-semibold hover:bg-white/30 transition"
                    >
                        Edit
                    </button>
                )}

                {edit && (
                    <button
                        onClick={onEditToggle}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl text-sm font-semibold hover:bg-white/30 transition"
                    >
                        Cancel
                    </button>
                )}

                <button
                    onClick={onDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-semibold transition"
                >
                    Delete
                </button>

            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6">

                {/* User Avatar */}
                <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold border border-white/20 shrink-0">
                    {user?.fullName?.charAt(0)}
                </div>

                {/* User Info */}
                <div className="flex-1 w-full text-center lg:text-left">

                    <h1 className="text-3xl md:text-4xl font-bold">
                        {edit ? (
                            <input
                                type="text"
                                defaultValue={user?.fullName}
                                className="w-full bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-2 text-white placeholder-white/60 outline-none focus:border-white text-2xl md:text-3xl font-bold"
                                placeholder="Full Name"
                            />
                        ) : (
                            user?.fullName
                        )}
                    </h1>

                    <p className="text-white/80 mt-2">
                        {edit ? (
                            <input
                                type="email"
                                defaultValue={user?.email}
                                className="w-full bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-2 text-white placeholder-white/60 outline-none focus:border-white text-sm"
                                placeholder="Email"
                            />
                        ) : (
                            user?.email
                        )}
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
                    <p className="text-white/70 text-sm">Room Number</p>
                    <h3 className="text-xl font-bold mt-1">
                        {edit ? (
                            <input
                                type="text"
                                defaultValue={user?.roomNumber}
                                className="w-full bg-white/20 border border-white/40 rounded-lg px-3 py-1.5 text-white placeholder-white/60 outline-none focus:border-white text-base font-bold"
                                placeholder="Room No."
                            />
                        ) : (
                            user?.roomNumber
                        )}
                    </h3>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-white/70 text-sm">Building</p>
                    <h3 className="text-xl font-bold mt-1">
                        {edit ? (
                            <input
                                type="text"
                                defaultValue={user?.building}
                                className="w-full bg-white/20 border border-white/40 rounded-lg px-3 py-1.5 text-white placeholder-white/60 outline-none focus:border-white text-base font-bold"
                                placeholder="Building"
                            />
                        ) : (
                            user?.building
                        )}
                    </h3>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-white/70 text-sm">Monthly Rent</p>
                    <h3 className="text-xl font-bold mt-1">
                        {edit ? (
                            <div className="flex items-center gap-1">
                                <span className="shrink-0">₹</span>
                                <input
                                    type="number"
                                    defaultValue={user?.rentPrice}
                                    className="w-full bg-white/20 border border-white/40 rounded-lg px-3 py-1.5 text-white placeholder-white/60 outline-none focus:border-white text-base font-bold"
                                    placeholder="Rent"
                                />
                            </div>
                        ) : (
                            `₹ ${user?.rentPrice}`
                        )}
                    </h3>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-white/70 text-sm">Members</p>
                    <h3 className="text-xl font-bold mt-1">
                        {user?.member?.length || 0}
                    </h3>
                </div>

            </div>

        </div>
    );
}

export default TenantProfileHeader;