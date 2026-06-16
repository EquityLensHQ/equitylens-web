import "./SearchBar.css";

export default function SearchBar({
  ticker,
  setTicker,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onSearch,
}) {
  return (
    <div className="search-bar">

      <div className="search-group">
        <label>Ticker</label>
        <input
          className="input"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="AAPL"
        />
      </div>

      <div className="search-group">
        <label>Start</label>
        <input
          className="input"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="search-group">
        <label>End</label>
        <input
          className="input"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button className="search-btn" onClick={onSearch}>
        Search
      </button>

    </div>
  );
}