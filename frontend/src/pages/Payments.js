import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Payments() {

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/payments");
      setPayments(response.data || []);
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };

  const exportCSV = () => {

    if (payments.length === 0) {
      alert("No payment data to export");
      return;
    }

    let csv = "PaymentID,TenantID,Amount,Status,Date\n";

    payments.forEach(p => {
      csv += `${p.paymentId},${p.tenantId},${p.amount},${p.status},${p.paymentDate}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "payments_report.csv";

    a.click();
  };
  const generateReceipt = (payment) => {

  const doc = new jsPDF();

  doc.text("PG Manager - Rent Receipt", 20, 20);
  doc.text(`Tenant ID: ${payment.tenantId}`, 20, 40);
  doc.text(`Amount: ₹${payment.amount}`, 20, 50);
  doc.text(`Status: ${payment.status}`, 20, 60);
  doc.text(`Date: ${payment.paymentDate}`, 20, 70);

  doc.save("receipt.pdf");

};

  return (
    <div style={{ padding: "30px" }}>

      <h2>Payments Management</h2>

      <button
        onClick={exportCSV}
        style={{
          background: "#2563EB",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Export Report
      </button>

      <table className="table">

        <thead style={{ background: "#111827", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Tenant ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {payments.length === 0 ? (

            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                No payment records found
              </td>
            </tr>

          ) : (

            payments.map((payment) => (

              <tr key={payment.paymentId} style={{ borderBottom: "1px solid #ddd" }}>

                <td>{payment.paymentId}</td>

                <td>{payment.tenantId}</td>

                <td>₹{payment.amount}</td>

                <td
                  style={{
                    color: payment.status === "PAID" ? "green" : "red",
                    fontWeight: "bold"
                  }}
                >
                  {payment.status}
                </td>

                <td>{payment.paymentDate}</td>
                <td>
<button onClick={()=>generateReceipt(payment)}>
Download Receipt
</button>
</td>
              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Payments;