import React, { useEffect, useState } from "react";
import axios from "axios";

function PendingPayments() {

  const [pendingPayments, setPendingPayments] = useState([]);

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/payments/pending");
      setPendingPayments(response.data);
    } catch (error) {
      console.error("Error fetching pending payments", error);
    }
  };
const payRent = async (id) => {

  try {

    await axios.put(`http://localhost:8080/api/payments/pay/${id}`);

    alert("Rent Paid Successfully");

    fetchPendingPayments();

  } catch (error) {

    console.error(error);

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
          </tr>
        </thead>

        <tbody>
          {pendingPayments.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{payment.tenantId}</td>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
              <td>{payment.paymentDate}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default PendingPayments;