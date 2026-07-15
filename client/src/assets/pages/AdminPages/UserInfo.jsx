import React, { useEffect, useState } from "react";
import TenantProfileHeader from "../../components/userInfo/ProfileCard";
import PersonalDetails from "../../components/userInfo/PersonalDetailCard";
import PropertyDetails from "../../components/userInfo/PropertyDetailCard";
import RentInformation from "../../components/userInfo/RentInfoCard";
import UserAccountDetailCard from "../../components/userInfo/UserAccountDetailCard";
import RentInfoCard from "../../components/userInfo/RentInfoCard";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  deleteUser,
  fetchImage,
  getRoomByBuilding,
  getUser,
  updateUser,
} from "../../api/authApi";
import ProfileCard from "../../components/userInfo/ProfileCard";
import { useNavigate } from "react-router-dom";
import DeleteCard from "../../components/allTenantsdetails/DeleteCard";
import MemberDetailCard from "../../components/userInfo/memberDetailsCard";
import ShowAadhaar from "../../components/userInfo/ShowAadhaar";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function UserInfoPage() {
  const { user } = useContext(AuthContext);
  const { tenantid } = useParams();
  const [tenantDetail, setTenantDetail] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formdata, setFormData] = useState();
  const [editdata, setEditData] = useState({});
  const [deleteTenant, setDeleteTenant] = useState("");
  const [openDocuments, setOpenDocuments] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [uploadDataloading, setUploadDataLoading] = useState(null);
  const [fetchRoomLoading, setFetchRoomLoading] = useState(null);
  const [buildingName, setBuildingName] = useState();
  const [room, setRoom] = useState([]);
  const navigate = useNavigate();

  console.log("buildingName>>>>", buildingName);

  useEffect(() => {
    setBuildingName(user.properties);
  }, [user]);

  useEffect(() => {
    async function get() {
      try {
        const res = await getUser(tenantid);
        console.log(res);
        setTenantDetail(res.data.user);
        console.log(res.data.user);
        toast.success(res?.data?.message);
      } catch (error) {
        console.log(error.message);
        toast.error(error?.response?.data?.message);
      }
    }
    get();
  }, []);

  console.log("editData>>>", editdata);

  useEffect(() => {
    setFormData(structuredClone(tenantDetail));
  }, [tenantDetail]);

  async function fetchAaddharImage() {
    if (
      typeof tenantDetail?.aadhaarFront?.secure_url === "string" &&
      typeof tenantDetail?.aadhaarBack?.secure_url === "string"
    ) {
      return;
    }

    try {
      setLoadingImage(true);

      const res = await fetchImage(tenantDetail._id);
      console.log("response>>>", res.data.aadhaarFrontUrl);

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

  const fetchRoom = async (building) => {
    try {
      setFetchRoomLoading(true);
      setRoom([]);
      console.log("buliding>>>", building);

      if (!building) {
        const res = await getRoomByBuilding({ building: formdata.building });

        const allRoom = res?.data?.building?.flatMap((item) => item.room) ?? [];
        setRoom(allRoom);
      }

      const res = await getRoomByBuilding({ building });

      const allRoom = res?.data?.building?.flatMap((item) => item.room) ?? [];

      setRoom(allRoom);
    } catch (error) {
      console.log(error.message);
    } finally {
      setFetchRoomLoading(false);
    }
  };

  console.log("formdata>>>", formdata);

  function handleChange(e) {
    const { name } = e.target;

    if (
      name === "profileImage" ||
      name === "aadhaarFront" ||
      name === "aadhaarBack"
    ) {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: {
            public_id: formdata[name]?.public_id,
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
        [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
      };
    });
  }

  // sending api for updating the value of user
  async function sendApiForUpdate(id) {
    const updatedData = new FormData();
    Object.keys(editdata).forEach((value) => {
      updatedData.set([value], editdata[value]);
    });

    try {
      setUploadDataLoading(true);
      const res = await updateUser(id, updatedData);
      toast.success(res.data.message);
      setTenantDetail(structuredClone(formdata));
      setEditData({});
      setOpenDocuments(false);
      editOn(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setUploadDataLoading(false);
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
      navigate("/all-tenants");
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
            uploadDataloading={uploadDataloading}
            fetchRoom={fetchRoom}
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
              buildingName={buildingName}
              room={room}
              fetchRoom={fetchRoom}
              setFetchRoomLoading={setFetchRoomLoading}
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
          <ShowAadhaar
            openDocuments={openDocuments}
            setOpenDocuments={setOpenDocuments}
            fetchAaddharImage={fetchAaddharImage}
            loadingImage={loadingImage}
            tenantDetail={tenantDetail}
            isEdit={isEdit}
            handleChange={handleChange}
            formdata={formdata}
          />

          {/* ==================== FAMILY MEMBERS CARD ==================== */}
          <MemberDetailCard tenantDetails={tenantDetail} />
        </div>
      </div>
    </>
  );
}

export default UserInfoPage;
