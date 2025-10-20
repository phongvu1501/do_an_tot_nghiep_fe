import { axiosInstance } from '../../config/axios';

export const authService = {
  register: async (data) => {
    const response = await axiosInstance.post('/register', data);
    return response.data;
  },
  
  login: async (data) => {
    const response = await axiosInstance.post('/login', data);
    return response.data;
  },
  
  logout: async () => {
    const response = await axiosInstance.post('/logout');
    return response.data;
  },
  
};
