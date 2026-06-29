export default function Watchlist({
  watchlist,
  ticker,
  setTicker,
  setActiveTicker,
  setInputTicker,
  removeFromWatchlist,
  loadWatchlist,
}) {
  return (
    <div className="watchlist-card">
      <div className="watchlist-title">Watchlist</div>

      {watchlist.length === 0 ? (
        <p>No saved tickers</p>
      ) : (
        watchlist.map((item) => (
          <div
            key={item.id}
            className={`watchlist-item ${
              ticker === item.ticker ? "active" : ""
            } watchlist-ticker clickable`}
            onClick={() => {
              setTicker(item.ticker);
              setActiveTicker(item.ticker);
              setInputTicker(item.ticker);
            }}
          >
            <span>{item.ticker}</span>

            <button
              className="remove-btn"
              onClick={async (e) => {
                e.stopPropagation(); // IMPORTANT (prevents selecting ticker)
                await removeFromWatchlist(item.id);
                await loadWatchlist();
              }}
            >
              x
            </button>
          </div>
        ))
      )}
    </div>
  );
}