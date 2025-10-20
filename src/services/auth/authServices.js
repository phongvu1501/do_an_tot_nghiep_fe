import { axiosInstance } from '../../config/axios';

export const authService = {
  register: async (data) => {
    const response = await axiosInstance.post('/register', data);
    return response.data;
  },
  
};
