import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

// Create a base axios instance with common configuration
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enables sending cookies with requests
});

// Add request interceptor for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage or cookies
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, 500, etc.)
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== "undefined") {
        // Redirect to login or refresh token
        // window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
