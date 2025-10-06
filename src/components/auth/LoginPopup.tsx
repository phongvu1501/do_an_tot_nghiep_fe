import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import colors from "../../config/colors";
import { usePopup } from "../../hooks/usePopup";
import { loginSchema } from "../../validation/auth";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPopup: React.FC = () => {
  const { currentPopup, closePopup, switchPopup } = usePopup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  if (currentPopup !== "login") return null;

  const onSubmit = (data: LoginFormData) => {
    console.log("Login:", data);
    closePopup();
    reset();
  };

  const handleClose = () => {
    reset();
    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Đăng nhập</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập địa chỉ email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200"
              style={{ backgroundColor: colors.primary.green }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.yellow;
                e.currentTarget.style.color = colors.primary.green;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.green;
                e.currentTarget.style.color = "white";
              }}
            >
              Đăng nhập
            </button>
          </form>
          <div className="flex items-center justify-end mt-2">
            <button
              type="button"
              className="text-sm text-orange-600 hover:text-orange-500"
            >
              Quên mật khẩu?
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <button
                onClick={() => switchPopup("login", "register")}
                className="text-orange-600 hover:text-orange-500 font-medium"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
