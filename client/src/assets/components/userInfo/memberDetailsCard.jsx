import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import MemberForm from "./memberForm";
import toast from "react-hot-toast";
import { addMember } from "../../api/authApi";

function MemberDetailCard() {
  const { user } = useContext(AuthContext);
  const [showDocuments, setShowDocuments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sendDataLoading, setSendDataLoading] = useState(null);
  const [member, setMember] = useState({
    name: "",
    dob: "",
    aadhaarNumber: "",
    profileImage: null,
    aadhaarFront: null,
    aadhaarBack: null,
  });

  function handleChange(e) {
    setMember((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function createMember(e) {
    e.preventDefault();
    const check = Object.values(member).every((value) => Boolean(value));
    if (!check) return;

    const memberDetail = new FormData();
    Object.keys(member).forEach((key) => {
      memberDetail.set(key, member[key]);
    });

    try {
      setSendDataLoading(true);
      const res = await addMember(user._id, memberDetail);
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setSendDataLoading(false);
    }
  }

  return (
    <>
      <MemberForm
        member={member}
        setMember={setMember}
        handleChange={handleChange}
        loading={sendDataLoading}
        onSubmit={createMember}
      />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Family Members</h1>

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
          + Add Member
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-row gap-5 overflow-x-auto pb-2">
        {user?.member?.map((member) => (
          <div
            key={member._id}
            className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-center text-white">
              {member?.profileImage?.secure_url ? (
                <img
                  src={member.profileImage.secure_url}
                  alt={member.name || "Member"}
                  className="w-20 h-20 rounded-full border-4 border-white/80 object-cover mx-auto shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-white/80 bg-blue-800/40 flex items-center justify-center mx-auto shadow-md">
                  <span className="text-xl font-semibold text-white">
                    {member?.name?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
              )}

              <h2 className="text-lg font-bold mt-3 tracking-tight truncate">
                {member.name}
              </h2>
              <p className="text-blue-100 text-xs">Member Details</p>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold text-gray-600 text-xs">DOB</span>
                <span className="text-gray-900 text-xs">
                  {member.dob || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold text-gray-600 text-xs">
                  Aadhaar
                </span>
                <span className="text-gray-900 text-xs tracking-wide">
                  {member.aadhaarNumber || "—"}
                </span>
              </div>

              <button
                onClick={() =>
                  setShowDocuments(
                    showDocuments === member._id ? null : member._id,
                  )
                }
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-medium py-2 rounded-lg shadow-sm transition-all duration-200"
              >
                {showDocuments === member._id
                  ? "Hide Documents"
                  : "Show Documents"}
              </button>

              {showDocuments === member._id && (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h3 className="font-semibold text-sm mb-3 text-gray-800">
                    Aadhaar Documents
                  </h3>

                  {loading ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full h-28 rounded-lg bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-2 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                        <svg
                          className="animate-spin h-6 w-6 text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        <span className="text-xs font-medium text-gray-500">
                          Fetching photo...
                        </span>
                      </div>

                      <div className="w-full h-28 rounded-lg bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-2 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                        <svg
                          className="animate-spin h-6 w-6 text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        <span className="text-xs font-medium text-gray-500">
                          Fetching photo...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="text-center font-medium text-gray-700 mb-1 text-xs">
                          Front
                        </p>
                        {member?.aadhaarFront?.secure_url ? (
                          <img
                            src={member.aadhaarFront.secure_url}
                            alt={`${member.name || "Member"} Aadhaar Front`}
                            className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                          />
                        ) : (
                          <div className="w-full h-28 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                            Not uploaded
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-center font-medium text-gray-700 mb-1 text-xs">
                          Back
                        </p>
                        {member?.aadhaarBack?.secure_url ? (
                          <img
                            src={member.aadhaarBack.secure_url}
                            alt={`${member.name || "Member"} Aadhaar Back`}
                            className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                          />
                        ) : (
                          <div className="w-full h-28 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                            Not uploaded
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MemberDetailCard;
