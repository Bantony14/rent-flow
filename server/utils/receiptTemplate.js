const receiptTemplate = ({
    fullName,
    amount,
    paymentId,
    orderId,
    roomNumber,
    building,
    paymentDate,
}) => {
    return `
    < !DOCTYPE html >
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>

            <body style="margin:0; padding:0; background:#f2f2f2; font-family:Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2; padding:40px 15px;">
                    <tr>
                        <td align="center">

                            <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden;"
                            >

                                <tr>
                                    <td style="background:#0f1117; padding:28px 40px; text-align:center;">
                                        <span style="font-size:24px; color:#ffffff; font-weight:700;">
                                            🧾 Rent Payment Receipt
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="background:#22c55e; height:4px; font-size:0;">
                                        &nbsp;
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:40px;">

                                        <h2 style="margin:0 0 10px; color:#111;">
                                            Payment Successful 🎉
                                        </h2>

                                        <p style="color:#555; line-height:1.7; margin-bottom:30px;">
                                            Hello <strong>${fullName}</strong>,
                                            your rent payment has been received successfully.
                                            Below are your payment details.
                                        </p>

                                        <table
                                            width="100%"
                                            cellpadding="12"
                                            cellspacing="0"
                                            style="
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    overflow:hidden;
                  "
                                        >
                                            <tr>
                                                <td style="background:#f9fafb; width:40%;"><strong>Tenant Name</strong></td>
                                                <td>${fullName}</td>
                                            </tr>

                                            <tr>
                                                <td style="background:#f9fafb;"><strong>Building</strong></td>
                                                <td>${building}</td>
                                            </tr>

                                            <tr>
                                                <td style="background:#f9fafb;"><strong>Room Number</strong></td>
                                                <td>${roomNumber}</td>
                                            </tr>

                                            <tr>
                                                <td style="background:#f9fafb;"><strong>Amount Paid</strong></td>
                                                <td>₹${amount}</td>
                                            </tr>

                                            <tr>
                                                <td style="background:#f9fafb;"><strong>Payment Date</strong></td>
                                                <td>${paymentDate}</td>
                                            </tr>

                                            <tr>
                                                <td style="background:#f9fafb;"><strong>Payment ID</strong></td>
                                                <td>${paymentId}</td>
                                            </tr>

                                            <tr>
                                                <td style="background:#f9fafb;"><strong>Order ID</strong></td>
                                                <td>${orderId}</td>
                                            </tr>
                                        </table>

                                        <table
                                            width="100%"
                                            cellpadding="0"
                                            cellspacing="0"
                                            style="
                    margin-top:25px;
                    background:#f0fdf4;
                    border:1px solid #86efac;
                    border-radius:8px;
                  "
                                        >
                                            <tr>
                                                <td style="padding:14px; color:#166534;">
                                                    ✅ Please keep this email as proof of payment.
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="margin-top:30px; color:#444; line-height:1.7;">
                                            Regards,<br />
                                            <strong>RentFlow Team</strong>
                                        </p>

                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style="
                  border-top:1px solid #eee;
                  padding:18px;
                  text-align:center;
                  color:#999;
                  font-size:12px;
                "
                                    >
                                        This is an automated receipt generated by RentFlow.
                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>
                </table>
            </body>
        </html>
`;
};

export default receiptTemplate;

