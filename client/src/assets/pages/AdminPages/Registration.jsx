import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { userRegistrationApi } from "../../api/authApi.js";
import toast from "react-hot-toast";
import { rooms, errorMsg, validation, input } from "../../utils/formValidation.js"

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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <form
                onSubmit={handleSubmit}
                className="
      w-full 
      max-w-2xl 
      p-6 
      sm:p-8
      bg-white 
      rounded-2xl 
      border border-gray-200
      shadow-lg 
      shadow-gray-200/60
    "
            >

                {/* Title */}
                <div className="mb-6 md:mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Registration Form
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Fill in Tenant details to create account
                    </p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

                    {inputs.map((value, index) => {

                        if (value.name === "building" || value.name === "roomNumber") {

                            return (
                                <div key={index}>

                                    <select
                                        name={value.name}
                                        value={formData[value.name]}
                                        onChange={handleChange}
                                        required
                                        className="
                w-full
                h-12
                px-4
                border border-gray-300
                rounded-xl
                bg-white
                text-gray-700
                outline-none
                transition-all
                duration-200
                focus:border-cyan-500
                focus:ring-4
                focus:ring-cyan-100
              "
                                    >

                                        <option value="">
                                            {
                                                value.name === "building"
                                                    ? "Select Building"
                                                    : "Select Room Number"
                                            }
                                        </option>

                                        {value.options.map((option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        ))}

                                    </select>

                                    {
                                        validations[value.name] && (
                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                ⚠ {errorMsg[value.name]}
                                            </p>
                                        )
                                    }

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

                                    className="
              w-full
              h-12
              px-4
              border border-gray-300
              rounded-xl
              outline-none
              text-gray-700
              placeholder:text-gray-400
              transition-all
              duration-200
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-100
            "
                                />

                                {
                                    validations[value.name] &&
                                    formData[value.name] && (

                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            ⚠ {errorMsg[value.name]}
                                        </p>

                                    )
                                }

                                {
                                    value.type === "password" && (

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="
                  absolute
                  right-4
                  top-3.5
                  text-gray-500
                  hover:text-cyan-600
                  transition
                "
                                        >

                                            {
                                                showPassword
                                                    ? <EyeOff size={20} />
                                                    : <Eye size={20} />
                                            }

                                        </button>
                                    )
                                }

                            </div>
                        )
                    })}

                    {/* Submit Button */}

                    <div className="md:col-span-2 pt-2">

                        <input
                            type="submit"
                            value="Create Account"
                            className="
          w-full
          h-12
          rounded-xl
          font-semibold
          text-white
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          cursor-pointer
          transition-all
          duration-200
          hover:scale-[1.01]
          active:scale-95
          shadow-lg
          shadow-cyan-200/50
        "
                        />

                    </div>

                </div>

            </form>
        </div>
    )
}

export default Registration;