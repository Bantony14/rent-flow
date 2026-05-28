function Footer() {
    return (
        <footer className="w-full border-t border-cyan-500/10 bg-zinc-950 text-white">

            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">

                {/* Top */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">

                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-cyan-500/30">
                                R
                            </div>

                            <div>
                                <h1 className="text-2xl font-black leading-none">
                                    Rent<span className="text-cyan-400">Flow</span>
                                </h1>

                                <p className="text-xs text-zinc-400 uppercase tracking-widest">
                                    Property Management
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Modern rent management platform for owners,
                            tenants, and property administrators.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h2 className="text-lg font-semibold mb-5 text-white">
                            Company
                        </h2>

                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                                About Us
                            </li>

                            <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                                Features
                            </li>

                            <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                                Pricing
                            </li>

                            <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                                Contact
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h2 className="text-lg font-semibold mb-5 text-white">
                            Services
                        </h2>

                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                                Tenant Management
                            </li>

                            <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                                Rent Tracking
                            </li>

                            <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                                Payment Analytics
                            </li>

                            <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                                Property Dashboard
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h2 className="text-lg font-semibold mb-5 text-white">
                            Stay Updated
                        </h2>

                        <p className="text-sm text-zinc-400 mb-4">
                            Get updates about new features and releases.
                        </p>

                        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full bg-transparent px-4 py-3 outline-none text-sm placeholder:text-zinc-500"
                            />

                            <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition duration-300">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-zinc-500">
                        © 2026 RentFlow. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-sm text-zinc-400">

                        <span className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                            Privacy Policy
                        </span>

                        <span className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                            Terms
                        </span>

                        <span className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                            Support
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;