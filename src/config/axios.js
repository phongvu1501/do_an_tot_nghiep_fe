import axios from "axios";
import { triggerLoginPopup } from "../utils/popupTrigger";
import { storage } from "../utils/storage";
import { showMessage } from "../utils/messageService";

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

    if (response?.status === 401) {
      // Xác định message hiển thị
      let messageToShow = "Vui lòng đăng nhập lại";
      
      if (response?.data?.message) {
        if (
          response.data.message === "Unauthenticated" ||
          response.data.message.toLowerCase().includes("unauthenticated")
        ) {
          messageToShow = "Vui lòng đăng nhập lại";
        } else {
          messageToShow = response.data.message;
        }
      }
      
      // Cập nhật message trong response để các component có thể sử dụng
      if (!response.data) {
        response.data = {};
      }
      response.data.message = messageToShow;

      // Xóa auth từ storage
      storage.clearAuth();

      // Kiểm tra endpoint type
      const requestUrl = response.config?.url ?? "";
      const isLogoutEndpoint = requestUrl.includes("/logout");
      const isAuthEndpoint =
        requestUrl.includes("/login") || requestUrl.includes("/register");
      const skipLoginPopup = response.config?.skipLoginPopup === true;

      // Không mở popup login và không hiển thị message nếu:
      // 1. Là endpoint logout
      // 2. Là endpoint auth (login/register)
      // 3. Hoặc có flag skipLoginPopup
      if (!isLogoutEndpoint && !isAuthEndpoint && !skipLoginPopup) {
        // Hiển thị thông báo "Vui lòng đăng nhập lại"
        showMessage.error(messageToShow);
        // Mở popup login
        triggerLoginPopup();
      }
      // Nếu là logout endpoint hoặc auth endpoint, không hiển thị message và không mở popup
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
export default axiosInstance;
