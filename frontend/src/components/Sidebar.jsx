import React from "react";
import { useUser } from "../context/UserContext";
import "./ChatDashboard.css";

export default function Sidebar({ selectedRoom, setSelectedRoom }) {
  const rooms = ["chat-room-1", "chat-room-2"];
  const { allUsers } = useUser();

  return (
    <div className="sidebar">
      <h3>Rooms</h3>
      <ul>
        {rooms.map((room) => (
          <li
            key={room}
            className={selectedRoom === room ? "active" : ""}
            onClick={() => setSelectedRoom(room)}
          >
            {room}
          </li>
        ))}
      </ul>

      <h3>Users</h3>
      <ul>
        {allUsers.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
