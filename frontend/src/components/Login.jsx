import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../services/api"; // Import the configured axios instance

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setMessage("");

    try {
      // Use the configured api instance
      const response = await api.post('/auth/login', formData);
      
      setMessage("Login successful!");
      setIsError(false);
      
      // Store user data if needed
      localStorage.setItem('username', formData.username);
      
      // Redirect to chat page after a brief delay
      setTimeout(() => {
        navigate("/chat");
      }, 1000);
      
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data || "Login failed. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back</h2>
      <p className="login-subtitle">Login to continue</p>
      
      {message && (
        <div className={isError ? "error-message" : "success-message"}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="login-input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}