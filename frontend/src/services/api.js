import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

// Dashboard
export const getDashboardStats = () => API.get("/dashboard");

// Tenants
export const getTenants = () => API.get("/tenants");

// Rooms
export const getRooms = () => API.get("/rooms");

// Payments
export const getPayments = () => API.get("/payments");

// Pending payments
export const getPendingPayments = () => API.get("/payments/pending");

// Expenses
export const getExpenses = () => API.get("/expenses");

// Rent reminders
export const getRentReminders = () => API.get("/dashboard/rent-reminders");