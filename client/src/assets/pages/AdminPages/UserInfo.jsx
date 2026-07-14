import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import TenantProfileHeader from "../../components/userInfo/ProfileCard";
import PersonalDetails from "../../components/userInfo/PersonalDetailCard";
import PropertyDetails from "../../components/userInfo/PropertyDetailCard";
import RentInformation from "../../components/userInfo/RentInfoCard";
import UserAccountDetailCard from "../../components/userInfo/UserAccountDetailCard";
import RentInfoCard from "../../components/userInfo/RentInfoCard";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteUser, fetchImage, getUser, updateUser } from "../../api/authApi";
import ProfileCard from "../../components/userInfo/ProfileCard";
import { useNavigate } from "react-router-dom";
import DeleteCard from "../../components/allTenantsdetails/DeleteCard";
import MemberDetailCard from "../../components/userInfo/memberDetailsCard";

function UserInfoPage() {
  const { tenantid } = useParams();
  const [tenantDetail, setTenantDetail] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formdata, setFormData] = useState();
  const [editdata, setEditData] = useState({});
  const [deleteTenant, setDeleteTenant] = useState("");
  const [openDocuments, setOpenDocuments] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function get() {
      try {
        const res = await getUser(tenantid);
        console.log(res);
        setTenantDetail(res.data.user);
        console.log(res.data.user);
        toast.success(res.data.message);
      } catch (error) {
        console.log(error.message);
        toast.error(error?.response?.data?.message);
      }
    }
    get();
  }, []);

  useEffect(() => {
    setFormData(structuredClone(tenantDetail));
  }, [tenantDetail]);

  async function fetchAaddharImage() {
    console.log("start");

    if (
      tenantDetail.aadhaarFront.secure_url &&
      tenantDetail.aadhaarBack.secure_url
    ) {
      return;
    }

    try {
      setLoadingImage(true);

      const res = await fetchImage(tenantDetail._id);

      setTenantDetail((prev) => ({
        ...prev,
        aadhaarFront: {
          ...prev.aadhaarFront,
          secure_url: res.data.aadhaarFrontUrl,
        },
        aadhaarBack: {
          ...prev.aadhaarBack,
          secure_url: res.data.aadhaarBackUrl,
        },
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoadingImage(false);
    }
  }

  function editOn() {
    setIsEdit(!isEdit);
  }

  function handleChange(e) {
    const { name } = e.target;

    if (
      name === "profileImage" ||
      name === "adhhaarFront" ||
      name === "adhhaarBack"
    ) {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: {
            public_id: formdata[name].public_id,
            secure_url: e.target.files[0],
          },
        };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }

    setEditData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value ? e.target.value : e.target.files[0],
      };
    });
  }

  // sending api for updating the value of user
  async function sendApiForUpdate(id) {
    try {
      const res = await updateUser(id, editdata);
      toast.success(res.data.message);
      setTenantDetail(structuredClone(formdata));
      setEditData({});
      editOn(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  function cancelUpdate() {
    setFormData(structuredClone(tenantDetail));
    setEditData({});
  }

  // updating deleteTenants details
  const updateDeleteTenants = () => {
    setDeleteTenant(structuredClone(tenantDetail));
  };

  // removing deleteTenants card details

  const cancelDeleteTenants = () => setDeleteTenant("");

  // This Api is for deleting the data
  const deleteTenantApi = async (id) => {
    try {
      const res = await deleteUser(id);
      setDeleteTenant("");
      toast.success(res.data.message);
      console.log(res.data.message);
      navigate("/alltenants");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {deleteTenant ? (
        <DeleteCard
          data={deleteTenant}
          onCancel={cancelDeleteTenants}
          onDelete={() => deleteTenantApi(deleteTenant._id)}
        />
      ) : (
        ""
      )}

      <div className="min-h-screen bg-slate-100 p-4 md:p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* ==================== PROFILE HEADER ==================== */}

          <ProfileCard
            user={formdata}
            edit={isEdit}
            onEditToggle={editOn}
            handleChange={handleChange}
            onSave={() => sendApiForUpdate(formdata._id)}
            onCancel={cancelUpdate}
            onDelete={updateDeleteTenants}
          />

          {/* ==================== INFORMATION CARDS ==================== */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* ==================== PERSONAL DETAILS CARD ==================== */}

            <PersonalDetails
              user={formdata}
              edit={isEdit}
              onChange={handleChange}
            />

            {/* ==================== PROPERTY DETAILS CARD ==================== */}

            <PropertyDetails
              user={formdata}
              edit={isEdit}
              onChange={handleChange}
            />
            {/* ==================== RENT INFORMATION CARD ==================== */}
            <RentInfoCard
              user={formdata}
              edit={isEdit}
              onChange={handleChange}
            />

            {/* ==================== ACCOUNT INFORMATION CARD ==================== */}

            <UserAccountDetailCard
              user={formdata}
              edit={isEdit}
              onChange={handleChange}
            />
          </div>

          {/* ====================  Aadhaar  CARD ==================== */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-800">
                Identity Documents
              </h2>

              <button
                onClick={() => {
                  if (!openDocuments) {
                    fetchAaddharImage();
                  }
                  setOpenDocuments((prev) => !prev);
                }}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {openDocuments ? "Hide Documents" : "View Documents"}

                <svg
                  className={`h-4 w-4 transition-transform ${
                    openDocuments ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Dropdown panel */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openDocuments
                  ? "max-h-[700px] opacity-100 mt-5"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="border-t border-slate-200 pt-5">
                <p className="mb-4 text-sm font-medium text-slate-600">
                  Aadhaar Card
                </p>

                {loadingImage ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-pulse">
                    <div>
                      <div className="w-full h-56 rounded-2xl bg-stone-200"></div>
                      <div className="mt-3 h-4 w-24 mx-auto rounded bg-slate-200"></div>
                    </div>

                    <div>
                      <div className="w-full h-56 rounded-2xl bg-stone-200"></div>
                      <div className="mt-3 h-4 w-24 mx-auto rounded bg-slate-200"></div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <img
                        onClick={() =>
                          window.open(
                            tenantDetail?.aadhaarFront?.secure_url,
                            "_blank",
                          )
                        }
                        src={tenantDetail?.aadhaarFront?.secure_url}
                        alt="Aadhaar Front"
                        className="w-full h-56 rounded-2xl border border-slate-200 object-contain bg-white p-3 shadow-sm transition duration-300 hover:shadow-lg hover:scale-[1.02]"
                      />
                      <p className="mt-2 text-center text-sm font-medium text-slate-600">
                        Front Side
                      </p>
                    </div>

                    <div>
                      <img
                        onClick={() =>
                          window.open(
                            tenantDetail?.aadhaarBack?.secure_url,
                            "_blank",
                          )
                        }
                        src={tenantDetail?.aadhaarBack?.secure_url}
                        alt="Aadhaar Back"
                        className="w-full h-56 rounded-2xl border border-slate-200 object-contain bg-white p-3 shadow-sm transition duration-300 hover:shadow-lg hover:scale-[1.02]"
                      />
                      <p className="mt-2 text-center text-sm font-medium text-slate-600">
                        Back Side
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ==================== FAMILY MEMBERS CARD ==================== */}
          <MemberDetailCard tenantDetails={tenantDetail} />
        </div>
      </div>
    </>
  );
}

export default UserInfoPage;
