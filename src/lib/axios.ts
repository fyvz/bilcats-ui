import { refreshAccessToken } from "@/api/auth";
import axios from "axios";
import { getStoredAccessToken, setStoredAccessToken } from "./authToken";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

// Attach token on refresh
api.interceptors.request.use((config) => { //Sends with a request
    const token = getStoredAccessToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})
//To implement Refresh upon token expire
// Takes two functions (first for success the latter for error)
//checks the response for an error so we use a response interceptor
api.interceptors.response.use((res) => res, async (error) => {
    const originalRequest = error.config;
   if(error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh")){
    originalRequest._retry = true;

    try {
        const {accessToken: newToken} = await refreshAccessToken()
        setStoredAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
    } catch (error) {
        console.error("Refresh token failed",error
        );
    }
   }
   return Promise.reject(error);
}) 

export default api