import mongoose from "mongoose";
import User from "./user.model";
import PaymentHistory from "./paymentHistory.model";

const receiptSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PaymentHistory",
            required: true
        },
        receipt: {
            type: String,
            unique: true,
            required: true
        },
        months: [
            {
                month: String,
                amount: Number
            }
        ],
        totalAmount: {
            type: Number,
            required: true
        },
        paymentMethod: String
    },
    {
        timestamps: true
    }
);

const receiptHistory = mongoose.model("receiptHistory", receiptSchema)

export default receiptHistory;