import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://pg-management-system-fvqd.onrender.com/api";

function PendingPayments() {

  const [pendingPayments, setPendingPayments] = useState([]);

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      const response = await axios.get(`${API}/payments/pending`);
      setPendingPayments(response.data || []);
    } catch (error) {
      console.error("Error fetching pending payments", error);
    }
  };

  const payRent = async (id) => {

    try {

      await axios.put(`${API}/payments/pay/${id}`);

      alert("Rent Paid Successfully");

      fetchPendingPayments();

    } catch (error) {

      console.error("Error paying rent", error);

    }

  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Pending Payments</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Tenant ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {pendingPayments.length === 0 ? (

            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No pending payments
              </td>
            </tr>

          ) : (

            pendingPayments.map((payment) => (

              <tr key={payment.paymentId}>

                <td>{payment.paymentId}</td>

                <td>{payment.tenantId}</td>

                <td>₹{payment.amount}</td>

                <td style={{ color: "red", fontWeight: "bold" }}>
                  {payment.status}
                </td>

                <td>{payment.paymentDate}</td>

                <td>
                  <button
                    onClick={() => payRent(payment.paymentId)}
                    style={{
                      background: "#16a34a",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Pay Rent
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

export default PendingPayments;