import { useState } from "react";
import { getStockData } from "../api/equitylensApi";

export default function Dashboard() {
  const [ticker, setTicker] = useState("AAPL");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const result = await getStockData(ticker);
    setData(result);
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.logo}>📊 EquityLens</h1>

        <div style={styles.searchBar}>
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Enter ticker (AAPL)"
            style={styles.input}
          />
          <button onClick={fetchData} style={styles.button}>
            Analyze
          </button>
        </div>
      </div>

      {/* GRID DASHBOARD */}
      <div style={styles.grid}>

        {/* LEFT PANEL */}
        <div style={styles.card}>
          <h2>Price Overview</h2>

          {data ? (
            <>
              <p><b>Ticker:</b> {data.ticker}</p>
              <p><b>Data Points:</b> {data.data.length}</p>
              <p style={{ opacity: 0.6 }}>
                (Price chart will go here)
              </p>
            </>
          ) : (
            <p>Search a ticker to load data</p>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.card}>
          <h2>RSI Indicator</h2>
          <p style={{ opacity: 0.6 }}>
            (RSI chart will go here)
          </p>
        </div>

      </div>

      {/* BOTTOM TABLE */}
      <div style={styles.cardFull}>
        <h2>Signals</h2>

        {data ? (
          <p style={{ opacity: 0.6 }}>
            (Signals table will go here)
          </p>
        ) : (
          <p>No data yet</p>
        )}
      </div>

    </div>
  );
}

const styles = {
  page: {
    padding: "24px",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Inter, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "600",
  },

  searchBar: {
    display: "flex",
    gap: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#1e293b",
    color: "white",
  },

  button: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #334155",
    minHeight: "200px",
  },

  cardFull: {
    backgroundColor: "#1e293b",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #334155",
  },
};