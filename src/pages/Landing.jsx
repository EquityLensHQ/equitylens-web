import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      <div className="container">

    

        {/* TOP NAV (simple, real-product feel) */}
        <div className="nav">
          <div className="logo">EquityLens</div>

          <button
            className="nav-btn"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </button>
        </div>

        {/* HERO */}
        <div className="hero">

          <div className="hero-left">
            <h1>
              Turn market data into<br />
              <span>clear trading insights</span>
            </h1>

            <p>
              EquityLens helps you analyze equities with real-time data,
              technical indicators, and caching optimized for speed.
            </p>

            <div className="cta">
              <button
                className="primary-btn"
                onClick={() => navigate("/dashboard")}
              >
                Try Demo Mode
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/auth")}
              >
                Login / Sign Up
              </button>
            </div>

            <div className="meta">
              Built with FastAPI • React • Postgres • Redis
            </div>
          </div>

          {/* RIGHT SIDE VISUAL BLOCK (not a "boxed form") */}
          <div className="hero-right">
            <div className="stat-card">
              <div className="stat-title">Market Coverage</div>
              <div className="stat-value">10,000+ Stocks</div>
            </div>

            <div className="stat-card">
              <div className="stat-title">Latency</div>
              <div className="stat-value">&lt; 120ms cached</div>
            </div>

          
          </div>

        </div>

      </div>

    </div>
  );
}