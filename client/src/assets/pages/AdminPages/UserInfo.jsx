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
import { getUser } from "../../api/authApi";
function UserInfoPage() {
    const { tenantid } = useParams()
    const [user, setUser] = useState(null)


    useEffect(() => {
        async function get() {
            try {
                const res = await getUser(tenantid);
                console.log(res)
                setUser(res.data.user)
                toast.success(res.data.message)


            } catch (error) {
                console.log(error.message)
                toast.error(error?.response?.data?.message)
            }
        }
        get();
    }, [])


    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-6">

            <div className="max-w-[1600px] mx-auto space-y-6">

                {/* ==================== PROFILE HEADER ==================== */}

                <TenantProfileHeader user={user} />

                {/* ==================== INFORMATION CARDS ==================== */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* ==================== PERSONAL DETAILS CARD ==================== */}

                    <PersonalDetails user={user} />

                    {/* ==================== PROPERTY DETAILS CARD ==================== */}

                    <PropertyDetails user={user} />
                    {/* ==================== RENT INFORMATION CARD ==================== */}
                    <RentInfoCard user={user} />

                    {/* ==================== ACCOUNT INFORMATION CARD ==================== */}

                    <UserAccountDetailCard user={user} />
                </div>

                {/* ==================== FAMILY MEMBERS CARD ==================== */}


            </div>

        </div>
    );
};



export default UserInfoPage;