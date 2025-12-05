export interface Pivot {
  user_id: number;
  voucher_id: number;
  status: "used" | "unused";
  used_at: string | null;
  used_count: number;
  created_at: string;
  updated_at: string;
}

export interface UserVoucher {
  id: number;
  tier_id: number;
  code: string;
  discount_type: "percent" | "fixed";
  discount_value: string; 
  max_uses: number;
  min_order_value: string; 
  order_value_allowed: string;
  used_count: number;
  status: string; 
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  pivot?: Pivot;
}

export interface PointTier {
  id: number;
  name: string;
  points_required: number;
  discount_percent: number;
  min_order_value: string;
  max_discount_value: string;
  is_active: boolean;
}

export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}
