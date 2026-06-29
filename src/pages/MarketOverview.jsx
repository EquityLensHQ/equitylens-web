import { useEffect, useState } from "react";
import "./MarketOverview.css";
import { getOverview } from "../api/overviewApi";
import Navbar from "../components/Navbar";
import OverviewTable from "../components/OverviewTable";

export default function MarketOverview() {

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    setLoading(true);

    const res = await getOverview();

    setOverview(res.data);
    setLoading(false);
  };

  const sortItems = (items) => items;

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

  return (
    <div className="market-page">
      <div className="container">

        <Navbar />

        <h1 className="title">Market Overview</h1>

        {overview &&
          Object.keys(overview).map((category) => (
            <div key={category}>
              <h2 className="category-title">{category}</h2>

              <OverviewTable
                items={overview[category]}
                loading={loading}
                sortItems={sortItems}
                best={getTopPerformer()}
              />
            </div>
          ))}

      </div>
    </div>
  );
}