import React, { useEffect, useRef } from "react";
import "./ChatDashboard.css";

export default function ChatRoom({ messages }) {
  const chatEndRef = useRef(null);

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
            className={`chat-bubble ${
              msg.sender === "You" ? "self" : "other"
            }`}
          >
            <span className="sender">{msg.sender}</span>
            <span className="message">{msg.message || msg.text}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
