function PropertyDetails({ user, edit }) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">

            <h2 className="text-xl font-bold text-slate-800 mb-6">
                Property Details
            </h2>

            <div className="space-y-4">

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-sm text-slate-500 sm:w-36 shrink-0">Building Name</span>
                    {edit ? (
                        <input
                            type="text"
                            defaultValue={user?.building}
                            className="flex-1 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            placeholder="Building Name"
                        />
                    ) : (
                        <span className="text-sm font-medium text-slate-800">{user?.building}</span>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-sm text-slate-500 sm:w-36 shrink-0">Room Number</span>
                    {edit ? (
                        <input
                            type="text"
                            defaultValue={user?.roomNumber}
                            className="flex-1 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            placeholder="Room Number"
                        />
                    ) : (
                        <span className="text-sm font-medium text-slate-800">{user?.roomNumber}</span>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-sm text-slate-500 sm:w-36 shrink-0">Total Members</span>
                    <span className="text-sm font-medium text-slate-800">
                        {user?.member?.length || 0}
                    </span>
                </div>

            </div>

        </div>
    );
}

export default PropertyDetails;