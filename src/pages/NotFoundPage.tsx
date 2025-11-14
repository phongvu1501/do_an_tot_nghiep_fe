import React from "react";
import { Link } from "react-router-dom";
import colors from "../config/colors";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1
            className="text-9xl font-extrabold mb-4"
            style={{ color: colors.primary.green }}
          >
            404
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
        </div>

        <h2
          className="text-4xl font-bold mb-4"
          style={{ color: colors.primary.green }}
        >
          Trang không tồn tại
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: colors.primary.green }}
          >
            Về trang chủ
          </Link>
          <Link
            to="/menu"
            className="px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:bg-gray-50"
            style={{
              borderColor: colors.primary.green,
              color: colors.primary.green,
            }}
          >
            Xem thực đơn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
