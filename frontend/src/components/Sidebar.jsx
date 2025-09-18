import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./ChatDashboard.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const navigate = useNavigate(); // ✅ Initialize navigate

  const users = ["Alice", "Bob", "Charlie"];

  // Logout function
  const handleLogout = () => {
    alert("Logged out successfully! 👋");
    navigate("/"); // ✅ Redirect to login page
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "☰" : "×"}
      </button>

      {/* Menu Items */}
      <ul className="menu-list">
        {/* <li
          className={`menu-item ${activeMenu === "Home" ? "active" : ""}`}
          onClick={() => setActiveMenu("Home")}
        >
          <span className="menu-icon">🏠</span>
          {!collapsed && <span className="menu-text">Home</span>}
        </li> */}

        <li
          className={`menu-item ${activeMenu === "Chat" ? "active" : ""}`}
          onClick={() => setActiveMenu("Chat")}
        >
          <span className="menu-icon">💬</span>
          {!collapsed && <span className="menu-text">Chat</span>}
        </li>

        {/* Show users only if not collapsed & Chat is active */}
        {!collapsed && activeMenu === "Chat" && (
          <ul className="user-list">
            {users.map((user, index) => (
              <li key={index} className="user-item">
                <div className="user-avatar">{user.charAt(0)}</div>
                <span className="user-name">{user}</span>
              </li>
            ))}
          </ul>
        )}

        <li
          className={`menu-item ${activeMenu === "Groups" ? "active" : ""}`}
          onClick={() => setActiveMenu("Groups")}
        >
          <span className="menu-icon">👥</span>
          {!collapsed && <span className="menu-text">Groups</span>}
        </li>
      </ul>

      {/* Logout at bottom */}
      <button className="logout-btn" onClick={handleLogout}>
        🚪 {!collapsed && "Logout"}
      </button>
    </div>
  );
}
