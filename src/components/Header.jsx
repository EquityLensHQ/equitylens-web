export default function Header({ darkMode, setDarkMode, theme, logo }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        marginBottom: "24px",
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: "16px",
        boxShadow: darkMode
          ? "0 4px 20px rgba(0,0,0,0.25)"
          : "0 4px 20px rgba(15,23,42,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <img
          src={logo}
          alt="EquityLens"
          style={{
            width: "36px",
            height: "36px",
          }}
        />

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            EquityLens
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "12px",
              color: theme.muted,
            }}
          >
            Market Analytics Platform
          </p>
        </div>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.bg,
          color: theme.text,
          cursor: "pointer",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}