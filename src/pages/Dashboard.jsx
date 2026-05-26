import { useState } from "react";
import { getStockData } from "../api/equitylensApi";

export default function Dashboard() {

  const [ticker, setTicker] = useState("AAPL");
  const [data, setData] = useState(null); //state variable to hold current stock data

  //get the stock data for specified ticker
  const fetchData = async () => {
    const result = await getStockData(ticker); //call method from equitylensApi.js
    setData(result);
  };

  return (
    <div style={{ padding: "24px", fontFamily: "Arial" }}>
      <h1>EquityLens</h1>

      {/* ticker input field */}  
      <div style={{ marginBottom: "20px" }}>
        <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Enter ticker (e.g. AAPL)"
            style={{ padding: "8px", marginRight: "10px" }}
        />

        {/* Analyze button */}
        <button onClick={fetchData}>
            Analyze
        </button>
      </div>

      {/* Main Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
        
        {/* Conditional render data if it is truthy */}
        {data && (
            <div>
                <h3>{data.ticker}</h3>
                <p>Data points: {data.data.length}</p>
            </div>
        )}

      </div>
      
    </div>
  );
}