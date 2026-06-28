import axios from "axios"; //need for api calls

const API_BASE = import.meta.env.VITE_API_BASE;

//get stock data for any ticker
export async function getMacroStats() {

    const response = await axios.get(`${API_BASE}/macro-stats/`);
    
    console.log(response)
    return response.data;
}

