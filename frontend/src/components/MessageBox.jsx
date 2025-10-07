import React, { useState } from "react";
import "./ChatDashboard.css";

export default function MessageBox({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };


  // Add this function for Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleSend();
    }
  };

  return (
    <div className="message-box">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress} // Add this line
        className="message-input"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
