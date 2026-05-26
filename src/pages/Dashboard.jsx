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
    <div style={{ padding: "20px" }}>
      <h1>EquityLens</h1>

      <input
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter ticker"
      />

      <button onClick={fetchData}>Search</button>

      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}