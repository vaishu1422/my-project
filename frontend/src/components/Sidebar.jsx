import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./ChatDashboard.css";

export default function Sidebar({ selectedChat, setSelectedChat }) {
  const rooms = ["chat-room-1", "chat-room-2"];
  const { allUsers, currentUser, logout } = useUser();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const getPrivateChatId = (user1, user2) => {
    return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Filtered users based on search
  const filteredUsers = allUsers
    .filter((user) => user.username !== currentUser?.username)
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

   return (
    <div className="sidebar">
      {/* Current User Section - Fixed */}
      {currentUser && (
        <div className="current-user-section">
          <div className="user-info">
            <div className="user-avatar">
              {currentUser.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="username">{currentUser.username}</span>
              <span className="user-status">Online</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="sidebar-content">
        <div className="sidebar-sections-container">
          {/* Rooms Section */}
          <div className="sidebar-section">
            <h3>Rooms</h3>
            <ul>
              {rooms.map((room) => (
                <li
                  key={room}
                  className={selectedChat === room ? "active" : ""}
                  onClick={() => setSelectedChat(room)}
                >
                  {room}
                </li>
              ))}
            </ul>
          </div>

          {/* Users Section - This will be scrollable */}
          <div className="sidebar-section">
            <h3>Users ({filteredUsers.length})</h3>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search users..."
              className="user-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <ul>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const chatId = getPrivateChatId(currentUser.username, user.username);
                  return (
                    <li
                      key={user.id}
                      className={selectedChat === chatId ? "active" : ""}
                      onClick={() => setSelectedChat(chatId)}
                    >
                      <span className="user-status-indicator"></span>
                      {user.username}
                    </li>
                  );
                })
              ) : (
                <div className="empty-users">
                  {searchTerm ? 'No users found' : 'No users available'}
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

}
