import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  getTenants,
  getRooms,
  getPayments,
  getPendingPayments
} from "../services/api";

import { Bar, Pie, Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import StatCard from "../components/StatCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE = "https://pg-management-system-fvqd.onrender.com/api";

function Dashboard() {

  const [stats, setStats] = useState({
    tenants: 0,
    rooms: 0,
    payments: 0,
    pending: 0,
    vacantRooms: 0
  });

  const [revenueData, setRevenueData] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    await Promise.all([
      fetchStats(),
      fetchRevenue(),
      fetchExpenses(),
      fetchReminders()
    ]);
    setLoading(false);
  };

  const fetchStats = async () => {
    try {

      const tenantsRes = await getTenants();
      const roomsRes = await getRooms();
      const paymentsRes = await getPayments();
      const pendingRes = await getPendingPayments();

      const totalRooms = roomsRes.data?.length || 0;
      const totalTenants = tenantsRes.data?.length || 0;

      setStats({
        tenants: totalTenants,
        rooms: totalRooms,
        payments: paymentsRes.data?.length || 0,
        pending: pendingRes.data?.length || 0,
        vacantRooms: Math.max(totalRooms - totalTenants, 0)
      });

    } catch (err) {
      console.error("Stats error", err);
    }
  };

  const fetchRevenue = async () => {
    try {

      const months = [1, 2, 3, 4, 5, 6];

      const requests = months.map(m =>
        axios.get(`${API_BASE}/payments/revenue/${m}`)
      );

      const responses = await Promise.all(requests);

      const data = responses.map(r => r.data || 0);

      setRevenueData(data);

      const total = data.reduce((a, b) => a + b, 0);
      setRevenue(total);

    } catch (err) {
      console.error("Revenue error", err);
    }
  };

  const fetchExpenses = async () => {
    try {

      const res = await axios.get(`${API_BASE}/expenses`);

      const total = res.data.reduce(
        (sum, e) => sum + (e.amount || 0),
        0
      );

      setExpenses(total);

    } catch (err) {
      console.error("Expense error", err);
    }
  };

  const fetchReminders = async () => {
    try {

      const res = await axios.get(
        `${API_BASE}/payments/rent-reminders`
      );

      setReminders(res.data || []);

    } catch (err) {
      console.error("Reminder error", err);
    }
  };

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  const profit = revenue - expenses;

  const occupancyRate =
    stats.rooms === 0
      ? 0
      : Math.round(
          ((stats.rooms - stats.vacantRooms) / stats.rooms) * 100
        );

  const revenueChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueData,
        backgroundColor: "#3b82f6"
      }
    ]
  };

  const occupancyChart = {
    labels: ["Occupied", "Vacant"],
    datasets: [
      {
        data: [
          stats.rooms - stats.vacantRooms,
          stats.vacantRooms
        ],
        backgroundColor: ["#ef4444", "#22c55e"]
      }
    ]
  };

  const expenseChart = {
    labels: ["Expenses", "Profit"],
    datasets: [
      {
        data: [expenses, profit],
        backgroundColor: ["#f97316", "#10b981"]
      }
    ]
  };

  return (

    <div>

      <h2>PG Management Dashboard</h2>

      <div className="cardGrid">

        <StatCard title="Total Tenants" value={stats.tenants} color="linear-gradient(45deg,#22c55e,#16a34a)" />
        <StatCard title="Total Rooms" value={stats.rooms} color="linear-gradient(45deg,#3b82f6,#2563eb)" />
        <StatCard title="Payments" value={stats.payments} color="linear-gradient(45deg,#f59e0b,#d97706)" />
        <StatCard title="Pending" value={stats.pending} color="linear-gradient(45deg,#ef4444,#dc2626)" />
        <StatCard title="Vacant Rooms" value={stats.vacantRooms} color="linear-gradient(45deg,#8b5cf6,#7c3aed)" />
        <StatCard title="Revenue" value={`₹${revenue}`} color="linear-gradient(45deg,#06b6d4,#0891b2)" />
        <StatCard title="Expenses" value={`₹${expenses}`} color="linear-gradient(45deg,#f97316,#ea580c)" />
        <StatCard title="Profit" value={`₹${profit}`} color="linear-gradient(45deg,#10b981,#059669)" />

      </div>

    </div>
  );
}

export default Dashboard;