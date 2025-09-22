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
  const [selectedChat, setSelectedChat] = useState("chat-room-1"); // default

  // Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chat/history/${selectedChat}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [selectedChat]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // private vs group decide karna
    const isRoom = selectedChat.startsWith("chat-room");
    const message = {
      sender: currentUser.username,
      receiver: isRoom ? "all" : selectedChat.replace(`${currentUser.username}_`, "").replace(`_${currentUser.username}`, ""), // dusre user ka naam
      content: text,
      room: isRoom ? selectedChat : null,
      chatId: selectedChat
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
      <Sidebar selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      <div className="chat-area">
        <ChatRoom messages={messages} selectedChat={selectedChat} />
        <MessageBox onSend={handleSendMessage} />
      </div>
    </div>
  );
}
