export interface UserVoucher {
  id: number;
  name: string;
  points_required: number;
  discount_percent: number;
  min_order_value: number;
  order_value_allowed: number;
  start_date: string;
  end_date: string;
  status: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}
