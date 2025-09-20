import React, { useEffect, useRef } from "react";
import { useUser } from "../context/UserContext";
import "./ChatDashboard.css";

export default function ChatRoom({ messages }) {
  const chatEndRef = useRef(null);
  const { currentUser } = useUser();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-room-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === currentUser?.username ? "self" : "other"}`}
          >
            <span className="sender">{msg.sender}</span>
            <span className="message">{msg.content}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
