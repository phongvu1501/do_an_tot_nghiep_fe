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
