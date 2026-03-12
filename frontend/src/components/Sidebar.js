import React from "react";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PaymentIcon from "@mui/icons-material/Payment";
import PendingIcon from "@mui/icons-material/Pending";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from "@mui/icons-material/Logout";

import "../styles/dashboard.css";

function Sidebar({ collapsed }) {

  const location = useLocation();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (

    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <h2 className="logo">PG Manager</h2>

      {/* ADMIN MENU */}
      {role === "ADMIN" && (
        <>
          <Link className={isActive("/dashboard")} to="/dashboard">
            <DashboardIcon/>
            <span>Dashboard</span>
          </Link>

          <Link className={isActive("/tenants")} to="/tenants">
            <PeopleIcon/>
            <span>Tenants</span>
          </Link>

          <Link className={isActive("/rooms")} to="/rooms">
            <MeetingRoomIcon/>
            <span>Rooms</span>
          </Link>

          <Link className={isActive("/payments")} to="/payments">
            <PaymentIcon/>
            <span>Payments</span>
          </Link>

          <Link className={isActive("/pending")} to="/pending">
            <PendingIcon/>
            <span>Pending</span>
          </Link>

          <Link className={isActive("/expenses")} to="/expenses">
            <MoneyIcon/>
            <span>Expenses</span>
          </Link>
        </>
      )}

      {/* TENANT MENU */}
      {role === "TENANT" && (
        <>
          <Link className={isActive("/tenant/dashboard")} to="/tenant/dashboard">
            <DashboardIcon/>
            <span>My Dashboard</span>
          </Link>

          <Link className={isActive("/tenant/payments")} to="/tenant/dashboard">
            <PaymentIcon/>
            <span>My Payments</span>
          </Link>
        </>
      )}

      <button className="logoutBtn" onClick={logout}>
        <LogoutIcon/>
        <span>Logout</span>
      </button>

    </div>

  );
}

export default Sidebar;