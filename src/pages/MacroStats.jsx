import { useEffect, useState } from "react";
import "./MacroStats.css";
import { getMacroStats } from "../api/macroStatsApi";
import Navbar from "../components/Navbar";
import RsiCard from "../components/RsiCard";



export default function MarketOverview() {

    const [macroData, setMacroData] = useState(null);

    useEffect(() => {

        async function loadData(){

            const response = await getMacroStats();

            setMacroData(response.data);

        }


        loadData();


    }, []);



    if (!macroData){

        return (
            <div className="market-page">
                Loading...
            </div>
        )

    }

    return (

        <div className="market-page">

            <div className="container">


                <Navbar />


                <h1 className="title">
                    Macro Stats
                </h1>

                <p>Short-term momentum</p>

                <div className="rsi-grid">


                    <RsiCard

                        title="Highest RSI-2"

                        data={macroData.top_rsi}

                        type="top"

                    />



                    <RsiCard

                        title="Lowest RSI-2"

                        data={macroData.bottom_rsi}

                        type="bottom"

                    />


                </div>


            </div>


        </div>

    );

}