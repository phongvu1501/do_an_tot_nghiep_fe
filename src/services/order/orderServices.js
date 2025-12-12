import { axiosInstance } from '../../config/axios';

export const orderService = {
  createReservation: async (data) => {
    const response = await axiosInstance.post('/dat-ban-an', data);
    return response.data;
  },
  getHistory: async () => {
    const response = await axiosInstance.get('/dat-ban-an/history');
    return response.data;
  },
  getReservationDetail: async (id) => {
    const response = await axiosInstance.get(`/dat-ban-an/${id}`);
    return response.data;
  },
  cancelReservation: async (id, data) => {
    const response = await axiosInstance.put(`/dat-ban-an/${id}/cancel`, data);
    return response.data;
  },
};


