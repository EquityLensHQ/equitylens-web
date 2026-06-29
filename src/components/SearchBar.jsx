import "./SearchBar.css";

export default function SearchBar({
  ticker,
  setTicker,
  range,
  setRange,
  onSearch,
}) {
  return (
    <div className="search-bar">

      <div className="search-group ticker-group">
        <input
          className="input"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Search ticker"
        />
      </div>


      <div className="range-buttons">
        {["1M", "3M", "6M", "1Y", "MAX"].map((item) => (
          <button
            key={item}
            className={`range-btn ${
              range === item ? "active" : ""
            }`}
            onClick={() => setRange(item)}
          >
            {item}
          </button>
        ))}
      </div>


      <button className="search-btn" onClick={onSearch}>
        Analyze
      </button>

    </div>
  );
}