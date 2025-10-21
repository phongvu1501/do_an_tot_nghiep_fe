export interface OrderData {
  reservation_date: string;
  reservation_time: string;
  num_people: number;
  depsection?: string;
  voucher_id: string | null;
}

export type OrderFormData = OrderData;
