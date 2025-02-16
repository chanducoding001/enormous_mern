import axios from "axios";

// Base URL instance
export const baseUrlInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        // "X-API-Key": import.meta.env.VITE_XAPI_KEY,
        // "Access-Control-Allow-Origin": "*"
    }
});
