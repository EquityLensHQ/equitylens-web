export default function OverviewCategoryCardSkeleton({ title }) {
  return (
    <div className="category-section">

      <h2 className="category-title">{title}</h2>

      <div className="table-card">

        {/* HEADER */}
        <div className="table-header">
          <div>Ticker</div>
          <div>Name</div>
          <div style={{ textAlign: "right" }}>12M Return</div>
        </div>

        {/* ROWS */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="table-row" key={i}>

            <div className="ticker-cell">
              <div className="skeleton-box" style={{ width: "50px" }} />
            </div>

            <div className="name-cell">
              <div className="skeleton-box" style={{ width: "140px" }} />
            </div>

            <div className="return-cell">
              <div
                className="skeleton-box"
                style={{ width: "60px", marginLeft: "auto" }}
              />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}