import axios from "axios";
import authService from "@services/authService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "❌ Erreur response:",
      error.response?.status,
      error.config?.url,
    );

    const requestUrl = error.config?.url || "";
    const isPasswordUpdate = requestUrl.includes("/auth/update-password");

    if (error.response?.status === 401 && !isPasswordUpdate) {
      authService.logout();
      try {
        window.dispatchEvent(new CustomEvent('auth:logout'));
      } catch {
        window.location.href = "/connexion";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
