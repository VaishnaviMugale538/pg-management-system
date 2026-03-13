import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://pg-management-system-fvqd.onrender.com/api";

function TenantDetails() {

  const tenantId = localStorage.getItem("userId");

  const [tenant, setTenant] = useState(null);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchTenant();
    fetchPayments();
  }, []);

  const fetchTenant = async () => {
    try {
      const res = await axios.get(`${API}/tenants/${tenantId}`);
      setTenant(res.data);
    } catch (error) {
      console.error("Error loading tenant", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await axios.get(`${API}/payments/tenant/${tenantId}`);
      setPayments(res.data || []);
    } catch (error) {
      console.error("Error loading payments", error);
    }
  };

  const payRent = async (paymentId) => {

    try {

      await axios.put(`${API}/payments/pay/${paymentId}`);

      alert("Payment Successful");

      fetchPayments();

    } catch (error) {

      console.error("Payment failed", error);

    }

  };

  if (!tenant) return <h2>Loading...</h2>;

  return (

    <div style={{ padding: "20px" }}>

      <h2>Tenant Dashboard</h2>

      <div className="chartCard">

        <p><b>Name:</b> {tenant.name}</p>
        <p><b>Email:</b> {tenant.email}</p>
        <p><b>Phone:</b> {tenant.phone}</p>
        <p><b>Room:</b> {tenant.roomId}</p>
        <p><b>Rent:</b> ₹{tenant.rent}</p>
        <p><b>Deposit:</b> ₹{tenant.depositAmount}</p>

      </div>

      <h3 style={{ marginTop: "30px" }}>Payment History</h3>

      <table className="table">

        <thead>
          <tr>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {payments.length === 0 ? (

            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No payments found
              </td>
            </tr>

          ) : (

            payments.map((p) => (

              <tr key={p.paymentId}>

                <td>₹{p.amount}</td>

                <td style={{ fontWeight: "bold" }}>
                  {p.status}
                </td>

                <td>{p.paymentDate}</td>

                <td>

                  {p.status === "PENDING" ? (

                    <button
                      onClick={() => payRent(p.paymentId)}
                      style={{
                        padding: "6px 12px",
                        background: "#22c55e",
                        color: "white",
                        border: "none",
                        borderRadius: "4px"
                      }}
                    >
                      Pay Now
                    </button>

                  ) : (

                    <span style={{ color: "green" }}>Paid</span>

                  )}

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );
}

export default TenantDetails;