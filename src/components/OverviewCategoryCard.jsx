export default function OverviewCategoryCard({
  title,
  items,
  loading,
  sortItems,
  best,
  visible,
}) {
  return (
    <div
      className={`category-section category-animate ${
        visible ? "visible" : ""
      }`}
    >

      <h2 className="category-title">{title}</h2>

      <div className="table-card">

        {/* HEADER */}
        <div className="table-header">
          <div>Ticker</div>
          <div>Name</div>
          <div style={{ textAlign: "right" }}>12M Return</div>
        </div>

        {/* BODY */}
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="table-row skeleton-row">
              <div className="ticker-cell skeleton-box"></div>
              <div className="name-cell skeleton-box"></div>
              <div className="return-cell skeleton-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ))
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
    </div>
  );
}