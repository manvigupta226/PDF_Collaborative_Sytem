import React, { useState } from "react";
import instance from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/api/auth/signup", form);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(180deg, #6C2CBD 0%, #311B92 100%);
          color: white;
          align-items: center;
          justify-content: center;
        }
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .form-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 48px 40px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          color: white;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .icon-wrapper {
          background-color: #7F00FF;
          width: 48px;
          height: 48px;
          margin: 0 auto;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px #e040fb;
        }
        .icon-wrapper svg {
          width: 24px;
          height: 24px;
          stroke: white;
        }
        h2 {
          margin-top: 12px;
          font-size: 1.8rem;
          font-weight: 700;
        }
        p.subtitle {
          opacity: 0.75;
          font-size: 0.9rem;
          margin-top: 6px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          line-height: 1.3;
          color: white;
        }
        .input-group {
          position: relative;
        }
        .input-icon {
          position: absolute;
          top: 50%;
          left: 12px;
          transform: translateY(-50%);
          pointer-events: none;
          stroke: rgba(255, 255, 255, 0.6);
          width: 20px;
          height: 20px;
        }
        input {
          width: 100%;
          padding: 14px 18px 14px 44px;
          border-radius: 10px;
          border: none;
          font-size: 1.1rem;
          background: rgba(255, 255, 255, 0.15);
          color: white;
          transition: background-color 0.25s ease, box-shadow 0.25s ease;
        }
        input::placeholder {
          color: rgba(255,255,255,0.6);
        }
        input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 0 10px #e040fb;
        }
        button {
          margin-top: 20px;
          padding: 16px;
          font-size: 1.2rem;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          background: linear-gradient(90deg, #E100FF 0%, #7F00FF 100%);
          box-shadow: 0 6px 20px rgba(143, 0, 255, 0.7);
          color: white;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.3s ease;
        }
        button:hover {
          background: linear-gradient(90deg, #b000ff 0%, #5000a8 100%);
        }
        .footer-text {
          text-align: center;
          margin-top: 24px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.85);
        }
        .footer-text .link {
          color: #a78bfa;
          cursor: pointer;
          font-weight: 600;
        }
        .footer-text .link:hover {
          text-decoration: underline;
        }
        .secure-text {
          text-align: center;
          font-size: 0.75rem;
          margin-top: 12px;
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <div className="container">
        <div className="form-container">
          <div className="header">
            <div className="icon-wrapper" aria-hidden="true">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                <path d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h2>Create Account</h2>
            <p className="subtitle">Join us and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <svg className="input-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                <path d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <svg className="input-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"></path>
                <path d="M21 8l-5.65 3.76a2 2 0 01-1.79 0L3 8z"></path>
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <svg className="input-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 15v2"></path>
                <path d="M6 19h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
              </svg>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">
              Create Account
              <svg className="icon-arrow" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="20" height="20" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </form>

          <p className="footer-text">
            Already have an account?{" "}
            <span className="link" onClick={() => navigate("/login")}>Sign in here</span>
          </p>
          <p className="secure-text">
            <span>•</span> Secure & Encrypted <span>•</span>
          </p>
        </div>
      </div>
    </>
  );
}
