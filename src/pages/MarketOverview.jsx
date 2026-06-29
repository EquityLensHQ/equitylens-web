import { useEffect, useState } from "react";
import "./MarketOverview.css";
import { getOverview } from "../api/overviewApi";
import Navbar from "../components/Navbar";
import OverviewCategoryCard from "../components/OverviewCategoryCard";
import OverviewCategoryCardSkeleton from "../components/OverviewCategoryCardSkeleton";
import { MARKET_CATEGORIES } from "../data/marketCategories";
import TopPerformerSkeleton from "../components/TopPerformerSkeleton"


export default function MarketOverview() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState("default");
  const [openSort, setOpenSort] = useState(false);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await getOverview();
      setOverview(res.data);
    } catch (err) {
      console.error(err);
      setOverview([]);
    } finally {
      setLoading(false);
    }
  };

  const sortItems = (items) => {
    if (sortMode === "default") return items;

    if (sortMode === "highest") {
      return [...items].sort((a, b) => b.return_12m - a.return_12m);
    }

    if (sortMode === "lowest") {
      return [...items].sort((a, b) => a.return_12m - b.return_12m);
    }

    return items;
  };

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

  const categories = overview ? Object.keys(overview) : ["Equities", "ETFs", "Crypto"];

  return (
    <div className="market-page">
      <div className="container">

        <Navbar />

        <h1 className="title">Market Overview</h1>

        {/* SORT DROPDOWN (unchanged) */}
        <div className="sort-dropdown">
          <button
            className="sort-button"
            onClick={() => setOpenSort(!openSort)}
          >
            {sortMode === "default" && "Default"}
            {sortMode === "highest" && "Highest Return"}
            {sortMode === "lowest" && "Lowest Return"}
            <span>⌄</span>
          </button>

          {openSort && (
            <div className="sort-menu">
              <div onClick={() => { setSortMode("default"); setOpenSort(false); }}>
                Default
              </div>
              <div onClick={() => { setSortMode("highest"); setOpenSort(false); }}>
                Highest Return
              </div>
              <div onClick={() => { setSortMode("lowest"); setOpenSort(false); }}>
                Lowest Return
              </div>
            </div>
          )}
        </div>

        {/* TOP PERFORMER */}
        {loading ? (
        <TopPerformerSkeleton />
        ) : top ? (
        <div className="top-banner">
            Best Performer (12M):{" "}
            <strong>{top.ticker}</strong> {top.name} —{" "}
            <span className="positive">{top.return_12m}%</span>
        </div>
        ) : null}

        {/* MAIN GRID */}
        <div className="overview-grid">

            {MARKET_CATEGORIES.map((category) => (
                loading ? (
                <OverviewCategoryCardSkeleton
                    key={category.title}
                    title={category.title}
                />
                ) : (
                <OverviewCategoryCard
                    key={category.title}
                    title={category.title}
                    items={category.data}
                    sortItems={sortItems}
                    best={[...category.data].sort((a,b)=>b.return_12m-a.return_12m)[0]}
                />
                )
            ))}

        </div>

      </div>
    </div>
  );
}