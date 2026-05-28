import { useState } from "react";
import Button from "../components/Button";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/90 border-b border-cyan-500/10 text-white">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer group">

                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition duration-300">
                        R
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-2xl font-black tracking-wide leading-none">
                            Rent<span className="text-cyan-400">Flow</span>
                        </h1>

                        <p className="text-[10px] sm:text-xs text-zinc-400 tracking-widest uppercase">
                            Property Management
                        </p>
                    </div>
                </div>


                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-10 text-sm font-medium">

                    <li className="relative cursor-pointer text-zinc-300 hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
                        Home
                    </li>

                    <li className="relative cursor-pointer text-zinc-300 hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
                        About
                    </li>

                    <li className="relative cursor-pointer text-zinc-300 hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
                        Rooms
                    </li>
                </ul>


                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-3">

                    <Button className="px-5 py-2.5 rounded-2xl border border-zinc-700 bg-zinc-900/70 hover:bg-zinc-800 hover:border-cyan-500 transition duration-300 text-sm font-medium">
                        Login
                    </Button>

                    <Button className="px-5 py-2.5 rounded-2xl bg-white text-black hover:bg-zinc-200 transition duration-300 text-sm font-semibold shadow-lg">
                        Register
                    </Button>

                    <Button className="hidden xl:block px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:scale-105 transition duration-300 shadow-xl shadow-cyan-500/30">
                        Dashboard
                    </Button>

                </div>


                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1"
                >

                    <span className="w-6 h-[2px] bg-white rounded-full"></span>
                    <span className="w-6 h-[2px] bg-white rounded-full"></span>
                    <span className="w-6 h-[2px] bg-white rounded-full"></span>

                </button>
            </div>


            {/* Mobile Menu */}
            {
                menuOpen && (

                    <div className="md:hidden border-t border-cyan-500/10 bg-zinc-950/95 backdrop-blur-xl">

                        <div className="px-6 py-6 flex flex-col gap-6">

                            {/* Nav Links */}
                            <ul className="flex flex-col gap-5 text-sm font-medium">

                                <li className="text-zinc-300 hover:text-cyan-400 transition duration-300 cursor-pointer">
                                    Home
                                </li>

                                <li className="text-zinc-300 hover:text-cyan-400 transition duration-300 cursor-pointer">
                                    About
                                </li>

                                <li className="text-zinc-300 hover:text-cyan-400 transition duration-300 cursor-pointer">
                                    Rooms
                                </li>

                            </ul>


                            {/* Mobile Buttons */}
                            <div className="flex flex-col gap-4">

                                <Button className="w-full px-5 py-3 rounded-2xl border border-zinc-700 bg-zinc-900/70 hover:bg-zinc-800 hover:border-cyan-500 transition duration-300 text-sm font-medium">
                                    Login
                                </Button>

                                <Button className="w-full px-5 py-3 rounded-2xl bg-white text-black hover:bg-zinc-200 transition duration-300 text-sm font-semibold shadow-lg">
                                    Register
                                </Button>

                                <Button className="w-full px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold transition duration-300 shadow-xl shadow-cyan-500/30">
                                    Dashboard
                                </Button>

                            </div>
                        </div>
                    </div>
                )
            }
        </nav>
    );
}

export default Navbar;