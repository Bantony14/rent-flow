import { useState } from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { userLogout } from "../api/authApi";
import { toast } from "react-hot-toast"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";


function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();



    const logOut = async () => {
        try {
            const res = await userLogout();
            toast.success(res.data.message)
            setUser("");
            navigate("/")

        } catch (error) {
            toast.error(error.data.message)
        }

    }

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
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-cyan-400 font-bold"
                                    : "text-white"
                            }
                        >
                            Home
                        </NavLink>
                    </li>

                    <li className="relative cursor-pointer text-zinc-300 hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-cyan-400 font-bold"
                                    : "text-white"
                            }
                        >
                            About
                        </NavLink>
                    </li>

                    <li className="relative cursor-pointer text-zinc-300 hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">
                        <NavLink
                            to="/rooms"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-cyan-400 font-bold"
                                    : "text-white"
                            }
                        >
                            Rooms
                        </NavLink>
                    </li>
                </ul>


                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-3">

                    <Button className="px-5 py-2.5 rounded-2xl border border-zinc-700 bg-zinc-900/70 hover:bg-zinc-800 hover:border-cyan-500 transition duration-300 text-sm font-medium">
                        {user ? <NavLink
                            to="/tenantdashboard"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-cyan-400 font-bold"
                                    : "text-white"
                            }
                        >
                            My Portal
                        </NavLink>
                            :
                            <NavLink
                                to="/Login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-cyan-400 font-bold"
                                        : "text-white"
                                }
                            >
                                Login
                            </NavLink>}

                    </Button>

                    {user ? <button className="text-2xl text-amber-700" onClick={() => logOut()}>LogOut</button> : ""}

                    {user.role === "ADMIN" ? <Button className="px-5 py-2.5 rounded-2xl bg-white text-black hover:bg-zinc-200 transition duration-300 text-sm font-semibold shadow-lg">
                        <NavLink
                            to="/registration"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-cyan-400 font-bold "
                                    : ""
                            }
                        >
                            Registration
                        </NavLink>


                    </Button> : ""}

                    {user.role === "ADMIN" ?
                        <Button className="hidden xl:block px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:scale-105 transition duration-300 shadow-xl shadow-cyan-500/30">
                            <NavLink
                                to="/dashbord"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-cyan-400 font-bold"
                                        : "text-white"
                                }
                            >
                                Dashbord
                            </NavLink>
                        </Button> : ""}
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
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-cyan-400 font-bold"
                                                : "text-white"
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>

                                <li className="text-zinc-300 hover:text-cyan-400 transition duration-300 cursor-pointer">
                                    <NavLink
                                        to="/about"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-cyan-400 font-bold"
                                                : "text-white"
                                        }
                                    >
                                        About
                                    </NavLink>
                                </li>

                                <li className="text-zinc-300 hover:text-cyan-400 transition duration-300 cursor-pointer">
                                    <NavLink
                                        to="/rooms"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-cyan-400 font-bold"
                                                : "text-white"
                                        }
                                    >
                                        Rooms
                                    </NavLink>
                                </li>

                            </ul>


                            {/* Mobile Buttons */}
                            <div className="flex flex-col gap-4">

                                <Button className="w-full px-5 py-3 rounded-2xl border border-zinc-700 bg-zinc-900/70 hover:bg-zinc-800 hover:border-cyan-500 transition duration-300 text-sm font-medium">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-cyan-400 font-bold"
                                                : ""
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </Button>

                                <Button className="w-full px-5 py-3 rounded-2xl bg-white text-black hover:bg-zinc-200 transition duration-300 text-sm font-semibold shadow-lg">
                                    <NavLink
                                        to="/registration"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-cyan-400 font-bold"
                                                : ""
                                        }
                                    >
                                        Registration
                                    </NavLink>
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