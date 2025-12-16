import React, { useEffect, useState } from "react";
import { message } from "antd";
import { commentService } from "../services/comment/commentServices";
type Review = {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
};

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.044 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.05 2.927z" />
    </svg>
  );
}

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button key={i} type="button" onClick={() => onChange(i + 1)}>
          <Star filled={i < value} />
        </button>
      ))}
    </div>
  );
}

export default function ReviewPage() {
  const reservationId = 1;

  const [review, setReview] = useState<Review | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  // Load review
  useEffect(() => {
    async function fetchReview() {
      const res = await commentService.getReviewByReservation(reservationId);
      if (res?.data) {
        setReview(res.data);
        setRating(res.data.rating);
        setComment(res.data.comment);
      }
    }
    fetchReview();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!comment.trim()) {
      setError("Vui lòng nhập nội dung đánh giá");
      return;
    }

    try {
      let res;

      if (review) {
        res = await commentService.updateReview(review.id, {
          rating,
          comment,
        });
      } else {
        res = await commentService.submitReview(reservationId, {
          rating,
          comment,
        });
      }

      setReview(res.data);
      messageApi.success("Đánh giá đã được lưu thành công!");
    } catch (err) {
      messageApi.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {contextHolder}

      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Đánh giá của bạn
        </h2>
        <p className="text-gray-600">
          Chia sẻ cảm nhận của bạn về trải nghiệm tại nhà hàng.
        </p>

        {review && (
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} filled={i < review.rating} />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              • {new Date(review.created_at).toLocaleString("vi-VN")}
            </span>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-xl shadow border space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {review ? "Cập nhật đánh giá" : "Gửi đánh giá"}
        </h3>

        <div>
          <label className="text-sm text-gray-600">Số sao</label>
          <StarInput value={rating} onChange={setRating} />
        </div>

        <div>
          <label className="text-sm text-gray-600">Nhận xét</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            placeholder="Nội dung đánh giá..."
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          {review ? "Cập nhật đánh giá" : "Gửi đánh giá"}
        </button>
      </form>
    </div>
  );
}
