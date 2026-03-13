import React, { useEffect, useState } from "react";
import axios from "axios";
import { getTenants } from "../services/api";

function Tenants() {

  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState("");

  const [newTenant, setNewTenant] = useState({
    name: "",
    phone: "",
    email: "",
    roomId: "",
    rent: "",
    depositAmount: "",
    depositStatus: "",
    refundStatus: "NOT_REFUNDED"
  });

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await getTenants();
      setTenants(res.data);
    } catch (err) {
      console.error("Error fetching tenants", err);
    }
  };

  const handleChange = (e) => {
    setNewTenant({
      ...newTenant,
      [e.target.name]: e.target.value
    });
  };

  const handleRoomChange = async (e) => {
    const roomId = e.target.value;

    setNewTenant({
      ...newTenant,
      roomId: roomId
    });

    if (roomId) {
      try {
API.get("/tenants")
        setNewTenant(prev => ({
          ...prev,
          roomId: roomId,
          rent: res.data.rent
        }));

      } catch (err) {
        console.error("Error fetching room rent", err);
      }
    }
  };

  const addTenant = async () => {

    if (!newTenant.name || !newTenant.phone || !newTenant.roomId) {
      alert("Please fill required fields");
      return;
    }

    try {

      await axios.post("http://localhost:8080/api/tenants", {
        name: newTenant.name,
        phone: newTenant.phone,
        email: newTenant.email,
        roomId: Number(newTenant.roomId),
        rent: Number(newTenant.rent),
        depositAmount: Number(newTenant.depositAmount),
        depositStatus: newTenant.depositStatus,
        refundStatus: newTenant.refundStatus
      });

      fetchTenants();

      setNewTenant({
        name: "",
        phone: "",
        email: "",
        roomId: "",
        rent: "",
        depositAmount: "",
        depositStatus: "",
        refundStatus: "NOT_REFUNDED"
      });

    } catch (err) {
      console.error("Error adding tenant", err);
    }
  };

  const checkoutTenant = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/tenants/checkout/${id}`);
      alert("Tenant Checked Out");
      fetchTenants();
    } catch (err) {
      console.error(err);
    }
  };

  const refundDeposit = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/tenants/refund/${id}`);
      alert("Deposit Refunded");
      fetchTenants();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTenants = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div style={{ padding: "30px" }}>

      <h2>Tenants Management</h2>

      <input
        placeholder="Search tenant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "20px"
        }}
      />

      <h3>Add Tenant</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

        <input name="name" placeholder="Name" value={newTenant.name} onChange={handleChange} />

        <input name="phone" placeholder="Phone" value={newTenant.phone} onChange={handleChange} />

        <input name="email" placeholder="Email" value={newTenant.email} onChange={handleChange} />

        <input
          type="number"
          name="roomId"
          placeholder="Room ID"
          value={newTenant.roomId}
          onChange={handleRoomChange}
        />

        <input
          type="number"
          name="rent"
          placeholder="Rent"
          value={newTenant.rent}
          readOnly
        />

        <input
          type="number"
          name="depositAmount"
          placeholder="Deposit"
          value={newTenant.depositAmount}
          onChange={handleChange}
        />

        <select
          name="depositStatus"
          value={newTenant.depositStatus}
          onChange={handleChange}
        >
          <option value="">Deposit Status</option>
          <option value="PAID">PAID</option>
          <option value="PENDING">PENDING</option>
        </select>

        <button
          onClick={addTenant}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Add Tenant
        </button>

      </div>

      <table className="table">

        <thead style={{ background: "#111827", color: "white" }}>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Room</th>
            <th>Rent</th>
            <th>Deposit</th>
            <th>Deposit Status</th>
            <th>Refund</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredTenants.map((tenant) => (

            <tr key={tenant.tenantId} style={{ borderBottom: "1px solid #ddd" }}>

              <td>{tenant.tenantId}</td>
              <td>{tenant.name}</td>
              <td>{tenant.phone}</td>
              <td>{tenant.roomId}</td>
              <td>{tenant.rent}</td>
              <td>{tenant.depositAmount}</td>
              <td>{tenant.depositStatus}</td>
              <td>{tenant.refundStatus}</td>
              <td>{tenant.status}</td>
<td>
<a href={`/tenant/${tenant.tenantId}`}>
View Profile
</a>
</td>
              <td>

                {tenant.status === "ACTIVE" && (
                  <button
                    onClick={() => checkoutTenant(tenant.tenantId)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      marginRight: "5px"
                    }}
                  >
                    Checkout
                  </button>
                )}

                {tenant.refundStatus === "NOT_REFUNDED" && (
                  <button
                    onClick={() => refundDeposit(tenant.tenantId)}
                    style={{
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px"
                    }}
                  >
                    Refund
                  </button>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Tenants;