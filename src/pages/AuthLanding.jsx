import { useState } from "react";
import "./AuthLanding.css";
import { register, login } from "../api/authApi"
import { useNavigate } from "react-router-dom";
import logo from "../assets/EquitylensLogo.svg";


export default function AuthLanding() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      if (mode === "signup") {
        await register(email, password);

        // automatically log them in
        const authData = await login(
          email,
          password
        );

        localStorage.setItem(
          "token",
          authData.access_token
        );
      } else {
        const authData = await login(
          email,
          password
        );

        localStorage.setItem(
          "token",
          authData.access_token
        );
      }

      navigate("/lookup");

    } catch (err) {
      setError(err.message);
    }
  };

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
        <form className="form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input type="text" placeholder="Full Name" />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="primary-btn"
          >
            {mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>

              {
                error && (
                  <p className="auth-error"> {error} </p>
                )
              }

        </form>

        

        {/* GUEST */}
        <button
          className="guest-btn"
          onClick={() => navigate("/lookup")}
        >
          Continue as Guest
        </button>

        <p className="footer">
          By continuing, you agree to our terms & privacy policy.
        </p>

      </div>

    </div>
  );
}