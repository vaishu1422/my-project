import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./ChatDashboard.css";

export default function Sidebar({ selectedChat, setSelectedChat }) {
  const rooms = ["chat-room-1", "chat-room-2"];
  const { allUsers, currentUser, logout } = useUser();
  const navigate = useNavigate();

  const getPrivateChatId = (user1, user2) => {
    return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sidebar">
      {/* Current User Section */}
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
              #{room}
            </li>
          ))}
        </ul>
      </div>

      {/* Users Section */}
      <div className="sidebar-section">
        <h3>Users ({allUsers.length})</h3>
        <ul>
          {allUsers
            .filter((user) => user.username !== currentUser?.username)
            .map((user) => {
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
            })}
        </ul>
      </div>
    </div>
  );
}