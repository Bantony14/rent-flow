import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { userRegistrationApi } from "../api/authApi";
import toast from "react-hot-toast";
import { rooms, errorMsg, validation, input } from "../utils/formValidation.js"
import Button from "../components/Button.jsx";

function Registration() {

    const initialState = {
        fullName: "",
        aadhaarNumber: "",
        mobileNumber: "",
        dob: "",
        password: "",
        roomNumber: "",
        building: "",
        email: ""
    };
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false)
    const [roomOptions, setRoomOptions] = useState([]);
    const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const strongEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;



    useEffect(() => {
        setRoomOptions(rooms[formData.building] || []);
    }, [formData.building]);

    const inputs = input(roomOptions);
    const validations = validation(formData, strongPassword, strongEmail)


    function handleChange(e) {

        if ((e.target.name === "aadhaarNumber" || e.target.name === "mobileNumber") && !/^\d*$/.test(e.target.value)) {
            return;
        }

        if (e.target.name === "building") {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
                roomNumber: ""
            })

            return;
        }
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )

    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!strongPassword.test(formData.password)) {
            return;
        }
        if (!strongEmail.test(formData.email)) {
            return;
        }

        try {
            const response = await userRegistrationApi(formData);
            toast.success(response.data.message);
            setFormData(initialState)


        } catch (error) {
            return toast.error(error.response.data.message);

        }


        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mt-6 md:mt-12 p-5 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">

            {/* Form Title: Full width clear text */}
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Registration Form</h1>

            {/* Inputs Container: Yahan humne dynamic grid system add kiya hai */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inputs.map((value, index) => {
                    if (value.name === "building" || value.name === "roomNumber") {
                        return (
                            <div key={index}>
                                <select
                                    name={value.name}
                                    value={formData[value.name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer appearance-none"
                                >
                                    <option value="">
                                        {value.name === "building"
                                            ? "Select Building"
                                            : "Select RoomNumber"}
                                    </option>

                                    {value.options.map((option, i) => (
                                        <option key={i} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                {validations[value.name] && (
                                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                        <span>⚠</span> {errorMsg.roomNumber}
                                    </p>
                                )}
                            </div>




                        )
                    }

                    return (
                        <div key={index} className="relative">

                            <input
                                type={
                                    value.type === "password"
                                        ? (showPassword ? "text" : "password")
                                        : value.type
                                }
                                name={value.name}
                                value={formData[value.name]}
                                onChange={handleChange}
                                placeholder={value.placeholder}
                                minLength={value.minLength}
                                maxLength={value.maxLength}
                                max={
                                    value.type === "date"
                                        ? new Date().toISOString().split("T")[0]
                                        : undefined
                                }
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-gray-700 placeholder:text-gray-400 placeholder:capitalize focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            />
                            {
                                validations[value.name] && formData[value.name] && (
                                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                        <span>⚠</span>{errorMsg[value.name]}
                                    </p>
                                )
                            }


                            {value.type === "password" && (
                                <Button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3 text-sm font-medium text-gray-500 hover:text-blue-600 transition"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </Button>
                            )}

                        </div>
                    )

                })}


                <div className="sm:col-span-2 mt-2">
                    <input
                        type="submit"
                        value="Create Account"
                        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-semibold rounded-lg cursor-pointer  active:scale-95 transition shadow-md shadow-blue-200"
                    />

                </div>
            </div>

        </form >
    )
}

export default Registration;