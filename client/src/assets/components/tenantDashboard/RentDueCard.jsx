import { CreditCard, Calendar, CheckCircle2 } from "lucide-react";
import { paymentOrderCreate } from "../../api/paymentApi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RentDueCard({ user }) {
    const navigate = useNavigate();
    const totalRent = user?.rentPrice;
    const isPaid = user?.paymentStatus
    const dueAmount = user?.dueAmount


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

    const date = new Date(user.joiningDate);

    const joiningMonth = date.getMonth();
    const joiningYear = date.getFullYear();

    let month = Number(user.nextRentGeneratedMonth.split("-")[1]);
    let year = Number(user.nextRentGeneratedMonth.split("-")[0]);

    const handlePayNow = async () => {
        try {
            const { data } = await paymentOrderCreate();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                order_id: data.order.id,

                name: "Rent Payment",
                description: user.nextRentGeneratedMonth
                    ? `${monthNames[month - 2]} ${year} Rent Payment`
                    : `${monthNames[joiningMonth - 1]} ${joiningYear} Rent Payment`,

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
                                    amount: data.amount / 100,
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
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${isPaid === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {isPaid}
                </span>
            </div>

            {/* Rent Amount */}
            <div
                className={`rounded-2xl p-6 mb-5 shadow-sm ${isPaid === "Paid"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                    }`}
            >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm text-slate-500">
                            {user.nextRentGeneratedMonth ? (`${monthNames[month - 2]} ${year} Rent`)
                                : (`${monthNames[joiningMonth - 2]} ${joiningYear} Rent`)}
                        </p>

                        <h1
                            className={`text-4xl font-bold mt-1 ${isPaid === "Paid" ? "text-green-700" : "text-red-700"
                                }`}
                        >
                            ₹{user.lastRentAmount}
                        </h1>
                    </div>

                </div>

                <p className="text-sm text-slate-600 mb-4">
                    {isPaid === "Paid"
                        ? `Rent for ${monthNames[month - 2]} ${year} has been paid successfully.`
                        : `Rent payment for ${monthNames[month - 2]} ${year} is pending.`}
                </p>

                <div className="flex items-center justify-between bg-white rounded-xl p-4 border">
                    <span className="text-slate-600 font-medium">Due Amount</span>

                    <span
                        className={`text-xl font-bold ${dueAmount > 0 ? "text-red-600" : "text-green-600"
                            }`}
                    >
                        ₹{dueAmount.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Calendar size={15} />
                <span>
                    {isPaid === "Paid" ? (
                        <span>
                            Next Rent Due: {monthNames[month - 1]} {year}
                        </span>
                    ) : (
                        <span>
                            Pending Rent: {monthNames[month - 2]} {year}
                        </span>
                    )}
                </span>
            </div>

            {/* Action */}
            {isPaid === "Paid" ? (
                <div className="flex items-center justify-center gap-2 bg-green-100 text-green-700 py-3 rounded-2xl font-semibold">
                    <CheckCircle2 size={18} />
                    Rent Paid Successfully
                </div>
            ) : (
                <button
                    onClick={handlePayNow}
                    className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold py-3 rounded-2xl transition hover:opacity-90"
                >
                    Pay Rent ₹{dueAmount.toLocaleString()}
                </button>
            )}
        </div>
    );
}

export default RentDueCard;