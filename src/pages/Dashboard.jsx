import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStockData } from "../api/equitylensApi";
import { fetchWatchlist, addToWatchlist, removeFromWatchlist } from "../api/watchlistApi";
import QuickInsights from "../components/QuickInsights";
import { getInsights } from "../api/insightsApi";

import SearchBar from "../components/SearchBar";
import PriceChart from "../components/PriceChart";
import RsiChart from "../components/RsiChart";

import logo from "../assets/EquitylensLogo.svg";
import "./Dashboard.css";

export default function Dashboard() {
  const [inputTicker, setInputTicker] = useState("AAPL");
  const [ticker, setTicker] = useState("AAPL");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [watchlist, setWatchList] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const isInWatchlist = (ticker) => {
    return watchlist.some((item) => item.ticker === ticker);
  };
  const [activeTicker, setActiveTicker] = useState("AAPL");
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState([])

  const fetchData = async () => {
    try {
      setLoading(true);
      setData(null);
      setInsights([]);
      setActiveTicker(ticker);
      setError(null);

      const result = await getStockData(
        ticker,
        startDate,
        endDate
      );

      if (!result || !result.data || result.data.length === 0) {
        setError("No market data found for this ticker.");
        return;
      }

      setData(result.data);


      try {

        const insightResult = await getInsights(
          ticker,
          startDate,
          endDate
        );

        setInsights(insightResult.insights || []);

      } catch (err) {

        console.error("Insights error:", err);
        setInsights([]);

      }


    } catch (err) {

      console.error(err);
      setError("Unable to load stock data.");

    } finally {

      setLoading(false);

    }
  };

    useEffect(() => {
      if (token) {
        loadWatchlist();
      }
  }, [token]);

    useEffect(() => {
    if (ticker) {
      fetchData();
    }
  }, [ticker]);


  const loadWatchlist = async () => {
    try {
      const data = await fetchWatchlist();
      setWatchList(data);
    } catch (err) {
      console.error(err);
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
            ticker={inputTicker}
            setTicker={setInputTicker}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onSearch={() => setTicker(inputTicker)}
          />

        </div>

        {/* MAIN GRID */}
        <div className="dashboard-layout">

          <div className="top-grid"> {/* START TOP GRID */}

            {/* PRICE CHART */}
            <div className="chart-card">
              <div className="card-header">
                <div>Price Overview</div>

                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <div className="badge">{activeTicker}</div>

                  <button
                    className={`watchlist-mini-btn ${
                      isInWatchlist(ticker) ? "saved" : ""
                    }`}
                    onClick={async () => {
                      /* check if user is logged in, before adding to watch list */
                      if (!token) {
                        setShowLoginPopup(true);
                        return;
                      }

                      try {
                        const existing = watchlist.find(
                          (item) => item.ticker === ticker
                        );

                        // OPTIMISTIC UPDATE
                        if (existing) {

                          setWatchList((prev) =>
                            prev.filter((w) => w.id !== existing.id)
                          );

                          await removeFromWatchlist(existing.id);

                        } else {

                          const newItem = await addToWatchlist(ticker);

                          setWatchList((prev) => [...prev, newItem]);
                        }

                      } catch (err) {

                        console.error(err);
                        await loadWatchlist();

                      }
                    }}
                  >
                    {isInWatchlist(ticker) ? "★ Saved" : "☆ Watchlist"}
                  </button>
                </div>
              </div>

              <div className="chart-area">
                {loading ? (
                  <div className="chart-loading">
                    <div className="spinner"></div>
                    <p>Loading market data...</p>
                  </div>
                ) : error ? (

                  <div className="chart-error">
                    <h3>No Data Found</h3>
                    <p>{error}</p>
                  </div>
                
                ) : (
                  data && <PriceChart data={data} />
                )}
              </div>
            </div>


            {/* WATCHLIST */}
            <div className="watchlist-card">
              <h3 className="watchlist-title">
                Watchlist
              </h3>

              {watchlist.length === 0 ? (
                <p>No saved tickers</p>
              ) : (
                watchlist.map((item) => (
                  <div key={item.id} 
                  className={`watchlist-item ${ticker === item.ticker ? "active" : ""}  watchlist-ticker clickable`}
                  onClick={() => {
                    setTicker(item.ticker);
                    setActiveTicker(item.ticker);
                    setInputTicker(item.ticker)
                    
                  }}
                  >
                    <span>{item.ticker}</span>

                    <button
                      className="remove-btn"
                      onClick={async () => {
                        await removeFromWatchlist(item.id);
                        await loadWatchlist();
                      }}
                    >
                      x
                    </button>
                  </div>
                ))
              )}
            </div>

          </div> {/* END TOP GRID */}

          <QuickInsights insights={insights} />

        </div>
      </div>

      {/* loing pop up modal */}
      {showLoginPopup && (
        <div className="modal-overlay">

          <div className="login-modal">

            <h2>Sign in required</h2>

            <p>
              Please sign in to add stocks to your watchlist.
            </p>


            <button
              className="modal-login-btn"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </button>


            <button
              className="modal-cancel-btn"
              onClick={() => setShowLoginPopup(false)}
            >
              Cancel
            </button>

          </div>

        </div>
      )}


    </div>
  );
}