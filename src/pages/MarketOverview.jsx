import { useEffect, useState } from "react";
import "./MarketOverview.css";
import { getOverview } from "../api/overviewApi";


export default function MarketOverview() {

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTopPerformer = () => {
    if (!overview) return null;

    let best = null;

    Object.values(overview).forEach((arr) => {
        arr.forEach((item) => {
        if (!best || item.return_12m > best.return_12m) {
            best = item;
        }
        });
    });

    return best;
    };

    const top = getTopPerformer();

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      setLoading(true);

      const overviewResult = await getOverview();

      console.log("MARKET OVERVIEW:", overviewResult.data);

      setOverview(overviewResult.data);

    } catch (err) {
      console.error("Overview error:", err);
      setOverview([])
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading Market Overview...</div>;
  }

  const getIntensity = (value) => {
    if (value >= 40) return "heat-strong";
    if (value >= 20) return "heat-medium";
    if (value >= 5) return "heat-light";
    if (value >= 0) return "heat-neutral";
    return "heat-negative";
    };

  return (
    <div className="market-page">
        <div className="container">

        <h1 className="title">Market Overview</h1>

        {top && (
            <div className="top-banner">
            🏆 Best Performer (12M):{" "}
            <strong>{top.ticker}</strong> {top.name} —{" "}
            <span className="positive">{top.return_12m}%</span>
            </div>
        )}

        {overview &&
            Object.keys(overview).map((category) => {
            const items = overview[category];

            const best =
                items.length > 0
                ? [...items].sort(
                    (a, b) => b.return_12m - a.return_12m
                    )[0]
                : null;

            return (
                <div key={category} className="category-section">

                <h2 className="category-title">{category}</h2>

                <div className="cards-grid">

                    {items.map((item) => (
                    <div
                        key={item.ticker}
                        className={`market-card ${getIntensity(
                        item.return_12m
                        )} ${
                        best?.ticker === item.ticker
                            ? "category-best"
                            : ""
                        }`}
                    >

                        <div className="ticker">{item.ticker}</div>
                        <div className="name">{item.name}</div>

                        <div
                        className={
                            item.return_12m >= 0
                            ? "return positive"
                            : "return negative"
                        }
                        >
                        {item.return_12m}%
                        </div>

                    </div>
                    ))}

                </div>
                </div>
            );
            })}

        </div>
    </div>
    );
}