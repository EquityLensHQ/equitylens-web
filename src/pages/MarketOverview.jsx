import { useEffect, useState } from "react";
import "./MarketOverview.css";
import { getOverview } from "../api/overviewApi";
import Navbar from "../components/Navbar";
import OverviewCategoryCard from "../components/OverviewCategoryCard";


export default function MarketOverview() {

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState("default");
  const [openSort, setOpenSort] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState({});

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


  const getIntensity = (value) => {
    if (value >= 40) return "heat-strong";
    if (value >= 20) return "heat-medium";
    if (value >= 5) return "heat-light";
    if (value >= 0) return "heat-neutral";
    return "heat-negative";
    };


    const sortItems = (items) => {

        if (sortMode === "default") {
            return items;
        }


        if (sortMode === "highest") {

            return [...items].sort(
            (a,b) => b.return_12m - a.return_12m
            );

        }


        if (sortMode === "lowest") {

            return [...items].sort(
            (a,b) => a.return_12m - b.return_12m
            );

        }

    };

    useEffect(() => {
        if (!overview) return;

        const categories = Object.keys(overview);

        categories.forEach((cat, index) => {
            setTimeout(() => {
            setVisibleCategories((prev) => ({
                ...prev,
                [cat]: true,
            }));
            }, index * 180); // stagger timing
        });
    }, [overview]);
  

    return (
        <div className="market-page">
            <div className="container">

            <Navbar />

            <h1 className="title">Market Overview</h1>

            {/* SORT DROPDOWN */}
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

                    <div
                    onClick={() => {
                        setSortMode("default");
                        setOpenSort(false);
                    }}
                    >
                    Default
                    </div>

                    <div
                    onClick={() => {
                        setSortMode("highest");
                        setOpenSort(false);
                    }}
                    >
                    Highest Return
                    </div>

                    <div
                    onClick={() => {
                        setSortMode("lowest");
                        setOpenSort(false);
                    }}
                    >
                    Lowest Return
                    </div>

                </div>
                )}

            </div>

            {/* TOP PERFORMER */}
            {top && (
                <div className="top-banner">
                Best Performer (12M):{" "}
                <strong>{top.ticker}</strong> {top.name} —{" "}
                <span className="positive">{top.return_12m}%</span>
                </div>
            )}

            {/* MAIN GRID */}
            <div className="overview-grid">


            {overview &&
                Object.keys(overview).map((category) => {
                    const items = overview[category];

                    const best =
                    items.length > 0
                        ? [...items].sort((a, b) => b.return_12m - a.return_12m)[0]
                        : null;

                    return (
                    <OverviewCategoryCard
                        key={category}
                        title={category} 
                        items={items}
                        loading={loading}
                        sortItems={sortItems}
                        best={best}
                        visible={visibleCategories[category]}
                    />
                    );
            })}


            </div>

            </div>
        </div>
    );

}