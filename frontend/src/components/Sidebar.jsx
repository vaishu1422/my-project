import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./ChatDashboard.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Chat");
  const navigate = useNavigate();
  const { currentUser, allUsers, logout, refreshUsers } = useUser();

  // Refresh users when component mounts or when activeMenu changes to Chat
  useEffect(() => {
    if (activeMenu === "Chat") {
      refreshUsers();
    }
  }, [activeMenu, refreshUsers]);

  const handleLogout = () => {
    logout();
    alert("Logged out successfully! 👋");
    navigate("/");
  };

  const handleUserClick = (user) => {
    // You can implement functionality to start a chat with the selected user
    console.log("Starting chat with:", user.username);
    // You might want to set this as the active chat
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "☰" : "×"}
      </button>

      {/* Display current user */}
      {!collapsed && currentUser && (
        <div className="current-user">
          <div className="user-avatar">{currentUser.username.charAt(0)}</div>
          <span className="user-name">{currentUser.username}</span>
          <span className="user-status">Online</span>
        </div>
      )}

      {/* Menu Items */}
      <ul className="menu-list">
        <li
          className={`menu-item ${activeMenu === "Chat" ? "active" : ""}`}
          onClick={() => setActiveMenu("Chat")}
        >
          <span className="menu-icon">💬</span>
          {!collapsed && <span className="menu-text">Chats</span>}
        </li>

        {/* Show users only if not collapsed & Chat is active */}
        {!collapsed && activeMenu === "Chat" && (
          <div className="users-section">
            <div className="section-header">
              <span>All Users ({allUsers.length})</span>
            </div>
            <ul className="user-list">
              {allUsers.map((user) => (
                <li 
                  key={user.id} 
                  className="user-item"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="user-avatar">{user.username.charAt(0)}</div>
                  <div className="user-info">
                    <span className="user-name">{user.username}</span>
                    <span className="user-email">{user.email}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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