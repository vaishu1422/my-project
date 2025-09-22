import React, { useEffect, useRef } from "react";
import { useUser } from "../context/UserContext";
import "./ChatDashboard.css";

export default function ChatRoom({ messages, selectedChat }) {
  const chatEndRef = useRef(null);
  const { currentUser } = useUser();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-room-container">
      <h2 className="chat-header">Chat: {selectedChat}</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              msg.sender === currentUser?.username ? "self" : "other"
            }`}
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
