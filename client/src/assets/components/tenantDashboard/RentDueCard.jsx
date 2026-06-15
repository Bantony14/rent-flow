import { CreditCard, Calendar, Currency, OptionIcon } from "lucide-react";
import { paymentOrderCreate } from "../../api/paymentApi";
import axios from "axios";
import toast from "react-hot-toast";

const rentInfo = {
    amount: "₹12,000",
    dueDate: "05 June 2026",
    status: "Upcoming",
};

function RentDueCard({ rentDue, }) {

    const handlePayNow = async () => {
        try {
            const { data } = await paymentOrderCreate();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: data.order.amount,
                currency: data.order.currency,
                order_id: data.order.id,

                handler: async (response) => {
                    const { data } = await axios.post("http://localhost:5000/api/v1/payment/verify-payment", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }, { withCredentials: true }
                    )

                    if (data.success) {
                        toast.success("Payment Successful");
                    }


                }
            }
            const razorpay = new window.Razorpay(options);
            razorpay.open();


        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <CreditCard size={18} className="text-red-500" />
                <h2 className="text-sm font-semibold text-slate-800">Rent Due</h2>
                <span className="ml-auto text-xs font-semibold bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full">
                    {rentInfo.status}
                </span>
            </div>
            <p className="text-4xl font-bold text-slate-800 font-mono tracking-tight">
                ₹{rentDue}/-
            </p>
            <p className="text-slate-500 text-sm mt-1 mb-4 flex items-center gap-1">
                <Calendar size={13} /> Due on {rentInfo.dueDate}
            </p>
            <button
                onClick={handlePayNow}
                className="bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-105 transition-transform"
            >
                Pay Now →
            </button>
        </div>
    );
}

export default RentDueCard;