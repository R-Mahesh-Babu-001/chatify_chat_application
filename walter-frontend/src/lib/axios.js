import axios from "axios";

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
