import axios from "axios"; //need for api calls

const API_BASE = import.meta.env.VITE_API_BASE;

//get stock data for any ticker
export async function getInsights(ticker, startDate, endDate) {
    const response = await axios.get(`${API_BASE}/insights/${ticker}`,
        {
            params: {
                ticker: ticker,
                start_date: startDate,
                end_date: endDate
            }
        }
    );
    
    
    console.log(response)
    return response.data;
}

