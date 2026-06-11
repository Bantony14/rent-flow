import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext"
import { useContext } from "react";
import TenantProfileHeader from "../../components/userInfo/ProfileCard";
import PersonalDetails from "../../components/userInfo/PersonalDetailCard";
import PropertyDetails from "../../components/userInfo/PropertyDetailCard";
import RentInformation from "../../components/userInfo/RentInfoCard";
import UserAccountDetailCard from "../../components/userInfo/UserAccountDetailCard";
import RentInfoCard from "../../components/userInfo/RentInfoCard";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteUser, getUser, updateUser } from "../../api/authApi";
import ProfileCard from "../../components/userInfo/ProfileCard";
import { useNavigate } from "react-router-dom";
import DeleteCard from "../../components/allTenantsdetails/DeleteCard";
function UserInfoPage() {
    const { tenantid } = useParams()
    const [tenantDetail, setTenantDetail] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [formdata, setFormData] = useState();
    const [editdata, setEditData] = useState({});
    const [deleteTenant, setDeleteTenant] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        async function get() {
            try {
                const res = await getUser(tenantid);
                console.log(res)
                setTenantDetail(res.data.user)
                toast.success(res.data.message)


            } catch (error) {
                console.log(error.message)
                toast.error(error?.response?.data?.message)
            }
        }
        get();
    }, [])

    useEffect(() => {
        setFormData(structuredClone(tenantDetail))
    }, [tenantDetail])

    function editOn() {
        setIsEdit(!isEdit);
    }

    function handleChange(e) {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
        setEditData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    // sending api for updating the value of user
    async function sendApiForUpdate(id) {
        try {
            const res = await updateUser(id, editdata)
            toast.success(res.data.message);
            setTenantDetail(structuredClone(formdata))
            setEditData({})
            editOn(false)

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }



    function cancelUpdate() {
        setFormData(structuredClone(tenantDetail))
        setEditData({})
    }

    // updating deleteTenants details
    const updateDeleteTenants = () => {
        setDeleteTenant(structuredClone(tenantDetail))
    }

    // removing deleteTenants card details

    const cancelDeleteTenants = () => setDeleteTenant("")

    console.log("editdata>>>", editdata)

    // This Api is for deleting the data
    const deleteTenantApi = async (id) => {
        try {
            const res = await deleteUser(id)
            setDeleteTenant("")
            toast.success(res.data.message)
            console.log(res.data.message)
            navigate("/alltenants")



        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }


    return (

        <>
            {deleteTenant ? <DeleteCard data={deleteTenant} onCancel={cancelDeleteTenants}
                onDelete={() => deleteTenantApi(deleteTenant._id)} /> : ""}

            <div className="min-h-screen bg-slate-100 p-4 md:p-6">

                <div className="max-w-[1600px] mx-auto space-y-6">

                    {/* ==================== PROFILE HEADER ==================== */}

                    <ProfileCard user={formdata} edit={isEdit} onEditToggle={editOn}
                        onSave={() => sendApiForUpdate(formdata._id)} onCancel={cancelUpdate} onDelete={updateDeleteTenants} />

                    {/* ==================== INFORMATION CARDS ==================== */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                        {/* ==================== PERSONAL DETAILS CARD ==================== */}

                        <PersonalDetails user={formdata} edit={isEdit}
                            onChange={handleChange} />

                        {/* ==================== PROPERTY DETAILS CARD ==================== */}

                        <PropertyDetails user={formdata} edit={isEdit} onChange={handleChange} />
                        {/* ==================== RENT INFORMATION CARD ==================== */}
                        <RentInfoCard user={formdata} edit={isEdit} onChange={handleChange} />

                        {/* ==================== ACCOUNT INFORMATION CARD ==================== */}

                        <UserAccountDetailCard user={formdata} edit={isEdit} onChange={handleChange} />
                    </div>

                    {/* ==================== FAMILY MEMBERS CARD ==================== */}


                </div>

            </div>
        </>
    );
};



export default UserInfoPage;