import { axiosInstance } from '../../config/axios';

export const orderService = {
  createReservation: async (data) => {
    const response = await axiosInstance.post('/dat-ban-an', data);
    return response.data;
  },
};


