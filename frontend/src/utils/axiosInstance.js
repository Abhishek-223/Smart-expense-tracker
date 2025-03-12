import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://smart-expense-tracker-f7q7.onrender.com/api", // Backend URL
});

// Request Interceptor - Attach Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
