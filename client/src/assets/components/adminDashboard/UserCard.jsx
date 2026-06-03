function UserCard({
    name,
    email,
    role,
    userId,
    status,
    onView,
    onEdit,
    onDelete,
}) {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 hover:shadow-2xl transition-all duration-300">

            <div className="flex items-center gap-4">

                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                    {name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-800">
                        {name}
                    </h2>

                    <p className="text-slate-500">
                        {email}
                    </p>

                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium">
                        {role}
                    </span>
                </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-slate-500 text-sm">User ID</p>
                    <p className="font-semibold">{userId}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-slate-500 text-sm">Status</p>
                    <p className="font-semibold text-green-600">
                        {status}
                    </p>
                </div>

            </div>

            <div className="flex flex-wrap gap-3 mt-6">

                <button
                    onClick={onView}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold"
                >
                    View Details
                </button>

                <button
                    onClick={onEdit}
                    className="flex-1 py-3 rounded-xl bg-yellow-100 text-yellow-700 font-semibold"
                >
                    Edit User
                </button>

                <button
                    onClick={onDelete}
                    className="flex-1 py-3 rounded-xl bg-red-100 text-red-600 font-semibold"
                >
                    Delete User
                </button>

            </div>

        </div>
    );
}

export default UserCard;