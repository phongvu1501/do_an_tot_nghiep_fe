import { axiosInstance } from '../../config/axios';

export const voucherService = {
    getUserVouchers: async () => {
        const response = await axiosInstance.get('/user/vouchers');
        return response.data;
    },

    getAvailableVouchers: async () => {
        const response = await axiosInstance.get('/vouchers/redeem/history');
        return response.data;
    },

    redeemPoints: async (tierId) => {
        const response = await axiosInstance.post('/vouchers/redeem', { tier_id: tierId });
        return response.data;
    },

    getPointTiers: async () => {
        const response = await axiosInstance.get('/tiers/getAllTiers');
        return response.data;
    },
};
