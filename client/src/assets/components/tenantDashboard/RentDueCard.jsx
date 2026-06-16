import { CreditCard, Calendar, CheckCircle2 } from "lucide-react";
import { paymentOrderCreate } from "../../api/paymentApi";
import axios from "axios";
import toast from "react-hot-toast";

function RentDueCard({ user }) {
    const totalRent = user?.rentAmount || 5000;
    const isPaid = user?.dueAmount === 0;

    const currentMonth = new Date().toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    });

    const handlePayNow = async () => {
        try {
            const { data } = await paymentOrderCreate();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                order_id: data.order.id,

                name: "Rent Payment",
                description: `${currentMonth} Rent Payment`,

                handler: async (response) => {
                    try {
                        const { data } = await axios.post(
                            "http://localhost:5000/api/v1/payment/verify-payment",
                            {
                                razorpay_order_id:
                                    response.razorpay_order_id,
                                razorpay_payment_id:
                                    response.razorpay_payment_id,
                                razorpay_signature:
                                    response.razorpay_signature,
                            },
                            {
                                withCredentials: true,
                            }
                        );

                        if (data.success) {
                            toast.success("Rent paid successfully");


                            navigate("/payment-success", {
                                state: {
                                    paymentId: response.razorpay_payment_id,
                                    orderId: response.razorpay_order_id,
                                    amount: data.order.amount / 100,
                                },
                            });

                        }

                    } catch (error) {
                        console.error(error);


                        toast.error("Payment verification failed");

                        navigate("/payment-failed");


                    }

                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.log(error);
            toast.error("Unable to initiate payment");
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <CreditCard size={18} className="text-blue-600" />
                    <h2 className="font-semibold text-slate-800">
                        Rent Status
                    </h2>
                </div>

                <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {isPaid ? "PAID" : "UNPAID"}
                </span>
            </div>

            {/* Rent Amount */}
            <div
                className={`rounded-2xl p-5 mb-5 ${isPaid
                    ? "bg-green-50 border border-green-100"
                    : "bg-red-50 border border-red-100"
                    }`}
            >
                <p className="text-sm text-slate-500 mb-2">
                    {currentMonth} Rent
                </p>

                <h1
                    className={`text-4xl font-bold mb-2 ${isPaid
                        ? "text-green-700"
                        : "text-red-700"
                        }`}
                >
                    ₹{totalRent.toLocaleString()}
                </h1>

                <p className="text-sm text-slate-600">
                    {isPaid
                        ? `Rent for ${currentMonth} has been paid successfully.`
                        : `Rent payment for ${currentMonth} is pending.`}
                </p>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Calendar size={15} />
                <span>
                    Due Date:{" "}
                    {user?.dueDate
                        ? new Date(user.dueDate).toLocaleDateString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        )
                        : "Not Available"}
                </span>
            </div>

            {/* Action */}
            {isPaid ? (
                <div className="flex items-center justify-center gap-2 bg-green-100 text-green-700 py-3 rounded-2xl font-semibold">
                    <CheckCircle2 size={18} />
                    Rent Paid Successfully
                </div>
            ) : (
                <button
                    onClick={handlePayNow}
                    className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold py-3 rounded-2xl transition hover:opacity-90"
                >
                    Pay Rent ₹{totalRent.toLocaleString()}
                </button>
            )}
        </div>
    );
}

export default RentDueCard;