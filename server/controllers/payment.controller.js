import { razorpay } from "../app.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import ErrorHandler from "../utils/error.js";
import PaymentHistory from "../models/paymentHistory.model.js";



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


        const user = await User.findById(id);

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex")


        if (generatedSignature !== razorpay_signature) {
            return next(new ErrorHandler("payment not verify ", 400))
        }
        console.log("Before:", user.paymentStatus, user.dueAmount);
        let month;

        if (user.lastRentGeneratedMonth) {
            month = Number(user.lastRentGeneratedMonth.split("-")[1]);
        } else {
            month = new Date(user.joiningDate).toLocaleString("en-US", {
                month: "long",
            });
        }
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

        const payment = PaymentHistory.create({
            tenant: id,
            amount: 5000,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            month: monthNames[month - 1],
            status: "Paid",
        })

        user.paymentStatus = "Paid";
        user.dueAmount = 0;

        await user.save();




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
        const currentMonth = today.getMonth() + 10;
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
        console.log("currentMonth>>>", currentMonth)
        console.log("monthOfjoining>>>>", monthOfJoining)
        console.log("nextMonthReached>>>", nextMonthReached)
        console.log(tenant.lastRentGeneratedMonth)

        if (!nextMonthReached) {
            return next(new ErrorHandler("existing month joining"))
        }
        console.log(!tenant.lastRentGeneratedMonth, nextMonthReached)

        if (!tenant.lastRentGeneratedMonth && nextMonthReached) {
            console.log("start")
            const totalDaysInMonth = new Date(
                yearOfJoining,
                monthOfJoining,
                0
            ).getDate();

            const remainingDays = totalDaysInMonth - dateOfJoining;
            const calculateDueAmount = (tenant.rentPrice / totalDaysInMonth) * (remainingDays + 1)
            tenant.dueAmount = Math.round(calculateDueAmount);

            tenant.lastRentGeneratedMonth = `${monthOfJoining === 12 ? yearOfJoining + 1 : yearOfJoining}-${monthOfJoining === 12 ? 1 : monthOfJoining + 1}`;

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
                        monthOfJoining = 0;
                        yearOfJoining++;
                    }

                    tenant.rentHistory.push({
                        month: ` ${monthNames[monthIndex]} ${yearOfJoining}`,
                        dueAmount: tenant.rentPrice,
                        paymentStatus: "Unpaid"
                    })
                    monthOfJoining++

                }

                tenant.lastRentGeneratedMonth = `${monthOfJoining === 12 ? yearOfJoining + 1 : yearOfJoining}-${monthOfJoining === 12 ? 1 : monthOfJoining + 1}`;

            }

            console.log(tenant.lastRentGeneratedMonth, "tenant.lastRentGeneratedMonth")

            await tenant.save();
            return res.status(200).json({
                success: true,
                message: "tenant due added by joining date successfully",
                tenant
            })

        }


        // this structure for only lastRentGeneratedMonth

        let [lastRentYear, lastRentMonth] = tenant.lastRentGeneratedMonth.split("-").map(Number);
        console.log("lastRentYear", lastRentYear)
        console.log("lastRentMonth", lastRentMonth)
        console.log(currentYear, "currentYear")
        console.log(currentMonth, "currentMonth")


        // this nextMonthReached for lastRentGenerated
        const nextMonthReachedRentGenerated = currentYear > lastRentYear || (currentYear === lastRentYear && currentMonth > lastRentMonth)

        if (!nextMonthReachedRentGenerated) {
            return next(new ErrorHandler("existing month for generated month"))
        }

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

        res.status(200).json({
            success: true,
            message: "tenant due added by lastRentGeneratedMonth date successfully",
            tenant
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}
