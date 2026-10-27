// פונקציית עזר אחת ל-fetch: כתובת בסיס, Content-Type, Authorization עם הטוקן, בדיקת response.ok

import axios from "axios";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const api = axios.create({
    baseURL: VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            localStorage.removeItem("token");
            window.dispatchEvent(new Event("auth:unauthorized"));
        }
        return Promise.reject(error);
    }
)