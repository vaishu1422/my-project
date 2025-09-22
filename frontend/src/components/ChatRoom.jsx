import React, { useEffect, useRef } from "react";
import { useUser } from "../context/UserContext";
import "./ChatDashboard.css";

export default function ChatRoom({ messages, selectedChat }) {
  const chatEndRef = useRef(null);
  const { currentUser } = useUser();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Display name logic
  const getChatHeader = () => {
    if (selectedChat.startsWith("chat-room")) {
      return selectedChat; // Group chat
    } else {
      const users = selectedChat.split("_");
      return users[0] === currentUser.username ? users[1] : users[0]; // Private chat
    }
  };

  return (
    <div className="chat-room-container">
      {/* Header Section */}
      <div className="chat-header-section">
        <h2 className="chat-header-name">{getChatHeader()}</h2>
      </div>

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
