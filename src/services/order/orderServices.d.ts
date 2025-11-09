import {
  OrderData,
  OrderHistoryItem,
  Pagination,
} from "../../interfaces/order";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  status?: string;
  pagination?: Pagination;
}

export const orderService: {
  createReservation: (data: OrderData) => Promise<ApiResponse<unknown>>;
  getHistory: () => Promise<ApiResponse<OrderHistoryItem[]>>;
  getReservationDetail: (id: number) => Promise<ApiResponse<OrderHistoryItem>>;
};
