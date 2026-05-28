import Button from "../components/Button";

function About() {
    return (
        <section className="w-full bg-zinc-950 text-white py-20 md:py-24 overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

                {/* Heading */}
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">

                    <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-medium mb-6">
                        About Property
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
                        Comfortable Living
                        <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Trusted Rental Experience
                        </span>
                    </h1>

                    <p className="text-zinc-400 text-base sm:text-lg leading-relaxed px-2">
                        A well-maintained rental property designed to provide
                        tenants with a secure, comfortable, and hassle-free
                        living experience with modern facilities and organized
                        management.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

                    {/* Left Side */}
                    <div className="space-y-6 sm:space-y-7">

                        {/* Card 1 */}
                        <div className="p-5 sm:p-7 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:border-cyan-500/30 transition duration-300">

                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-xl sm:text-2xl font-bold mb-5 shadow-lg shadow-cyan-500/20">
                                🏠
                            </div>

                            <h2 className="text-xl sm:text-2xl font-bold mb-3">
                                Spacious & Clean Rooms
                            </h2>

                            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                                Properly maintained rooms with clean
                                surroundings, ventilation, and a peaceful
                                environment for comfortable daily living.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-5 sm:p-7 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:border-cyan-500/30 transition duration-300">

                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-xl sm:text-2xl font-bold mb-5 shadow-lg shadow-cyan-500/20">
                                🔒
                            </div>

                            <h2 className="text-xl sm:text-2xl font-bold mb-3">
                                Safe & Secure Property
                            </h2>

                            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                                Secure property management with organized
                                tenant records, verified entries, and reliable
                                support for residents.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-5 sm:p-7 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:border-cyan-500/30 transition duration-300">

                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-xl sm:text-2xl font-bold mb-5 shadow-lg shadow-cyan-500/20">
                                ⚡
                            </div>

                            <h2 className="text-xl sm:text-2xl font-bold mb-3">
                                Essential Facilities
                            </h2>

                            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                                Access to important facilities including
                                electricity, water supply, maintenance support,
                                and organized property services.
                            </p>
                        </div>

                    </div>

                    {/* Right Side */}
                    <div className="relative">

                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-3xl rounded-full"></div>

                        <div className="relative p-5 sm:p-8 lg:p-10 rounded-[32px] border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">

                                <div className="p-4 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800">
                                    <h2 className="text-3xl sm:text-4xl font-black text-cyan-400 mb-2">
                                        50+
                                    </h2>

                                    <p className="text-zinc-400 text-xs sm:text-sm">
                                        Rooms Available
                                    </p>
                                </div>

                                <div className="p-4 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800">
                                    <h2 className="text-3xl sm:text-4xl font-black text-cyan-400 mb-2">
                                        24/7
                                    </h2>

                                    <p className="text-zinc-400 text-xs sm:text-sm">
                                        Water Supply
                                    </p>
                                </div>

                                <div className="p-4 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800">
                                    <h2 className="text-3xl sm:text-4xl font-black text-cyan-400 mb-2">
                                        100%
                                    </h2>

                                    <p className="text-zinc-400 text-xs sm:text-sm">
                                        Verified Tenants
                                    </p>
                                </div>

                                <div className="p-4 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800">
                                    <h2 className="text-2xl sm:text-4xl font-black text-cyan-400 mb-2">
                                        Daily
                                    </h2>

                                    <p className="text-zinc-400 text-xs sm:text-sm">
                                        Maintenance Support
                                    </p>
                                </div>

                            </div>

                            {/* Content */}
                            <h2 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">
                                Better Property Management
                            </h2>

                            <p className="text-zinc-400 leading-relaxed mb-8 text-sm sm:text-base">
                                The property is managed with a focus on
                                cleanliness, tenant comfort, proper record
                                management, and smooth rental operations.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">

                                <Button className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 transition duration-300 shadow-xl shadow-cyan-500/20">
                                    Contact Owner
                                </Button>

                                <Button className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-zinc-700 bg-zinc-900 hover:border-cyan-500 transition duration-300 font-medium">
                                    View Rooms
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;