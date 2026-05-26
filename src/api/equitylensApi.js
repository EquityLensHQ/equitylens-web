/*
This is where the frontend will talk to the backend.
*/


import axios from "axios"; //need for api calls

const API_BASE = "http://localhost:8000"; //access to the equitylensApi

//get stock data for any ticker
export const getStockData = async (ticker) => {
    const res = await axios.get(`${API_BASE}/stock/${ticker}`); //make the api call
    return res.data; 

}