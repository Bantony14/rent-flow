import { useNavigate } from "react-router-dom";


function TenantActions() {
    const navigate = useNavigate()
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 mb-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Tenant Management Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <button className="px-5 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg hover:scale-105 transition">
                    Add New Tenant
                </button>

                <button className="px-5 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition" onClick={() => { navigate("/alltenants") }}>
                    All Tenant
                </button>



                <button className="px-5 py-4 rounded-2xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition">
                    Find Tenant By Building
                </button>

                <button className="px-5 py-4 rounded-2xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition">
                    Find Tenant By Room No
                </button>

                <button className="px-5 py-4 rounded-2xl bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition">
                    Paid Tenants
                </button>

                <button className="px-5 py-4 rounded-2xl bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition">
                    Unpaid Tenants
                </button>




            </div>

        </div>
    );
}

export default TenantActions;