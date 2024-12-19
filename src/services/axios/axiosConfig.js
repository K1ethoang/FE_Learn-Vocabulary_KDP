// src/axiosConfig.js
import axios from "axios";

// Create an Axios instance with default configuration
const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL, // Base URL for the API
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    // Default content type for requests
  },
});

// Request Interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    // Optionally add authorization tokens or modify the request here
    const token = localStorage.getItem("token"); // Example for token retrieval
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token if available
    }
    return config; // Return the modified config
  },
  (error) => {
    // Handle request errors
    console.error("Request error:", error);
    return Promise.reject(error); // Reject the promise with the error
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("API call error:", error.response.data); // Log the response data
      console.error("Status code:", error.response.status); // Log the status code
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
export default axiosConfig;
