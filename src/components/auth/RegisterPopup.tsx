import { yupResolver } from "@hookform/resolvers/yup";
import { message, Spin } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import colors from "../../config/colors";
import { usePopup } from "../../hooks/usePopup";
import type { RegisterData } from "../../interfaces";
import { authService } from "../../services/auth/authServices";
import { registerSchema } from "../../validation/auth";

type RegisterFormData = RegisterData;

interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
}

const RegisterPopup: React.FC = () => {
  const { currentPopup, closePopup, switchPopup, openPopup } = usePopup();
  const [isLoading, setIsLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  if (currentPopup !== "register") return null;

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const res = await authService.register(data);

      if (res.success) {
        messageApi.success(res.message || "Đăng ký thành công!");
        closePopup();
        reset();

        setTimeout(() => {
          openPopup("login");
        }, 500);
      } else {
        if (res.errors) {
          const allErrors = Object.values(res.errors).flat();
          messageApi.error(allErrors.join(", "));
        } else {
          messageApi.error(res.message || "Có lỗi xảy ra!");
        }
      }
    } catch (err: unknown) {
      const error = err as ApiError;

      if (error.response?.data?.errors) {
        const allErrors = Object.values(error.response.data.errors).flat();
        messageApi.error(allErrors.join(", "));
      } else {
        const msg = error.response?.data?.message || "Đăng ký thất bại.";
        messageApi.error(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    closePopup();
  };

  return (
    <>
      {contextHolder}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Đăng ký tài khoản
              </h2>
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

            {/* Hiển thị validation errors từ server */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập họ và tên"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

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

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  {...register("password_confirmation")}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.password_confirmation
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Nhập lại mật khẩu"
                />
                {errors.password_confirmation && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{ backgroundColor: colors.primary.green }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor =
                      colors.primary.yellow;
                    e.currentTarget.style.color = colors.primary.green;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor =
                      colors.primary.green;
                    e.currentTarget.style.color = "white";
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Spin
                      size="small"
                      style={{ color: "white", marginRight: 8 }}
                    />
                    Đang xử lý...
                  </div>
                ) : (
                  "Đăng ký"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{" "}
                <button
                  onClick={() => switchPopup("register", "login")}
                  className="text-orange-600 hover:text-orange-500 font-medium"
                >
                  Đăng nhập ngay
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPopup;
