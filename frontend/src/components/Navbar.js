import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ toggleSidebar, collapsed }) {

  return (

    <div className={`navbar ${collapsed ? "collapsed" : ""}`}>

      <div style={{display:"flex",alignItems:"center",gap:"15px"}}>

        <MenuIcon
          style={{cursor:"pointer"}}
          onClick={toggleSidebar}
        />

        <h3>PG Management System</h3>

      </div>

      <div className="profile">

        <span>Admin</span>

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
        />

      </div>

    </div>

  );
}

export default Navbar;