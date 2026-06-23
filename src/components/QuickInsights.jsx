import "./QuickInsights.css";

export default function QuickInsights({ insights }) {
  return (
    <div className="insights-card">

      <div className="insights-header">

        <div>
          <h3>Quick Insights</h3>
        </div>

        <div className="insights-status">
          EquityLens Analysis
        </div>

      </div>

      {insights.length === 0 ? (
        <p className="insights-empty">
          No insights available for this period.
        </p>
      ) : (
        <div className="insights-list">

          {insights.map((item, index) => (
            <div key={index} className="insight-item">

              <div className="insight-marker" />

              <div className="insight-content">

                <div className="insight-type">
                  {item.type}
                </div>

                <div className="insight-message">
                  {item.message}
                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}