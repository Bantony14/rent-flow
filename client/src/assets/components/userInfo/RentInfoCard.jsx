function RentInfoCard({ user, edit }) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">

            <h2 className="text-xl font-bold text-slate-800 mb-6">
                Rent Information
            </h2>

            <div className="space-y-4">

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-sm text-slate-500 sm:w-36 shrink-0">Monthly Rent</span>
                    {edit ? (
                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm text-slate-800 shrink-0">₹</span>
                            <input
                                type="number"
                                defaultValue={user?.rentPrice}
                                className="flex-1 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                placeholder="Rent Amount"
                            />
                        </div>
                    ) : (
                        <span className="text-sm font-medium text-slate-800">₹ {user?.rentPrice}</span>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-sm text-slate-500 sm:w-36 shrink-0">Payment Status</span>
                    {edit ? (
                        <select
                            defaultValue={user?.paymentStatus}
                            className="flex-1 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                        >
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                    ) : (
                        <span className={`text-sm font-medium px-3 py-1 rounded-full w-fit ${user?.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}>
                            {user?.paymentStatus}
                        </span>
                    )}
                </div>

            </div>

        </div>
    );
}

export default RentInfoCard;