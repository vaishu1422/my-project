import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    alert(`Account created for ${formData.username}`);
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Account</h2>
     
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          className="signup-input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
