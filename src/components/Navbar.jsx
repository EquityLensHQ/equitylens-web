import { useNavigate } from "react-router-dom";
import logo from "../assets/EquitylensLogo.svg";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="nav-container">

      <div className="nav">

        {/* BRAND */}
        <div
          className="brand"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="brand-logo" />
          <span>EquityLens</span>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="nav-actions">

          <button
            className="nav-link"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="nav-link"
            onClick={() => navigate("/market")}
          >
            Market
          </button>

          <button
            className="nav-link"
            onClick={() => navigate("/macrostats")}
          >
            Macro Stats
          </button>

          {token ? (
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Log Out
            </button>
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/auth")}
            >
              Log In
            </button>
          )}

        </div>

      </div>

    </div>
  );
}