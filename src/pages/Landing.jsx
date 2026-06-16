import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStockData } from "../api/equitylensApi";
import PriceChart from "../components/PriceChart";
import "./Landing.css";


export default function Landing() {
  const navigate = useNavigate();

  const [ticker] = useState("AAPL");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const result = await getStockData(
          "AAPL",
          "2025-01-01",
          "2025-06-01"
        );

        setData(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);


  console.log("API Data:", data);


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

            <div className="preview-card">

              <div className="preview-header">
                <div className="ticker">AAPL</div>
                <div className="range">6M</div>
              </div>

              
              <div className="chart-wrapper">

                {loading ? (
                  <div style={{ fontSize: 14, color: "#64748b" }}>
                    Loading chart...
                  </div>
                ) : (
                  <PriceChart data={data} /> 
                )}


              </div>



              <div className="preview-footer">
                <span>Live market preview</span>
                <span className="status">● simulated data</span>
              </div>

            </div>

          </div>

          
          </div>

        </div>

      </div>

    
  );
}