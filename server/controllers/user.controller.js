import User from "../models/user.model.js"
import sendEmail from "../utils/emailSender.js";
import ErrorHandler from "../utils/error.js";
import otpGenerator from "../utils/otpGenerator.js";

export const userRegistration = async (req, res, next) => {
    const { fullName, aadhaarNumber, mobileNumber, dob, password, roomNumber, building, email, rentPrice, joiningDate } = req.body;

    if (req.body.role) {
        return next(new ErrorHandler("cannot enter role field", 400))
    }
    if (!fullName || !aadhaarNumber || !mobileNumber || !dob || !password || !roomNumber || !building || !rentPrice || !joiningDate) {
        return next(new ErrorHandler("all filed is required", 400))
    }
    try {
        const user = await User.create(
            { fullName, aadhaarNumber, mobileNumber, dob, password, roomNumber, building, email, rentPrice, joiningDate }
        )

        if (!user) {
            return next(new ErrorHandler("Account not created please try again", 400))
        }
        user.password = undefined;
        res.status(200).json({
            success: true,
            message: "User Registered successfully",
            user,
        })
    } catch (error) {

        if (error.code === 11000) {
            let field = Object.keys(error.keyValue)[0];
            if (field === "hashAadhaar") {
                field = "Aadhaar"
            }
            return next(
                new ErrorHandler(`${field} already exists`, 400)
            );
        }
        console.log(error.message)
        return next(
            new ErrorHandler(error.message, 500)

        );
    }
};

export const userUpdate = async (req, res, next) => {
    const allowedFiled = ["fullName", "aadhaarNumber", "mobileNumber", "dob", "password", "roomNumber", "building", "email", "paymentStatus", "dueAmount"]

    const { id } = req.params

    console.log("req.body>>>>", req.body)

    const validation = Object.keys(req.body);
    console.log(validation)

    const notAllowedFiled = validation.filter((value) => !allowedFiled.includes(value));

    if (notAllowedFiled.length > 0) {
        return next(new ErrorHandler(`You cannot changes this filed ${notAllowedFiled.join(" and ")}`))
    }

    const filter = {};

    allowedFiled.map((value) => {
        if (req.body[value]) {
            filter[value] = req.body[value]
        }
    })

    const forNoChanges = Object.keys(req.body).length === 0

    if (forNoChanges) {
        return next(new ErrorHandler("There is no changes in your data"))
    }

    if ("role" in req.body) {
        return next(new ErrorHandler("you can't change role  "))
    }



    const filterValueForMessage = Object.keys(filter).join(" and ",)

    try {
        const user = await User.findByIdAndUpdate(id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        )

        if (!user) {
            return next(new ErrorHandler("user Not found", 400))
        }

        res.status(200).json({
            success: true,
            message: `User ${filterValueForMessage} updated successfully `,
            user,
        })
    } catch (error) {
        if (error.code === 11000) {
            let field = Object.keys(error.keyValue)[0];
            if (field === "hashAadhaar") {
                field = "Aadhaar"
            }
            return next(
                new ErrorHandler(`${field} already exists`, 400)
            );
        }
        return next(new ErrorHandler(error.message, 500))
    }

};

export const userDelete = async (req, res, next) => {
    const { id } = req.params;


    try {
        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        res.status(200).json({
            success: true,
            message: `User Delete SuccessFully`
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const getAllUser = async (req, res, next) => {
    const filter = {}

    if (req.query.building) {
        filter.building = req.query.building
    }
    if (req.query.paymentStatus) {
        filter.paymentStatus = req.query.paymentStatus
    }
    try {


        const user = await User.find(filter);
        res.status(200).json({
            success: true,
            message: `Here your all data by ${!Object.keys(filter).join("") ? " tenants" : Object.keys(filter).join(" and ")}`,
            user,
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
};

export const getOneUser = async (req, res, next) => {


    try {
        const field = Object.keys(req.body).join("")
        console.log(field)
        console.log(req.body[field])

        let user;

        if (field === "_id") {
            user = await User.findById(req.body._id)
        }
        else {
            user = await User.findOne({
                [field]: { $regex: req.body[field], $options: "i" }
            });
        }

        if (!user) {
            return next(
                new ErrorHandler(
                    `No tenant found with ${field}: ${req.body[field]}`,
                    404
                )
            );
        }
        res.status(200).json({
            success: true,
            message: `Matching tenant records found for ${field}.`,
            user,
        })


    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return next(new ErrorHandler("user not found", 500))
        }
        res.status(200).json({
            success: true,
            message: "here is your user data",
            user,
        })


    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
};

export const getAllUserByBuilding = async (req, res, next) => {

    const { building, roomNumber } = req.query;
    const filter = {}
    if (building) {
        filter.building = building
    }
    if (roomNumber) {
        filter.roomNumber = roomNumber
    }
    try {
        const user = await User.find(filter);
        if (user.length === 0) {
            return next(new ErrorHandler("user not found", 400))
        }
        res.status(200).json({
            success: true,
            message: "here your user data ",
            user,
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}


export const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("all filed is required", 400))
    }
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("user not found", 400))
        }
        if (!await user.comparePassword(password)) {
            return next(new ErrorHandler("user password not match please try again", 400))
        }
        const token = user.jwtToken();
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        user.password = undefined;
        res.status(200).json({
            success: true,
            message: "user login successfully",
            user
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

export const userLogout = async (req, res, next) => {
    try {
        res.clearCookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({
            success: true,
            message: "user logout successfully",
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

// This work only for sending otp to email with all thing to do about otp
export const forgotPassword = async (req, res, next) => {
    const { email } = req.body
    const otp = otpGenerator();

    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return next(new ErrorHandler("user not found please enter different email", 400))
        }
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        const subject = "THIS IS FOR RESET YOUR PASSWORD"
        const message = otp;
        console.log(otp);

        await user.save();
        sendEmail({ email, subject, message })
        res.status(200).json({
            success: true,
            message: "otp send to your registered email address",
            user,
        })


    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

export const resetPassword = async (req, res, next) => {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
        return next(new ErrorHandler("all filed required", 400));
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("newPassword and confirmPassword not match please check it", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password")

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return next(new ErrorHandler("invalid or expired otp", 400))
        }

        user.password = newPassword;
        await user.save();

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "your password has been updated successfully please login with the new password",
            user,
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }

}

export const addMember = async (req, res, next) => {
    const { member, mobileNumber } = req.body;

    try {

        const user = await User.findOne({ mobileNumber });

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        user.member.push(...member);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Member added successfully",
            member,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

export const removeMember = async (req, res, next) => {
    const { mobileNumber } = req.body;
    const memberId = req.params.id

    try {

        const user = await User.findOne(
            { mobileNumber },
        )
        const removedUserInfo = user.member.find((member) =>
            member._id.toString() === memberId
        )

        if (!removedUserInfo) {
            return next(new ErrorHandler("member not found", 400))
        }

        await user.updateOne({
            $pull: {
                member: {
                    _id: memberId
                }
            }
        })
        res.status(200).json({
            success: true,
            message: "member remove succesfully",
            removedUserInfo,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

export const updateMemberInfo = async (req, res, next) => {
    const { mobileNumber, name, aadhaarNumber, dob } = req.body
    const memberId = req.params.id;

    try {
        const user = await User.findOne({ mobileNumber });
        console.log(user)

        const findMember = user.member.find((member) =>
            member._id.toString() === memberId
        )

        if (!findMember) {
            return next(new ErrorHandler("member not found", 400))
        }

        if (name) {
            findMember.name = name;
        }

        if (dob) {
            findMember.dob = dob;
        }

        if (aadhaarNumber) {
            findMember.aadhaarNumber = aadhaarNumber;
        }

        await user.save();


        res.status(200).json({

            success: true,
            message: "member info updated",
            findMember,
        })


    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }

}

export const getMe = async (req, res, next) => {
    const { id } = req.user;

    try {

        const user = await User.findById(id);

        if (!user) {
            return next(new ErrorHandler("user Not Found", 400))
        }
        res.status(200).json({
            success: true,
            message: "Here your information",
            user,
        })



    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

