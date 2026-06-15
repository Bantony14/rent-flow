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

        console.log(generatedSignature)
        console.log(razorpay_signature)
        if (generatedSignature !== razorpay_signature) {
            return next(new ErrorHandler("payment not verify ", 400))
        }
        console.log("done")
        user.paymentStatus = "Paid";
        await user.save()
        console.log("done")
        console.log("done")

        res.status(200).json({
            success: true,
            message: "payment successfully done"
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}