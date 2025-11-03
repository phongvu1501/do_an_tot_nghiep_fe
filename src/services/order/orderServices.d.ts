import { OrderData } from "../../interfaces/order";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const orderService: {
  createReservation: (data: OrderData) => Promise<ApiResponse<unknown>>;
};


