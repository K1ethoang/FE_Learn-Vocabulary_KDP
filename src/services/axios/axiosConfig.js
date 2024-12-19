// src/axiosConfig.js
import axios from "axios";

// Create an Axios instance
const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL, // Your backend API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": true,
    // Set default content type
    // Add any other default headers here
  },
});

// Optional: Add interceptors for requests or responses
axiosConfig.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or modify the request here
    // const token = localStorage.getItem('token'); // Example for token
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error("API call error:", error);
    return Promise.reject(error);
  }
);

export default axiosConfig;
