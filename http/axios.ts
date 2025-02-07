// axiosConfig.ts
import axios, { AxiosResponse, AxiosError } from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "/api/", // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: any) => {
    // Modify request config here (e.g., add authentication token)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Log the request
    console.log("Request:", config);
    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log the response
    console.log("Response:", response);
    return response;
  },
  (error: AxiosError) => {
    // Handle response error
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Error Response:", error.response);
      // You can handle specific status codes here
      if (error.response.status === 401) {
        // Handle unauthorized error (e.g., redirect to login)
        console.error("Unauthorized, redirecting to login...");
        // Redirect to login page or handle the token refresh logic
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Error Request:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error Message:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
