<div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <h2 className="text-xl font-bold text-slate-800">
            Family Members
        </h2>

        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium w-fit">
            {user?.member?.length || 0} Members
        </span>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {user?.member?.map((member, index) => (

            <div
                key={index}
                className="border border-slate-200 rounded-2xl p-4 hover:border-cyan-500 hover:shadow-md transition-all duration-300"
            >

                <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {member?.fullName?.charAt(0)}
                    </div>

                    <div>

                        <h3 className="font-semibold text-slate-800">
                            {member?.fullName}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {member?.relation}
                        </p>

                    </div>

                </div>

            </div>

        ))}

    </div>

</div>