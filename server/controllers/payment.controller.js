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
            amount: Math.round(user.dueAmount * 100),
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
    let user;
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
    let month;
    let year;

    try {

        user = await User.findById(id);
        const dueAmountPreserve = user.dueAmount;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex")


        if (user.nextRentGeneratedMonth) {
            month = Number(user.nextRentGeneratedMonth.split("-")[1]);
            year = Number(user.nextRentGeneratedMonth.split("-")[0]);
        } else {
            month = new Date(user.joiningDate).toLocaleString("en-US", {
                month: "long",
            });
        }


        if (generatedSignature !== razorpay_signature) {
            let payment = PaymentHistory.create({
                tenant: id,
                amount: dueAmountPreserve,
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                month: `${monthNames[month - 2]} ${year}`,
                status: "Failed",
            })

            return next(new ErrorHandler("payment not verify ", 400))
        }


        let payment = PaymentHistory.create({
            tenant: id,
            amount: dueAmountPreserve,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            month: `${monthNames[month - 2]} ${year}`,
            status: "success",
        })

        user.paymentStatus = "Paid";
        user.dueAmount = 0;

        // updating status in rent history
        user.rentHistory.forEach((status) => {
            console.log(status)
            console.log(typeof (status.paidOn))
            if (status.paymentStatus === "Unpaid" && status.paidOn === null) {
                status.paymentStatus = "Paid"
                status.paidOn = Date.now();
            }

        })

        await user.save();

        res.status(200).json({
            success: true,
            message: "payment successfully done",
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            amount: dueAmountPreserve

        })

    } catch (error) {
        const payment = PaymentHistory.create({
            tenant: id,
            amount: user.dueAmount,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            month: monthNames[month - 1],
            status: "Failed",
        })
        await user.save()
        return next(new ErrorHandler(error.message, 500))
    }
}

// this api use for every check use is paid or not 
export const paymentCheck = async (req, res, next) => {
    const { id } = req.user

    try {
        const tenant = await User.findById(id);

        // this is for current date month and year
        const today = new Date();
        const currentMonth = today.getMonth() + 2;
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


        if (!nextMonthReached) {
            return next(new ErrorHandler("existing month joining", 400))
        }
        console.log(!tenant.nextRentGeneratedMonth, nextMonthReached)

        if (!tenant.nextRentGeneratedMonth && nextMonthReached) {
            console.log("start")
            const totalDaysInMonth = new Date(
                yearOfJoining,
                monthOfJoining,
                0
            ).getDate();

            const remainingDays = totalDaysInMonth - dateOfJoining;
            const calculateDueAmount = (tenant.rentPrice / totalDaysInMonth) * (remainingDays + 1)
            tenant.dueAmount = Math.round(calculateDueAmount);
            tenant.lastRentAmount = tenant.dueAmount

            tenant.nextRentGeneratedMonth = `${monthOfJoining === 12 ? yearOfJoining + 1 : yearOfJoining}-${monthOfJoining === 12 ? 1 : monthOfJoining + 1}`;

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

                    tenant.lastRentAmount = tenant.rentPrice
                    monthOfJoining++

                }

                tenant.nextRentGeneratedMonth = `${monthOfJoining === 12 ? yearOfJoining + 1 : yearOfJoining}-${monthOfJoining === 12 ? 1 : monthOfJoining + 1}`;


            }

            console.log(tenant.nextRentGeneratedMonth, "tenant.nextRentGeneratedMonth")

            await tenant.save();
            return res.status(200).json({
                success: true,
                message: "tenant due added by joining date successfully",
                tenant
            })

        }


        // this structure for only lastRentGeneratedMonth

        let [lastRentYear, lastRentMonth] = tenant.nextRentGeneratedMonth.split("-").map(Number);


        // this nextMonthReached for lastRentGenerated
        const nextMonthReachedRentGenerated = currentYear > lastRentYear || (currentYear === lastRentYear && currentMonth > lastRentMonth)

        if (!nextMonthReachedRentGenerated) {
            return next(new ErrorHandler("existing month for generated month", 400))
        }

        if (tenant.nextRentGeneratedMonth && nextMonthReachedRentGenerated) {
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

                tenant.paymentStatus = "Unpaid"
                tenant.lastRentAmount = tenant.rentPrice


                if (lastRentMonth > 12) {
                    lastRentMonth = 1;
                    lastRentYear++;
                }
            }

            const totalRent = monthDifference * tenant.rentPrice
            tenant.dueAmount += totalRent;
            tenant.nextRentGeneratedMonth = `${currentYear}-${currentMonth}`;
            await tenant.save()

        }

        res.status(200).json({
            success: true,
            message: "tenant due added by nextMonthReachedRentGenerated date successfully",
            tenant
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const paymentHistory = async (req, res, next) => {
    const { id } = req.user;

    console.log("id>>>", id)

    try {
        const paymentHistoryByUser = await PaymentHistory.find({ tenant: id })
        console.log(paymentHistoryByUser)

        res.status(200).json({
            success: true,
            message: "here all the payment history",
            paymentHistoryByUser
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }

}