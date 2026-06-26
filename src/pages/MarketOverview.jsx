import { useEffect, useState } from "react";
import "./MarketOverview.css";
import { getOverview } from "../api/overviewApi";


export default function MarketOverview() {

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="market-page">

        <div className="container">


            <h1 className="title">Market Overview</h1>

            {overview && Object.keys(overview).map((category) => (
                <div key={category} className="category-section">

                <h2 className="category-title">{category}</h2>

                <div className="cards-grid">

                    {overview[category].map((item) => (
                    <div key={item.ticker} className="market-card">

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
            ))}




        </div>

      

    </div>
  );
}