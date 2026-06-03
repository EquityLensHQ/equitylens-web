import { useState } from "react";
import { getStockData } from "../api/equitylensApi";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PriceChart from "../components/PriceChart";
import RsiChart from "../components/RsiChart";
import SignalsTable from "../components/SignalsTable";

import logo from "../assets/EquitylensLogo.svg";

export default function Dashboard() {

  const [ticker, setTicker] = useState("AAPL");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [data, setData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchData = async () => {
    const result = await getStockData(ticker, startDate, endDate);
    setData(result);
  };

  const theme = darkMode
    ? {
        bg: "#0b1220",
        card: "#0f172a",
        border: "#1f2937",
        text: "#ffffff",
      }
    : {
        bg: "#f8fafc",
        card: "#ffffff",
        border: "#e2e8f0",
        text: "#0f172a",
      };

  return (
    <div style={{ padding: 28, background: theme.bg, minHeight: "100vh", color: theme.text }}>

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        theme={theme}
        logo={logo}
      />

      <SearchBar
        ticker={ticker}
        setTicker={setTicker}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onSearch={fetchData}
        theme={theme}
      />

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, marginTop: 18 }}>

        <div style={{ background: theme.card, padding: 18, borderRadius: 12 }}>
          <h2>Price Overview</h2>
          {data && <PriceChart data={data.data} />}
        </div>

        <div style={{ background: theme.card, padding: 18, borderRadius: 12 }}>
          <h2>RSI</h2>
          {data && <RsiChart data={data.data} />}
        </div>

      </div>

      <div style={{ marginTop: 18, background: theme.card, padding: 18, borderRadius: 12 }}>
        <h2>Signals</h2>
        {data && <SignalsTable data={data.data} />}
      </div>

    </div>
  );
}