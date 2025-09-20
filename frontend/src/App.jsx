import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { UserProvider } from "./context/UserContext";
import ChatDashboard from "./components/ChatDashboard";
import "./App.css";


function App() {
  return (
    <UserProvider>
<BrowserRouter>
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/" element={<Login />} />
    <Route path="/chat" element={<ChatDashboard />} />
  </Routes>
</BrowserRouter>
    </UserProvider>
   

  );
}

export default App;
