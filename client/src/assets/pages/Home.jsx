import Button from "../components/Button";
import { Link } from "react-router-dom";

function Home() {
  // Future backend data
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

  const propertyData = {
    title: roomData[0]?.buildingName || "Ajanta Tower",
    location: roomData[0]?.address || "",
    heroImage: roomData[0]?.roomImage[0]?.secure_url || "",
    description:
      "Find your perfect rental home at Ajanta Tower. We offer well-maintained, spacious rooms with modern amenities in a secure environment at Pandesara, Surat.",
  };

  const availableRooms = roomData.filter((r) => r.Avaliablity).length;

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-zinc-950 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={propertyData.heroImage}
            alt="property"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/80 to-zinc-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-12 md:pt-6 md:pb-1 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-medium mb-6">
              Trusted Property Management
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[1.1] mb-6">
              Comfortable Living
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Better Rental Experience
              </span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              {propertyData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 active:scale-95 transition duration-300 shadow-xl shadow-cyan-500/20">
                View Rooms
              </Button>
              <Button className="w-full sm:w-auto px-7 py-3 rounded-2xl border border-zinc-700 bg-zinc-900/70 hover:border-cyan-500 hover:bg-zinc-900 transition duration-300">
                Contact Owner
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
              <img
                src={propertyData.heroImage}
                alt="property"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black mb-1">
                      {propertyData.title}
                    </h2>
                    <p className="text-zinc-400 text-sm">
                      {propertyData.location}
                    </p>
                  </div>
                  <span className="shrink-0 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-medium whitespace-nowrap">
                    {availableRooms} Available
                  </span>
                </div>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  Clean surroundings, secure management, and comfortable rooms
                  for tenants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROOMS SECTION */}
      <section className="w-full bg-zinc-950 text-white py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10 sm:mb-14">
            <div>
              <p className="text-cyan-400 font-medium mb-2 text-sm sm:text-base">
                Available Rooms
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                Explore Property Rooms
              </h2>
            </div>
            <Button className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 active:scale-95 transition duration-300 shrink-0">
              View All
            </Button>
          </div>

          {/* ROOM CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {roomData.map((room) => (
              <div
                key={room._id}
                className="flex flex-col rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-cyan-500/40 hover:bg-zinc-900/60 transition duration-300 group"
              >
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src={room.roomImage[0]?.secure_url}
                    alt={room.room}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold">
                      {room.room}
                    </h3>
                    <span
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold border ${
                        room.Avaliablity
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {room.Avaliablity ? "Available" : "Occupied"}
                    </span>
                  </div>

                  <p className="text-zinc-500 mb-5 text-sm sm:text-base line-clamp-2">
                    Spacious and clean room with modern facilities and secure
                    environment.
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-zinc-800">
                    <h4 className="text-lg sm:text-xl font-black text-cyan-400 whitespace-nowrap">
                      ₹{room.rent.toLocaleString()}
                      <span className="text-zinc-500 text-xs font-medium">
                        /mo
                      </span>
                    </h4>
                    <Link to={`/room/${room._id}`} className="w-full sm:w-auto">
                      <Button className="w-full px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium hover:scale-105 active:scale-95 transition duration-300 whitespace-nowrap">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
