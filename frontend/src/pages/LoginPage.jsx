import React, { useState } from "react";
import instance from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token); // store JWT
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <>
      <style>{`
        /* Container centering */
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #6C2CBD 0%, #311B92 100%);
          padding: 1rem;
        }
        /* Form styling */
        .login-form {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 400px;
          color: white;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        /* Heading */
        .login-form h2 {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        /* Input fields */
        .login-form input {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: white;
          outline: none;
          transition: background 0.3s ease;
        }
        .login-form input::placeholder {
          color: #ddd;
        }
        .login-form input:focus {
          background: rgba(255, 255, 255, 0.35);
        }
        /* Button */
        .login-form button {
          background: linear-gradient(90deg, #E100FF 0%, #7F00FF 100%);
          border: none;
          border-radius: 8px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: background 0.3s ease;
          user-select: none;
        }
        .login-form button:hover {
          background: linear-gradient(90deg, #7F00FF 0%, #E100FF 100%);
        }
        /* Signup link text */
        .signup-text {
          text-align: center;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }
        .signup-text span {
          color: #BB86FC;
          cursor: pointer;
          font-weight: 600;
          text-decoration: underline;
        }
        .signup-text span:hover {
          color: #E100FF;
        }
      `}</style>

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Log In</h2>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="current-password"
          />
          <button type="submit">Log In</button>
          <p className="signup-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </form>
      </div>
    </>
  );
}
