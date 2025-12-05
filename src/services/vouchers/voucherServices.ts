import axios from "axios";
import { storage } from "../../utils/storage";
import type { UserVoucher, ApiResponse } from "./types";

export interface PointTier {
  id: number;
  name: string;
  points_required: number;
  discount_percent: number;
  min_order_value: string;
  max_discount_value: string;
  is_active: boolean;
}

export const voucherService = {
  getUserVouchers: async (): Promise<ApiResponse<UserVoucher[]>> => {
    const token = storage.getToken();
    const response = await axios.get("/api/user/vouchers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getAvailableVouchers: async (): Promise<ApiResponse<UserVoucher[]>> => {
    const token = storage.getToken();
    const response = await axios.get("/api/vouchers/redeem/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  redeemPoints: async (
    tierId: number
  ): Promise<ApiResponse<{ voucher: UserVoucher; remaining_points: number }>> => {
    const token = storage.getToken();
    const response = await axios.post(
      "/api/vouchers/redeem",
      { tier_id: tierId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  getPointTiers: async (): Promise<ApiResponse<PointTier[]>> => {
    const token = storage.getToken();
    const response = await axios.get("/api/point-voucher-tiers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
