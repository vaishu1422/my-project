import React from "react";
import "./ChatDashboard.css"

export default function Sidebar() {
  const users = ["Alice", "Bob", "Charlie"];
  return (
    <div className="sidebar">
      <h3>Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
