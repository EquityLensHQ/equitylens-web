export default function SearchBar({
  ticker,
  setTicker,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onSearch,
  theme,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px",
        borderRadius: "16px",
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.card,
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      {/* Ticker */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 14px",
          borderRadius: "12px",
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.bg,
        }}
      >
        <span>🔍</span>

        <input
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="AAPL"
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            color: theme.text,
            fontSize: "15px",
            fontWeight: "600",
            width: "100px",
          }}
        />
      </div>

      {/* Date Range */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 14px",
          borderRadius: "12px",
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.bg,
        }}
      >
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            border: "none",
            background: "transparent",
            color: theme.text,
            outline: "none",
          }}
        />

        <span style={{ color: theme.muted }}>→</span>

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            border: "none",
            background: "transparent",
            color: theme.text,
            outline: "none",
          }}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        style={{
          padding: "12px 20px",
          borderRadius: "12px",
          border: "none",
          backgroundColor: "#3b82f6",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        Analyze
      </button>
    </div>
  );
}