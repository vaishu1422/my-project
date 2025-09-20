import React, { useState, useEffect } from "react";
import "./ChatDashboard.css";

export default function Sidebar({ onSelectUser, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [users, setUsers] = useState([]);

  // 🔹 Fetch active users from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/chat/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "☰" : "×"}
      </button>

      {/* Menu Items */}
      <ul className="menu-list">
        <li
          className={`menu-item ${activeMenu === "Home" ? "active" : ""}`}
          onClick={() => setActiveMenu("Home")}
        >
          <span className="menu-icon">🏠</span>
          {!collapsed && <span className="menu-text">Home</span>}
        </li>

        <li
          className={`menu-item ${activeMenu === "Chat" ? "active" : ""}`}
          onClick={() => setActiveMenu("Chat")}
        >
          <span className="menu-icon">💬</span>
          {!collapsed && <span className="menu-text">Chat</span>}
        </li>

        {/* Users List (Visible only in Chat menu) */}
        {!collapsed && activeMenu === "Chat" && (
          <ul className="user-list">
            {users.length > 0 ? (
              users.map((user, index) => (
                <li
                  key={index}
                  className="user-item"
                  onClick={() => onSelectUser(user)}
                >
                  <div className="user-avatar">{user.charAt(0).toUpperCase()}</div>
                  <span className="user-name">{user}</span>
                </li>
              ))
            ) : (
              <p className="no-users">No users online</p>
            )}
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

      {/* Logout Button */}
      <button className="logout-btn" onClick={onLogout}>
        🚪 {!collapsed && "Logout"}
      </button>
    </div>
  );
}
