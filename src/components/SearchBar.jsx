export default function SearchBar({
  ticker,
  setTicker,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onSearch,
  theme
}) {
  return (
    <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center",
      padding: "6px",
      borderRadius: "12px",
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.card,
      flexWrap: "wrap",
    }}>

      <input
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="AAPL"
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: theme.text,
          width: "100px",
        }}
      />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{ background: "transparent", color: theme.text }}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{ background: "transparent", color: theme.text }}
      />

      <button
        onClick={onSearch}
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#3b82f6",
          color: "white",
          cursor: "pointer",
        }}
      >
        Analyze
      </button>

    </div>
  );
}