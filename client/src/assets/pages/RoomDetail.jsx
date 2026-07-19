import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, MapPin, Users, Check, X, Phone } from "lucide-react";
import Button from "../components/Button";

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const ownerInfo = {
    name: "Rajesh Patel",
    phone: "+91 98765 43210",
    email: "rajesh.patel@example.com",
  };

  // Future backend data — same shape as Home.jsx roomData
  const roomData = [
    {
      _id: "6a5cc7e20da6af5941a377e8",
      tenantsId: ["6a59d66a5adfcec86f62f7c3"],
      room: "A-101",
      rent: 6000,
      buildingName: "Ajanta Tower",
      address: "Pandesara Surat near by Gavurav School 394221",
      Avaliablity: false,
      roomImage: [
        {
          secure_url:
            "https://res.cloudinary.com/dtzr8k1wr/image/upload/v1784465380/roomImage/xjgsbswsbhoyrtis9eja.jpg",
        },
      ],
      createdAt: "2026-07-19T12:49:38.161Z",
    },
    {
      _id: "6a5ccbd638f947abadc3be93",
      tenantsId: [],
      room: "A-102",
      rent: 6000,
      buildingName: "Ajanta Tower",
      address: "Pandesara Surat near by Gavurav School 394221",
      Avaliablity: true,
      roomImage: [
        {
          secure_url:
            "https://res.cloudinary.com/dtzr8k1wr/image/upload/v1784466393/roomImage/dgscbnrxbfhceoiza8az.jpg",
        },
      ],
    },
    {
      _id: "6a5ccbe038f947abadc3be99",
      tenantsId: [],
      room: "A-103",
      rent: 6000,
      buildingName: "Ajanta Tower",
      address: "Pandesara Surat near by Gavurav School 394221",
      Avaliablity: true,
      roomImage: [
        {
          secure_url:
            "https://res.cloudinary.com/dtzr8k1wr/image/upload/v1784466401/roomImage/g36jxdfosutidsbil0of.jpg",
        },
      ],
    },
    {
      _id: "6a5ccbeb38f947abadc3be9f",
      tenantsId: [],
      room: "A-104",
      rent: 7000,
      buildingName: "Ajanta Tower",
      address: "Pandesara Surat near by Gavurav School 394221",
      Avaliablity: true,
      roomImage: [
        {
          secure_url:
            "https://res.cloudinary.com/dtzr8k1wr/image/upload/v1784466414/roomImage/ugmpsssf3f9duyocs69c.jpg",
        },
      ],
    },
    {
      _id: "6a5ccbf838f947abadc3bea5",
      tenantsId: [],
      room: "A-105",
      rent: 4000,
      buildingName: "Ajanta Tower",
      address: "Pandesara Surat near by Gavurav School 394221",
      Avaliablity: true,
      roomImage: [
        {
          secure_url:
            "https://res.cloudinary.com/dtzr8k1wr/image/upload/v1784466427/roomImage/uxn6hx3laxljxsh8an7c.jpg",
        },
      ],
    },
  ];

  const room = roomData.find((r) => r._id === id);

  if (!room) {
    return (
      <section className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4">
        <p className="text-zinc-400 mb-6">Room not found.</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition mb-6 sm:mb-8 text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back to Rooms
        </button>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT: IMAGE GALLERY */}
          <div>
            <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/40 aspect-[4/3]">
              <img
                src={room.roomImage[activeImage]?.secure_url}
                alt={room.room}
                className="w-full h-full object-cover"
              />
            </div>

            {room.roomImage.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-4">
                {room.roomImage.map((img, idx) => (
                  <button
                    key={img.secure_url}
                    onClick={() => setActiveImage(idx)}
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition ${
                      activeImage === idx
                        ? "border-cyan-500"
                        : "border-zinc-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.secure_url}
                      alt={`${room.room}-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
                {room.room}
              </h1>
              <span
                className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border ${
                  room.Avaliablity
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                {room.Avaliablity ? <Check size={14} /> : <X size={14} />}
                {room.Avaliablity ? "Available" : "Occupied"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400 mb-6">
              <MapPin size={16} className="text-cyan-400 shrink-0" />
              <p className="text-sm sm:text-base">{room.address}</p>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
              <h2 className="text-4xl sm:text-5xl font-black text-cyan-400">
                ₹{room.rent.toLocaleString()}
              </h2>
              <span className="text-zinc-500 text-lg">/month</span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 mb-6">
              <h3 className="text-lg font-bold mb-3">About this room</h3>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                Spacious and clean room with modern facilities and a secure
                environment at {room.buildingName}. Ideal for individuals or
                small families looking for a comfortable rental stay.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5">
                <p className="text-zinc-500 text-xs sm:text-sm mb-1">
                  Building
                </p>
                <p className="font-semibold text-sm sm:text-base">
                  {room.buildingName}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5">
                <p className="text-zinc-500 text-xs sm:text-sm mb-1 flex items-center gap-1">
                  <Users size={14} /> Tenants
                </p>
                <p className="font-semibold text-sm sm:text-base">
                  {room.tenantsId?.length || 0} Assigned
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                disabled={!room.Avaliablity}
                className={`flex-1 px-7 py-3.5 rounded-2xl font-semibold transition duration-300 ${
                  room.Avaliablity
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/20"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {room.Avaliablity ? "Book This Room" : "Currently Occupied"}
              </Button>

              <Button
                onClick={() => setShowContact((prev) => !prev)}
                className="flex-1 px-7 py-3.5 rounded-2xl border border-zinc-700 bg-zinc-900/70 hover:border-cyan-500 hover:bg-zinc-900 transition duration-300 inline-flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                {showContact ? "Hide Contact Info" : "Contact Owner"}
              </Button>
            </div>

            {/* CONTACT INFO — toggle show/hide */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showContact ? "max-h-60 opacity-100 mt-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 sm:p-6 space-y-3">
                <h3 className="text-base font-bold text-cyan-400 mb-2">
                  Owner Contact Details
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-zinc-400 text-sm">Name</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {ownerInfo.name}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-zinc-400 text-sm">Phone</p>

                  <a
                    href={`tel:${ownerInfo.phone}`}
                    className="font-semibold text-sm sm:text-base text-cyan-400 hover:underline"
                  >
                    {ownerInfo.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-zinc-400 text-sm">Email</p>

                  <a
                    href={`mailto:${ownerInfo.email}`}
                    className="font-semibold text-sm sm:text-base text-cyan-400 hover:underline truncate max-w-[60%]"
                  >
                    {ownerInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoomDetails;
