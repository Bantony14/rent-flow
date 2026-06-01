import { History } from "lucide-react";

const paymentHistory = [
  { month: "May 2026", amount: "₹12,000", status: "Paid" },
  { month: "April 2026", amount: "₹12,000", status: "Paid" },
  { month: "March 2026", amount: "₹12,000", status: "Paid" },
];

const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
};

function PaymentHistoryCard() {
  return (
    <div className="sm:col-span-2 bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <History size={18} className="text-blue-600" />
        <h2 className="text-sm font-semibold text-slate-800">Payment History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              {["Month", "Amount", "Status"].map((col) => (
                <th
                  key={col}
                  className="text-left py-2 px-1 text-xs uppercase tracking-wide text-slate-400 font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((row, i) => (
              <tr key={i} className="border-b border-slate-50 last:border-0">
                <td className="py-3 px-1 text-slate-700">{row.month}</td>
                <td className="py-3 px-1 font-mono text-slate-700">{row.amount}</td>
                <td className="py-3 px-1">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[row.status] ?? "bg-slate-100 text-slate-600"
                      }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistoryCard;