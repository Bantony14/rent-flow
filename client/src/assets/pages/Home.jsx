import Button from "../components/Button";

function Home() {
  // Future backend data
  const propertyData = {
    title: "Krishna Residency",
    location: "Ahmedabad, Gujarat",
    description:
      "Clean and secure rental property with modern rooms, daily maintenance, and comfortable living facilities.",

    heroImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",

    rooms: [
      {
        id: 1,
        roomNumber: "A-101",
        price: "₹6,000/month",
        image1: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      },
      {
        id: 2,
        roomNumber: "A-102",
        price: "₹7,500/month",
        imag1e: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      },
      {
        id: 3,
        roomNumber: "B-201",
        price: "₹8,000/month",
        ima1ge: "https://images.unsplash.com/photo-1494526585095-c41746248156",
      },
    ],
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={propertyData.heroImage}
            alt="property"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/70 to-zinc-950"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-5 px-6 lg:px-10 lg:py-5 md:py-5 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-medium mb-6">
              Trusted Property Management
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6">
              Comfortable Living
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Better Rental Experience
              </span>
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              {propertyData.description}
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 transition duration-300 shadow-xl shadow-cyan-500/20">
                View Rooms
              </Button>

              <Button className="w-full sm:w-auto px-7 py-3 rounded-2xl border border-zinc-700 bg-zinc-900/70 hover:border-cyan-500 transition duration-300">
                Contact Owner
              </Button>
            </div>

            {/* PROPERTY STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-cyan-400 mb-2">50+</h2>

                <p className="text-zinc-400 text-sm">Rooms Available</p>
              </div>

              <div className="p-5 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-cyan-400 mb-2">24/7</h2>

                <p className="text-zinc-400 text-sm">Water Supply</p>
              </div>

              <div className="p-5 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-cyan-400 mb-2">100%</h2>

                <p className="text-zinc-400 text-sm">Secure Property</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-3xl rounded-full"></div>

            <div className="relative rounded-[32px] overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
              <img
                src={propertyData.heroImage}
                alt="property"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />

              <div className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black mb-2">
                      {propertyData.title}
                    </h2>

                    <p className="text-zinc-400 text-sm sm:text-base">
                      {propertyData.location}
                    </p>
                  </div>

                  <div className="w-fit px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                    Available
                  </div>
                </div>

                <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                  Clean surroundings, secure management, and comfortable rooms
                  for tenants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROOMS SECTION */}
      <section className="w-full bg-zinc-950 text-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-14">
            <div>
              <p className="text-cyan-400 font-medium mb-3 text-sm sm:text-base">
                Available Rooms
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                Explore Property Rooms
              </h1>
            </div>

            <Button className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold">
              View All
            </Button>
          </div>

          {/* ROOM CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertyData.rooms.map((room) => (
              <div
                key={room.id}
                className="rounded-[30px] overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-cyan-500/30 transition duration-300 group"
              >
                <div className="overflow-hidden">
                  <img
                    src={room.image}
                    alt="room"
                    className="w-full h-60 sm:h-72 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <h2 className="text-2xl font-bold">{room.roomNumber}</h2>

                    <div className="w-fit px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">
                      Available
                    </div>
                  </div>

                  <p className="text-zinc-400 mb-6 leading-relaxed text-sm sm:text-base">
                    Spacious and clean room with modern facilities and secure
                    environment.
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="text-2xl font-black text-cyan-400">
                      {room.price}
                    </h3>

                    <Button className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:scale-105 transition duration-300">
                      View Details
                    </Button>
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
