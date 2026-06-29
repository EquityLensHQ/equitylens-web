export default function RsiCardSkeleton({ title }) {
  return (
    <div className="rsi-card">

      <div className="rsi-title">{title}</div>

      {Array.from({ length: 5 }).map((_, i) => (
        <div className="rsi-row" key={i}>

          <div className="rsi-ticker">
            <div className="skeleton-box" style={{ width: "50px" }} />
          </div>

          <div className="rsi-name">
            <div className="skeleton-box" style={{ width: "140px" }} />
          </div>

          <div className="rsi-value">
            <div
              className="skeleton-box"
              style={{ width: "40px", marginLeft: "auto" }}
            />
          </div>

        </div>
      ))}

    </div>
  );
}