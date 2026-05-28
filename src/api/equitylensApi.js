/*
This is where the frontend will talk to the backend.
*/


import axios from "axios"; //need for api calls

const API_BASE = import.meta.env.VITE_API_BASE; //access to the equitylensApi

//get stock data for any ticker
export async function getStockData(ticker, startDate, endDate) {
    const response = await axios.get(`${API_BASE}/stock/${ticker}`,
        {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        }
    );
    
    
    console.log(response)
    return response.data;
}


