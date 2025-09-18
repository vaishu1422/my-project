import React from "react";
import "./ChatDashboard.css";

export default function ChatRoom({ messages }) {
  return (
    <div className="chat-room">
      {messages.map((msg, index) => (
        <p key={index}>
          <strong>{msg.sender}:</strong> {msg.text}
        </p>
      ))}
    </div>
  );
}
