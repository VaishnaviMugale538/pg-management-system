import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants";
import Rooms from "./pages/Rooms";
import Payments from "./pages/Payments";
import PendingPayments from "./pages/PendingPayments";
import Expenses from "./pages/Expenses";
import TenantDetails from "./pages/TenantDetails";
import BookRoom from "./pages/BookRoom";

import "./styles/dashboard.css";

function Layout() {

  const location = useLocation();

  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/book-room";

  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="layout">

      {!hideLayout && <Sidebar collapsed={collapsed} />}

      <div className={`contentArea ${collapsed ? "collapsed" : ""}`}>

        {!hideLayout && (
          <Navbar toggleSidebar={toggleSidebar} collapsed={collapsed} />
        )}

        <div className="mainContent">

          <Routes>

            {/* Login */}
            <Route path="/" element={<Login />} />

            {/* Tenant */}
            <Route path="/tenant/dashboard" element={<TenantDetails />} />

            {/* Admin */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/tenant/:id" element={<TenantDetails />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/pending" element={<PendingPayments />} />
            <Route path="/expenses" element={<Expenses />} />

            {/* Public */}
            <Route path="/book-room" element={<BookRoom />} />

          </Routes>

        </div>

      </div>

    </div>
  );
}

export default function App() {
  return <Layout />;
}