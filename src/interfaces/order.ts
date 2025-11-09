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
  total_price: number;
  created_at: string;
  menus?: OrderHistoryMenuItem[];
  payment_url?: string | null;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}
