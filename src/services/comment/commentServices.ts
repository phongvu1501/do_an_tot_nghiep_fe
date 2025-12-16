import { axiosInstance } from "../../config/axios";
import type { Comment, CommentPayload, ApiResponse } from "./commentTypes";

export const commentService = {
 
  getReviewByReservation: async (
    reservationId: number
  ): Promise<ApiResponse<Comment | null>> => {
    const response = await axiosInstance.get(
      `/reservations/${reservationId}/review`
    );
    return response.data;
  },

  
  submitReview: async (
    reservationId: number,
    payload: CommentPayload
  ): Promise<ApiResponse<Comment>> => {
    const response = await axiosInstance.post(
      `/reservations/${reservationId}/review`,
      payload
    );
    return response.data;
  },

  
  updateReview: async (
    reviewId: number,
    payload: CommentPayload
  ): Promise<ApiResponse<Comment>> => {
    const response = await axiosInstance.post(
      `/reviews/${reviewId}`,
      payload
    );
    return response.data;
  },
};
