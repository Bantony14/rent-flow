import React, { useEffect, useState } from "react";
import {
    Search,
    Users,
    Mail,
    Phone,
    MapPin,
    Pencil,
    Trash2,
    Eye,
    Check,
    X,
} from "lucide-react";
import { deleteUser, getAllUser, updateUser } from "../../api/authApi";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/LoadingScreen";
import DeleteCard from "../../components/allTenantsdetails/DeleteCard";
import { useNavigate } from "react-router-dom";

export default function AllTenants() {
    const [alltenantDetails, setAlltenantDetails] = useState([]);
    const [formData, setFormData] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [editId, setEditId] = useState("")
    const [editData, setEditData] = useState({})
    const [loading, setLoading] = useState(true)
    const [deleteTenant, setDeleteTenant] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        const func = async () => {
            try {
                const res = await getAllUser();
                setAlltenantDetails(res.data.user);


            } catch (error) {
                toast.error(error?.response?.data?.message || "Failed to fetch users");
            }
            finally {
                setLoading(false)
            }

        };
        func();
    }, []);

    useEffect(() => {
        setFormData(structuredClone(alltenantDetails))
    }, [alltenantDetails])


    const handleChange = (e, id) => {

        setFormData((prev) => {
            return (
                prev.map((value) => (
                    value._id === id
                        ? { ...value, [e.target.name]: e.target.value }
                        : value
                )
                )
            )
        })

        setEditData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))

    }

    const handleCancel = () => {
        setFormData(structuredClone(alltenantDetails))
        setEditData({})
    }

    // This Api is for updating the data
    const sendApi = async (id) => {
        try {
            const res = await updateUser(id, editData);
            setAlltenantDetails(structuredClone(formData))
            setEditData({})
            setEditId("")
            toast.success(res.data.message);


        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }

    }

    // updating deleteTenants details
    const updateDeleteTenants = (id) => {
        const tenant = formData.filter((value) => value._id === id)
        setDeleteTenant(structuredClone(...tenant))
    }

    // removing deleteTenants card details

    const cancelDeleteTenants = () => setDeleteTenant("")

    // This Api is for deleting the data
    const deleteTenantApi = async (id) => {
        try {
            const res = await deleteUser(id)
            const updated = formData.filter(value => value._id !== id);
            setFormData(updated)
            setAlltenantDetails(updated)
            setDeleteTenant("")
            toast.success(res.data.message)
            console.log(res.data.message)


        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    console.log("editData>>", editData)
    console.log("formdata>>>>", formData)


    const filtered = formData.filter((u) =>
        [u.fullName, u.email, u.mobileNumber, u.building, u.roomNumber]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );



    const totalUsers = formData.length;
    const admins = formData.filter((u) => u.role === "ADMIN").length;
    const tenants = formData.filter((u) => u.role === "USER").length;

    console.log(deleteTenant)

    return (
        <>

            {deleteTenant ? <DeleteCard data={deleteTenant} onCancel={cancelDeleteTenants}
                onDelete={() => deleteTenantApi(deleteTenant._id)} /> : ""}

            <div className="p-4 sm:p-6 lg:p-8">

                {/* Header */}
                <div className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-5 sm:p-8 text-white shadow-lg">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-blue-100">
                                RentFlow Admin Panel
                            </p>

                            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">
                                User Management
                            </h1>

                            <p className="mt-2 text-sm sm:text-base text-blue-100">
                                Manage, monitor and control all registered users from one place.
                            </p>
                        </div>


                    </div>
                </div>

                {/* total number of user */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">

                    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-slate-200">
                        <p className="text-sm font-medium text-slate-500">
                            Total Users
                        </p>
                        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-800">
                            {totalUsers}
                        </h1>
                    </div>

                    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-slate-200">
                        <p className="text-sm font-medium text-slate-500">
                            Total Tenants
                        </p>
                        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-blue-600">
                            {tenants}
                        </h1>
                    </div>

                    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-slate-200">
                        <p className="text-sm font-medium text-slate-500">
                            Total Admins
                        </p>
                        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-emerald-600">
                            {admins}
                        </h1>
                    </div>

                </div>



                {/*searchQuery*/}
                <div className="relative w-full max-w-md mb-6">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-700 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {/* Data Table */}
                <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="px-4 py-3 text-left whitespace-nowrap">Tenant Name</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Email</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Mobile Number</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Building</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Room No.</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Status</th>
                                <th className="px-4 py-3 text-center whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? <tr>
                                <td colSpan={7} className="text-center py-8">
                                    <LoadingScreen />
                                </td>
                            </tr>

                                : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-slate-500 text-base">
                                            User not found
                                        </td>
                                    </tr>
                                ) : filtered.map((value) => {
                                    return (
                                        value._id === editId ? (
                                            <tr
                                                key={value._id}
                                                className="border-b border-slate-100 bg-slate-50"
                                            >
                                                <td className="px-4 py-4">
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        value={value.fullName}
                                                        className="w-full min-w-[120px] rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                                        onChange={(e) => handleChange(e, value._id)}
                                                    />
                                                </td>

                                                <td className="px-4 py-4">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={value.email}
                                                        className="w-full min-w-[160px] rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                                        onChange={(e) => handleChange(e, value._id)}
                                                    />
                                                </td>

                                                <td className="px-4 py-4">
                                                    <input
                                                        type="text"
                                                        name="mobileNumber"
                                                        value={value.mobileNumber}
                                                        className="w-full min-w-[120px] rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                                        onChange={(e) => handleChange(e, value._id)}
                                                    />
                                                </td>

                                                <td className="px-4 py-4">
                                                    <select
                                                        value={value.building}
                                                        className="w-full min-w-[130px] rounded-lg border border-slate-300 px-3 py-2"
                                                        name="building"
                                                        onChange={(e) => handleChange(e, value._id)}
                                                    >
                                                        <option>
                                                            {value.building}
                                                        </option>

                                                        <option>
                                                            {value.building === "Shivam Residency" ? "Krishna Tower" : "Shivam Residency"}
                                                        </option>
                                                    </select>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <input
                                                        type="text"
                                                        name="roomNumber"
                                                        value={value.roomNumber}
                                                        className="w-full min-w-[80px] rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                                        onChange={(e) => handleChange(e, value._id)}
                                                    />
                                                </td>

                                                <td className="px-4 py-4">
                                                    <select
                                                        value={value.paymentStatus}
                                                        className="w-full min-w-[90px] rounded-lg border border-slate-300 px-3 py-2"
                                                        name="paymentStatus"
                                                        onChange={(e) => handleChange(e, value._id)}
                                                    >
                                                        <option>
                                                            {value.paymentStatus}
                                                        </option>

                                                        <option>
                                                            {value.paymentStatus === "Paid" ? "Unpaid" : "Paid"}
                                                        </option>
                                                    </select>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex gap-2">
                                                        <button className="rounded-lg bg-green-600 px-3 py-2 text-xs sm:text-sm text-white hover:bg-green-700 whitespace-nowrap"
                                                            onClick={() => sendApi(value._id)}>
                                                            Save
                                                        </button>

                                                        <button
                                                            onClick={() => { setEditId(null), handleCancel() }}
                                                            className="rounded-lg bg-slate-500 px-3 py-2 text-xs sm:text-sm text-white hover:bg-slate-600 whitespace-nowrap"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr
                                                key={value._id}
                                                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                            >
                                                <td className="px-4 py-4 font-medium text-slate-800 whitespace-nowrap">
                                                    {value.fullName}
                                                </td>

                                                <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                                                    {value.email}
                                                </td>

                                                <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                                                    {value.mobileNumber}
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 whitespace-nowrap">
                                                        {value.building}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 font-medium text-slate-700 whitespace-nowrap">
                                                    {value.roomNumber}
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${value.paymentStatus === "Paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {value.paymentStatus}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="rounded-lg bg-sky-100 p-2 text-sky-600 hover:bg-sky-200"
                                                            onClick={() => navigate(`/viewtenantdetail/${value._id}`)}
                                                        >
                                                            <Eye size={18} />
                                                        </button>

                                                        <button
                                                            onClick={() => setEditId(value._id)}
                                                            className="rounded-lg bg-amber-100 p-2 text-amber-600 hover:bg-amber-200"
                                                        >
                                                            <Pencil size={18} />
                                                        </button>

                                                        <button
                                                            className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                                                            onClick={() => updateDeleteTenants(value._id)}
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )

                                    );
                                })}
                        </tbody>
                    </table>
                </div>

            </div>


        </>
    )

}