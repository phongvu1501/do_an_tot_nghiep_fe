import { axiosInstance } from '../../config/axios';

export const commentService = {
  /**
   * Lấy review của user theo reservation
   * @param {number} reservationId
   */
  getReviewByReservation: async (reservationId) => {
    const response = await axiosInstance.get(
      `/reservations/${reservationId}/review`
    );
    return response.data;
  },

  /**
   * Gửi review mới cho reservation
   * @param {number} reservationId
   * @param {{ rating: number, comment: string }} payload
   */
  submitReview: async (reservationId, payload) => {
    const response = await axiosInstance.post(
      `/reservations/${reservationId}/review`,
      payload
    );
    return response.data;
  },

  /**
   * Cập nhật review
   * @param {number} reviewId
   * @param {{ rating: number, comment: string }} payload
   */
  updateReview: async (reviewId, payload) => {
    const response = await axiosInstance.post(
      `/reviews/${reviewId}`,
      payload
    );
    return response.data;
  },
};
