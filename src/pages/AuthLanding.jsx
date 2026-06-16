import { useState } from "react";
import "./AuthLanding.css";
import logo from "../assets/EquitylensLogo.svg";


export default function AuthLanding() {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* HEADER */}
        <div className="auth-header">

          <div className="auth-brand">
            <img src={logo} alt="EquityLens" className="auth-logo" />
            <h1 className="brand-name">EquityLens</h1>
          </div>

          <p className="subtitle">
            Sign in to access your market dashboard
          </p>

        </div>



        {/* TOGGLE */}
        <div className="tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* FORM */}
        <form className="form">
          {mode === "signup" && (
            <input type="text" placeholder="Full Name" />
          )}

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button className="primary-btn">
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* GUEST */}
        <button className="guest-btn">
          Continue as Guest
        </button>

        <p className="footer">
          By continuing, you agree to our terms & privacy policy.
        </p>

      </div>

    </div>
  );
}