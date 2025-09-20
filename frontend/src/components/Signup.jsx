import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import api from "../services/api"; // Import the configured axios instance

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
      console.log("Sending signup request:", formData);
      
      // Use the configured api instance instead of axios directly
      const response = await api.post('/auth/signup', formData, {
        timeout: 5000,
      });
      
      console.log("Signup response:", response);
      setMessage(response.data);
      setIsError(false);
      setFormData({ username: "", email: "", password: "" });
      
      // Redirect to login after successful signup
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error("Full error details:", error);
      
      if (error.code === 'ECONNABORTED') {
        setMessage("Request timeout - backend is not responding");
      } else if (error.response) {
        setMessage(error.response.data || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setMessage("No response from server - is your backend running?");
      } else {
        setMessage(error.message || "Signup failed. Please try again.");
      }
      
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Account</h2>
      
      {message && (
        <div className={isError ? "error-message" : "success-message"}>
          {message}
        </div>
      )}
     
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          className="signup-input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <input
          className="signup-input"
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <input
          className="signup-input"
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
          className="signup-button"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Signup"}
        </button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}