import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ChatDashboard from "./components/ChatDashboard";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <div className="nav">
        <Link to="/signup">Signup</Link>
        <Link to="/">Login</Link>
        
      </div>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatDashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
