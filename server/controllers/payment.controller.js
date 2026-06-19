import { razorpay } from "../app.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import ErrorHandler from "../utils/error.js";



export const paymentOrderCreate = async (req, res, next) => {
    const { id } = req.user
    if (!id) {
        return next(new ErrorHandler("user Not Found", 400))
    }
    try {

        const user = await User.findById(id);
        if (!user) {
            return next(new ErrorHandler("user Not Found", 400))
        }
        const order = await razorpay.orders.create({
            amount: user.rentPrice * 100,
            currency: "INR",
            receipt: `rent_${id.slice(-6)}_${Date.now()}`
        })

        console.log(id)
        console.log("order>>>", order)

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
        })

    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 400))
    }
}

// this api use for payment verify tenant succesfully pay or not
export const verifyPayment = async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const { id } = req.user

    try {
        console.log("req.body>>>>", req.body)

        const user = await User.findById(id);

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex")


        if (generatedSignature !== razorpay_signature) {
            return next(new ErrorHandler("payment not verify ", 400))
        }
        console.log("Before:", user.paymentStatus, user.dueAmount);

        user.paymentStatus = "Paid";
        user.dueAmount = 0;

        await user.save();

        console.log("After Save:", user.paymentStatus, user.dueAmount);
        console.log("donrrrrrr")

        res.status(200).json({
            success: true,
            message: "payment successfully done",
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            amount: 500000

        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

// this api use for every check use is paid or not 
export const paymentCheck = async (req, res, next) => {
    const { id } = req.body;

    try {
        const tenant = await User.findById(id);

        // this is for current date month and year
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();

        // here is all month name to help to maintrain a record of paid aur unpaid of each month
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];


        // this is for only first month 
        let dateOfJoining = tenant.joiningDate.getDate();
        let monthOfJoining = tenant.joiningDate.getMonth() + 1;
        let yearOfJoining = tenant.joiningDate.getFullYear();

        const monthDifference =
            (currentYear - yearOfJoining) * 12 +
            (currentMonth - monthOfJoining);

        const nextMonthReached = currentYear > yearOfJoining || (currentYear === yearOfJoining && currentMonth > monthOfJoining)



        if (!tenant.lastRentGeneratedMonth && nextMonthReached) {
            const totalDaysInMonth = new Date(
                yearOfJoining,
                monthOfJoining,
                0
            ).getDate();

            const remainingDays = totalDaysInMonth - dateOfJoining;
            const calculateDueAmount = (tenant.rentPrice / totalDaysInMonth) * remainingDays + 1
            tenant.dueAmount = Math.round(calculateDueAmount);
            tenant.lastRentGeneratedMonth = `${yearOfJoining}-${monthOfJoining}`;

            tenant.rentHistory.push({
                month: ` ${monthNames[monthOfJoining - 1]} ${yearOfJoining}`,
                dueAmount: tenant.dueAmount,
                paymentStatus: "Unpaid"
            })

            if (monthDifference >= 2) {
                const everyMonthRent = tenant.rentPrice * (monthDifference - 1)
                tenant.dueAmount = calculateDueAmount + everyMonthRent

                for (let i = 0; i < monthDifference - 1; i++) {
                    let monthIndex = monthOfJoining % 12

                    if (monthOfJoining === 12) {
                        monthOfJoining = 1;
                        yearOfJoining++;
                    }

                    tenant.rentHistory.push({
                        month: ` ${monthNames[monthIndex]} ${yearOfJoining}`,
                        dueAmount: tenant.rentPrice,
                        paymentStatus: "Unpaid"
                    })
                    monthOfJoining++



                }

                tenant.lastRentGeneratedMonth = `${yearOfJoining}-${monthOfJoining}`;

            }

            await tenant.save();
            return;
        }

        // this structure for only lastRentGeneratedMonth
        let [lastRentYear, lastRentMonth] = tenant.lastRentGeneratedMonth.split("-").map(Number);
        // this nextMonthReached for lastRentGenerated
        const nextMonthReached = currentYear > lastRentYear || (currentYear === lastRentYear && currentMonth > lastRentMonth)

        if (tenant.lastRentGeneratedMonth && nextMonthReached) {
            const monthDifference =
                (currentYear - lastRentYear) * 12 +
                (currentMonth - lastRentMonth);


            for (let i = 0; i < monthDifference; i++) {
                let monthIndex = (lastRentMonth - 1) % 12

                tenant.rentHistory.push({
                    month: ` ${monthNames[monthIndex]} ${lastRentYear}`,
                    dueAmount: tenant.rentPrice,
                    paymentStatus: "Unpaid"
                })
                lastRentMonth++


                if (lastRentMonth > 12) {
                    lastRentMonth = 1;
                    lastRentYear++;
                }
            }

            const totalRent = monthDifference * tenant.rentPrice
            tenant.dueAmount += totalRent;
            tenant.lastRentGeneratedMonth = `${currentYear}-${currentMonth}`;
            await tenant.save()

        }

    } catch (error) {
        return new (ErrorHandler(error.message, 500))
    }
}
