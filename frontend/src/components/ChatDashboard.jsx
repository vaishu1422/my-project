import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatRoom from "./ChatRoom";
import MessageBox from "./MessageBox";
import "./ChatDashboard.css";
import api from "../services/api";
import { useUser } from "../context/UserContext";

export default function ChatDashboard() {
  const { currentUser } = useUser();
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("chat-room-1");

  // Fetch chat history every 2 seconds (polling)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chat/history/${selectedRoom}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [selectedRoom]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const message = {
      sender: currentUser.username,
      receiver: "all",
      content: text,
      room: selectedRoom
    };

    try {
      await api.post("/chat/send", message);
      setMessages([...messages, message]); // Optimistic UI update
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-dashboard">
      <Sidebar selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
      <div className="chat-area">
        <ChatRoom messages={messages} />
        <MessageBox onSend={handleSendMessage} />
      </div>
    </div>
  );
}
