export default function Header({ darkMode, setDarkMode, theme, logo }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "28px",
      padding: "12px 16px",
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: "12px",
    }}>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={logo} style={{ width: "28px", height: "28px" }} />
        <h1 style={{ fontSize: "18px", fontWeight: "600" }}>
          EquityLens
        </h1>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: "8px 12px",
          borderRadius: "10px",
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.card,
          color: theme.text,
          cursor: "pointer",
        }}
      >
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>

    </div>
  );
}