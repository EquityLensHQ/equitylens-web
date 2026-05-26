/*
This is where the frontend will talk to the backend.
*/


import axios from "axios";

const API_BASE = "http://localhost:8000";

export const getStockData = async (ticker) => {
    const res = await axios.get(`${API_BASE}/stock/${ticker}`);
    return res.data;

}