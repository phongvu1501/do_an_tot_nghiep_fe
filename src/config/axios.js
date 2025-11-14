import axios from "axios";
import { triggerLoginPopup } from "../utils/popupTrigger";
import { storage } from "../utils/storage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.data?.message) {
      if (
        response.data.message === "Unauthenticated" ||
        response.data.message.toLowerCase().includes("unauthenticated")
      ) {
        response.data.message = "Vui lòng đăng nhập lại";
      }
    }

    if (response?.status === 401) {
      storage.clearAuth();

      const requestUrl = response.config?.url ?? "";
      const isAuthEndpoint =
        requestUrl.includes("/login") || requestUrl.includes("/register");

      if (!isAuthEndpoint) {
        triggerLoginPopup();
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
export default axiosInstance;
