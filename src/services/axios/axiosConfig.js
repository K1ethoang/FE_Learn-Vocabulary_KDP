// src/axiosConfig.js
import axios from "axios";

// Create an Axios instance with default configuration
const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL, // Base URL for the API
  timeout: 10000, // Request timeout
  // headers: {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //   "Access-Control-Allow-Headers":
  //     "Content-Type, Authorization, Content-Length, X-Requested-With",
  //   "Access-Control-Allow-Credentials": true,
  //   // Default content type
  // },
});

// Request Interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    // Optionally add authorization tokens or modify the request here
    const token = localStorage.getItem("token"); // Example for token retrieval
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error("Request error:", error);
    return Promise.reject(error); // Reject the promise with the error
  }
);

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem("accessToken"); // Xóa token cũ
      window.location.href = "/login"; // Chuyển hướng về trang login
    }
    return Promise.reject(error);
  }
);
export default axiosConfig;
