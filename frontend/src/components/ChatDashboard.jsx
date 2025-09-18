import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatRoom from "./ChatRoom";
import MessageBox from "./MessageBox";
import "./ChatDashboard.css";

export default function ChatDashboard() {
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "Hey there!" },
    { sender: "You", text: "Hi Alice!" },
  ]);

  const handleSendMessage = (text) => {
    if (text.trim() !== "") {
      setMessages([...messages, { sender: "You", text }]);
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
