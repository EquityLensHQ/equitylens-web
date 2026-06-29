export function OverviewTableSkeleton() {
  return Array.from({ length: 6 }).map((_, i) => (
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
  ));
}