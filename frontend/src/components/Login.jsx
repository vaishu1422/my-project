import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      console.log("Login Data:", formData);
      alert(`Logged in as ${formData.email}`);

      // ✅ navigate to chat dashboard
      navigate("/chat");

      // reset form
      setFormData({ email: "", password: "" });
    } else {
      alert("Please fill in both fields");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="signup-link">
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}
