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
import { getAllUser, updateUser } from "../../api/authApi";
import toast from "react-hot-toast";

export default function AllTenants() {
    const [alltenantDetails, setAlltenantDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editId, setEditId] = useState("")
    const [editData, setEditData] = useState({})


    useEffect(() => {
        const func = async () => {
            try {
                const res = await getAllUser();
                setAlltenantDetails(res.data.user);
            } catch (error) {
                console.log(error)
                console.log(error.response);
                console.log(error.response.data);
                toast.error(error?.response?.data?.message || "Failed to fetch users");
            } finally {
                setLoading(false)
            }
        };
        func();
    }, []);

    const handleChange = (e, id) => {

        setAlltenantDetails((prev) => {
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

    const sendApi = async (id) => {
        try {
            const res = await updateUser(id, editData);
            setEditData({})
            setEditId("")
            toast.success(res.data.message);


        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }



    }

    console.log("editData>>", editData)

    const filtered = alltenantDetails.filter((u) =>
        [u.fullName, u.email, u.mobileNumber, u.building, u.roomNumber]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    const totalUsers = alltenantDetails.length;
    const admins = alltenantDetails.filter((u) => u.role === "ADMIN").length;
    const tenants = alltenantDetails.filter((u) => u.role === "USER").length;


    return (

        <>

            {/* Header */}
            <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <p className="text-sm font-medium uppercase tracking-wider text-blue-100">
                            RentFlow Admin Panel
                        </p>

                        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                            User Management
                        </h1>

                        <p className="mt-2 text-blue-100">
                            Manage, monitor and control all registered users from one place.
                        </p>
                    </div>


                </div>
            </div>
            {/* total number of user */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">

                <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                    <p className="text-sm font-medium text-slate-500">
                        Total Users
                    </p>
                    <h1 className="mt-2 text-4xl font-bold text-slate-800">
                        {totalUsers}
                    </h1>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                    <p className="text-sm font-medium text-slate-500">
                        Total Tenants
                    </p>
                    <h1 className="mt-2 text-4xl font-bold text-blue-600">
                        {tenants}
                    </h1>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                    <p className="text-sm font-medium text-slate-500">
                        Total Admins
                    </p>
                    <h1 className="mt-2 text-4xl font-bold text-emerald-600">
                        {admins}
                    </h1>
                </div>

            </div>

            {/*searchQuery*/}


            <div className="relative w-full max-w-md">
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

            <thead>
                <tr className="bg-slate-100">
                    <th className="px-4 py-3 text-left">Tenant Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Mobile Number</th>
                    <th className="px-4 py-3 text-left">Building</th>
                    <th className="px-4 py-3 text-left">Room No.</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                </tr>

                {filtered.length === 0 ? <h1>user not found</h1> : filtered.map((value) => {
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
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        onChange={(e) => handleChange(e, value._id)}
                                    />
                                </td>

                                <td className="px-4 py-4">
                                    <input
                                        type="email"
                                        name="email"
                                        value={value.email}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        onChange={(e) => handleChange(e, value._id)}
                                    />
                                </td>

                                <td className="px-4 py-4">
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={value.mobileNumber}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        onChange={(e) => handleChange(e, value._id)}
                                    />
                                </td>

                                <td className="px-4 py-4">
                                    <select
                                        value={value.building}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
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
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        onChange={(e) => handleChange(e, value._id)}
                                    />
                                </td>

                                <td className="px-4 py-4">
                                    <select
                                        value={value.paymentStatus}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
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
                                        <button className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                            onClick={() => sendApi(value._id)}>
                                            Save
                                        </button>

                                        <button
                                            onClick={() => setEditId(null)}
                                            className="rounded-lg bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
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
                                <td className="px-4 py-4 font-medium text-slate-800">
                                    {value.fullName}
                                </td>

                                <td className="px-4 py-4 text-slate-600">
                                    {value.email}
                                </td>

                                <td className="px-4 py-4 text-slate-600">
                                    {value.mobileNumber}
                                </td>

                                <td className="px-4 py-4">
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                        {value.building}
                                    </span>
                                </td>

                                <td className="px-4 py-4 font-medium text-slate-700">
                                    {value.roomNumber}
                                </td>

                                <td className="px-4 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${value.paymentStatus === "Paid"
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
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )

                    );
                })}


            </thead>

        </>
    )

}