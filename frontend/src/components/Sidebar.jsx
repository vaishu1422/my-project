import React from "react";
import { useUser } from "../context/UserContext";
import "./ChatDashboard.css";

export default function Sidebar({ selectedChat, setSelectedChat }) {
  const rooms = ["chat-room-1", "chat-room-2"];
  const { allUsers, currentUser } = useUser();

  // ✅ Helper: unique private chatId banane ke liye
  const getPrivateChatId = (user1, user2) => {
    return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
  };

  return (
    <div className="sidebar">
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

      <h3>Users</h3>
      <ul>
        {allUsers
          .filter((user) => user.username !== currentUser.username) // khud ko list me mat dikhana
          .map((user) => {
            const chatId = getPrivateChatId(currentUser.username, user.username);
            return (
              <li
                key={user.id}
                className={selectedChat === chatId ? "active" : ""}
                onClick={() => setSelectedChat(chatId)}
              >
                {user.username}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
