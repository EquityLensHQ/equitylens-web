import "./RsiCard.css";

export default function RsiCard({ title, data, type }) {


    return (

        <div className="rsi-card">


            <div className="rsi-title">

                {title}

            </div>



            {data.map((item)=>(


                <div
                    key={item.ticker}
                    className="rsi-row"
                >


                    <div className="rsi-ticker">

                        {item.ticker}

                    </div>



                    <div className="rsi-name">

                        {item.name}

                    </div>



                    <div 
                        className={`rsi-value ${type}`}
                    >

                        {item.rsi.toFixed(2)}

                    </div>


                </div>


            ))}


        </div>

    )
}