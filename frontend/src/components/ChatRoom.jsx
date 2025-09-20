import React, { useEffect, useRef } from "react";
import { useUser } from "../context/UserContext"; // Import the hook
import "./ChatDashboard.css";

export default function ChatRoom({ messages }) {
  const chatEndRef = useRef(null);
  const { currentUser } = useUser(); // Get current user

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-room-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === currentUser?.username ? "self" : "other"}`}
          >
            <span className="sender">{msg.sender}</span>
            <span className="message">{msg.text}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}