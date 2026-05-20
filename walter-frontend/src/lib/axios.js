import axios from "axios";

const AUTH_TOKEN_KEY = "chatify_auth_token";

const normalizeApiBase = (rawValue) => {
  if (!rawValue) return "/api";
  const trimmed = rawValue.trim().replace(/\/+$/, "");
  if (!trimmed) return "/api";
  return /\/api$/i.test(trimmed) ? trimmed : `${trimmed}/api`;
};

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : normalizeApiBase(import.meta.env.VITE_API_URL);

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
