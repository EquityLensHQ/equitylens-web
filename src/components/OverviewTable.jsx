import "./OverviewTable.css";

export default function OverviewTable({ items = [], loading, sortItems, best }) {
  return (
    <div className="table-card">

      {/* HEADER */}
      <div className="table-header">
        <div>Ticker</div>
        <div>Name</div>
        <div style={{ textAlign: "right" }}>12M Return</div>
      </div>

      {/* BODY */}
      {loading ? (
        <OverviewTableSkeleton />
      ) : (
        sortItems(items).map((item) => (
          <div
            key={item.ticker}
            className={`table-row ${
              best?.ticker === item.ticker ? "highlight-row" : ""
            }`}
          >
            <div className="ticker-cell">{item.ticker}</div>

            <div className="name-cell">{item.name}</div>

            <div
              className={`return-cell ${
                item.return_12m >= 0 ? "positive" : "negative"
              }`}
            >
              {item.return_12m}%
            </div>
          </div>
        ))
      )}

    </div>
  );
}