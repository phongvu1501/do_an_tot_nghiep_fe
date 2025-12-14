export interface MenuItem {
  menu_id: number;
  quantity: number;
}

export interface OrderData {
  reservation_date: string;
  shift: string;
  num_people: number;
  depsection?: string;
  voucher_id?: string | null;
  menus?: MenuItem[];
  prefer_vip?: boolean;
}

export type OrderFormData = OrderData;

export interface OrderHistoryMenuItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderHistoryTable {
  id: number;
  name: string;
}

export interface ShiftInfo {
  id: number;
  name: string;
  time: string;
}

export interface OrderHistoryItem {
  id: number;
  status: string;
  status_text: string;
  reservation_code?: string;
  reservation_date: string;
  num_people: number;
  depsection?: string | null;
  tables: OrderHistoryTable[];
  tables_count: number;
  shift_info: ShiftInfo;
  voucher_code?: string | null;
  cancellation_reason?: string | null;
  subtotal?: number;
  vat?: number;
  total_price: number;
  voucher_discount?: number;
  final_amount?: number;
  deposit?: number | string | null;
  table_deposit?: number | null;
  food_deposit?: number | null;
  created_at: string;
  menus?: OrderHistoryMenuItem[];
  payment_url?: string | null;
  refund_days?: number;
  can_be_refunded?: boolean;
  days_until_reservation?: number;
  refunded_at?: string | null;
  is_refunded?: boolean;
  refund_bill_image?: string | null;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}
