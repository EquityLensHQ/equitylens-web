import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStockData } from "../api/equitylensApi";

import SearchBar from "../components/SearchBar";
import PriceChart from "../components/PriceChart";
import RsiChart from "../components/RsiChart";

import logo from "../assets/EquitylensLogo.svg";
import "./Dashboard.css";

export default function Dashboard() {
  const [ticker, setTicker] = useState("AAPL");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getStockData(ticker, startDate, endDate);
      setData(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">

      {/* TOP NAV (same as Landing) */}
      <div className="container">
        <div className="nav">
          <div className="brand" onClick={() => navigate("/")}>
            <img src={logo} className="brand-logo" />
            <span>EquityLens</span>
          </div>
          {token && (
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Log Out
            </button>
          )}
        </div>

        {/* HEADER SECTION */}
        <div className="dashboard-hero">
          <h1>
            Market <span>Dashboard</span>
          </h1>
          <p>
            Analyze equities with technical indicators and cached market data.
          </p>
        </div>

        {/* SEARCH CARD */}
        <div className="search-card">
          <SearchBar
            ticker={ticker}
            setTicker={setTicker}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onSearch={fetchData}
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid">

          {/* PRICE CHART */}
          <div className="chart-card">
            <div className="card-header">
              <div>Price Overview</div>
              <div className="badge">{ticker}</div>
            </div>

            <div className="chart-area">
              {loading ? (
                <div className="loading">Loading chart...</div>
              ) : (
                data && <PriceChart data={data} />
              )}
            </div>
          </div>

          {/* RSI CHART */}
          <div className="chart-card">
            <div className="card-header">
              <div>RSI Indicator</div>
              <div className="badge">14D</div>
            </div>

            <div className="chart-area">
              {data && <RsiChart data={data} />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}