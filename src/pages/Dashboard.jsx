import { useState } from "react";
//import { getStockData } from "../api/equitylensApi";
import { mockStockData } from "../mock/mockStockData";
import PriceChart from "../components/PriceChart";
import RsiChart from "../components/RsiChart";

export default function Dashboard() {

  const generateSignals = (dataArray) => {
    return dataArray.map((item) => {
        let signal = "HOLD";

        if (item.RSI < 30) signal = "BUY";
        else if (item.RSI > 70) signal = "SELL";

        return {
        date: item.Date,
        price: item.Close,
        rsi: item.RSI,
        signal,
        };
    });
  };
    
  const [ticker, setTicker] = useState("AAPL");
  const [data, setData] = useState(null);
  const signals = data ? generateSignals(data.data) : [];

  const fetchData = async () => {
    //const result = await getStockData(ticker);
    setData(mockStockData);
  };

  console.log(data);
  
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

                <PriceChart data={data.data} />
                </>
            ) : (
                <p>Search a ticker to load data</p>
            )}
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.card}>
            <h2>RSI Indicator</h2>

            {data ? (
                <RsiChart data={data.data} />
            ) : (
                <p>RSI will appear here</p>
            )}
        </div>

      </div>

      {/* BOTTOM TABLE */}
    <div style={styles.cardFull}>
    <h2>Signals</h2>

    {signals.length > 0 ? (
        <table style={styles.table}>
        <thead>
            <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>RSI</th>
            <th style={styles.th}>Signal</th>
            </tr>
        </thead>

        <tbody>
            {signals.map((row, idx) => (
            <tr key={idx}>
                <td style={styles.td}>{row.date}</td>
                <td style={styles.td}>{row.price}</td>
                <td style={styles.td}>{row.rsi}</td>
                <td style={{
                color:
                    row.signal === "BUY"
                    ? "#22c55e"
                    : row.signal === "SELL"
                    ? "#f87171"
                    : "#94a3b8",
                fontWeight: "600"
                }}>
                {row.signal}
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    ) : (
        <p>No data yet</p>
    )}
    </div>

    </div>
  );
}

const styles = {
  page: {
    padding: "28px",
    backgroundColor: "#0b1220",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    padding: "12px 16px",
    backgroundColor: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "12px",
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
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    outline: "none",
    width: "200px",
    },

  button: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "white",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.2s",
    },

  grid: {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "18px",
  marginBottom: "16px",
},

  card: {
  backgroundColor: "#0f172a",
  padding: "18px",
  borderRadius: "14px",
  border: "1px solid #1f2937",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.02)",
},

  cardFull: {
  backgroundColor: "#0f172a",
  padding: "18px",
  borderRadius: "14px",
  border: "1px solid #1f2937",
  marginTop: "16px",
},

  table: {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
},

th: {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #334155",
  color: "#94a3b8",
  fontSize: "12px",
  textTransform: "uppercase",
},

td: {
  padding: "10px",
  borderBottom: "1px solid #1f2937",
},
};