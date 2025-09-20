import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatRoom from "./ChatRoom";
import MessageBox from "./MessageBox";
import "./ChatDashboard.css";

export default function ChatDashboard() {
  const [messages, setMessages] = useState([]);

  // ✅ Chat history load karna
  useEffect(() => {
    fetch("http://localhost:8080/api/chat/chat-room-1")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  // ✅ Naya message bhejna
  const handleSendMessage = async (text) => {
    if (text.trim() !== "") {
      const newMsg = { sender: "You", message: text };

      // Pehle UI me dikhado
      setMessages((prev) => [...prev, newMsg]);

      // Backend ko bhejo
      try {
        await fetch("http://localhost:8080/api/chat/chat-room-1", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chat-dashboard">
      <Sidebar />
      <div className="chat-area">
        <ChatRoom messages={messages} />
        <MessageBox onSend={handleSendMessage} />
      </div>
    </div>
  );
}
