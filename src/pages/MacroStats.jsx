import { useEffect, useState } from "react";
import "./MarketOverview.css";
import { getOverview } from "../api/overviewApi";
import Navbar from "../components/Navbar";


export default function MarketOverview() {
  
    return (
        <div className="market-page">
            <div className="container">

            <Navbar />

            <h1 className="title">Macro Stats</h1>


            </div>
        </div>
    );

}