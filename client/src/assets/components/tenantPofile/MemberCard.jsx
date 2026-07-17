// MemberCard.jsx
import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { fetchImage } from "../../api/authApi";
import toast from "react-hot-toast";

function MemberCard({ member, onEdit, onDelete }) {
  const [showDocuments, setShowDocuments] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [aadhaarFrontUrl, setAadhaarFrontUrl] = useState(
    member?.aadhaarFront?.secure_url || null,
  );
  const [aadhaarBackUrl, setAadhaarBackUrl] = useState(
    member?.aadhaarBack?.secure_url || null,
  );

  async function handleShowDocuments() {
    if (showDocuments) {
      setShowDocuments(false);
      return;
    }

    // Fetch images only if not already loaded
    if (!aadhaarFrontUrl && !aadhaarBackUrl) {
      try {
        setLoadingImage(true);
        setShowDocuments(true);
        const res = await fetchImage(member._id);
        setAadhaarFrontUrl(res.data.aadhaarFrontUrl);
        setAadhaarBackUrl(res.data.aadhaarBackUrl);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoadingImage(false);
      }
    } else {
      setShowDocuments(true);
    }
  }

  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl relative">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-center text-white">
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          <button
            className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all duration-200 flex items-center justify-center shadow-lg"
            onClick={() => onEdit?.(member._id)}
          >
            <Pencil size={17} className="text-white" />
          </button>
          <button
            onClick={() => onDelete?.(member._id)}
            className="w-7 h-7 rounded-full bg-rose-500/80 backdrop-blur-md border border-rose-300/30 hover:bg-rose-500 transition-all duration-200 flex items-center justify-center shadow-lg"
          >
            <Trash2 size={17} className="text-white" />
          </button>
        </div>

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
            {member.dob
              ? new Date(member.dob).toLocaleDateString("en-GB")
              : "—"}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="font-semibold text-gray-600 text-xs">Aadhaar</span>
          <span className="text-gray-900 text-xs tracking-wide">
            {member.aadhaarNumber || "—"}
          </span>
        </div>

        <button
          onClick={handleShowDocuments}
          disabled={loadingImage}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-medium py-2 rounded-lg shadow-sm transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loadingImage
            ? "Loading..."
            : showDocuments
              ? "Hide Documents"
              : "Show Documents"}
        </button>

        {showDocuments && (
          <div className="border-t border-gray-100 pt-4 mt-4">
            <h3 className="font-semibold text-sm mb-3 text-gray-800">
              Aadhaar Documents
            </h3>

            {loadingImage ? (
              <div className="flex flex-col gap-3">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="w-full h-28 rounded-lg bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-2 overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                    <svg
                      className="animate-spin h-6 w-6 text-blue-500"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-500">
                      Fetching photo...
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-center font-medium text-gray-700 mb-1 text-xs">
                    Front
                  </p>
                  {aadhaarFrontUrl ? (
                    <img
                      src={aadhaarFrontUrl}
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
                  {aadhaarBackUrl ? (
                    <img
                      src={aadhaarBackUrl}
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
  );
}

export default MemberCard;
