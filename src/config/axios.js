import axios from 'axios';
import { triggerLoginPopup } from '../utils/popupTrigger';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
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
  (response) => {
    return response;
  },
  (error) => {
    if (
      error?.response?.status === 401 ||
      error?.response?.data?.message === 'Unauthenticated.'
    ) {
      localStorage.removeItem('token');
      triggerLoginPopup();
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
export default axiosInstance;
