import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { message, Spin } from "antd";
import { useAuth } from "../hooks/useAuth";
import { storage } from "../utils/storage";
import colors from "../config/colors";
import { authService } from "../services/auth/authServices";
import * as yup from "yup";

const profileSchema = yup.object({
  name: yup
    .string()
    .required("Họ và tên là bắt buộc")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(50, "Họ và tên không được quá 50 ký tự"),
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
  email: yup.string().optional().email("Email không hợp lệ"),
});

const changePasswordSchema = yup.object({
  current_password: yup.string().required("Mật khẩu hiện tại là bắt buộc"),
  new_password: yup
    .string()
    .required("Mật khẩu mới là bắt buộc")
    .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu mới không được quá 20 ký tự")
    .test(
      "different-password",
      "Mật khẩu mới phải khác mật khẩu hiện tại",
      function (value) {
        const currentPassword = this.parent.current_password;
        if (!value || !currentPassword) return true;
        return value !== currentPassword;
      }
    ),
  new_password_confirmation: yup
    .string()
    .required("Xác nhận mật khẩu là bắt buộc")
    .oneOf([yup.ref("new_password")], "Mật khẩu xác nhận không khớp"),
});

type ChangePasswordFormData = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

type ProfileFormData = yup.InferType<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: unknown) => {
    const formData = data as ProfileFormData;
    setIsLoading(true);
    try {
      const response = await authService.updateProfile({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      });

      if (response.success && response.user) {
        // Cập nhật user trong storage và context
        storage.setUser(response.user);
        if (setUser) {
          setUser(response.user);
        }
        messageApi.success(
          response.message || "Cập nhật thông tin thành công!"
        );
        setIsEditing(false);
      } else {
        // Xử lý lỗi validation từ server
        if (response.errors) {
          const allErrors = Object.values(response.errors).flat();
          messageApi.error(allErrors.join(", "));
        } else {
          messageApi.error(
            response.message || "Có lỗi xảy ra khi cập nhật thông tin"
          );
        }
      }
    } catch (err: unknown) {
      console.error("Error updating profile:", err);
      const error = err as {
        response?: {
          data?: {
            message?: string;
            errors?: Record<string, string[]>;
          };
        };
      };

      if (error.response?.data?.errors) {
        const allErrors = Object.values(error.response.data.errors).flat();
        messageApi.error(allErrors.join(", "));
      } else {
        messageApi.error(
          error.response?.data?.message ||
          "Có lỗi xảy ra khi cập nhật thông tin"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (formData: ChangePasswordFormData) => {
    setIsChangingPassword(true);
    try {
      const response = await authService.changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password,
      });

      if (response.success) {
        messageApi.success(response.message || "Đổi mật khẩu thành công!");
        setChangePasswordVisible(false);
        resetPassword();
      } else {
        // Xử lý lỗi validation từ server
        if (response.errors) {
          const allErrors = Object.values(response.errors).flat();
          messageApi.error(allErrors.join(", "));
        } else {
          messageApi.error(
            response.message || "Có lỗi xảy ra khi đổi mật khẩu"
          );
        }
      }
    } catch (err: unknown) {
      console.error("Error changing password:", err);
      const error = err as {
        response?: {
          data?: {
            message?: string;
            errors?: Record<string, string[]>;
          };
        };
      };

      if (error.response?.data?.errors) {
        const allErrors = Object.values(error.response.data.errors).flat();
        messageApi.error(allErrors.join(", "));
      } else {
        messageApi.error(
          error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu"
        );
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600">
            Vui lòng đăng nhập để xem thông tin cá nhân
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="min-h-screen py-8">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: colors.primary.green }}
                >
                  Thông tin cá nhân
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: colors.primary.green,
                      color: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        colors.primary.yellow;
                      e.currentTarget.style.color = colors.primary.green;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        colors.primary.green;
                      e.currentTarget.style.color = "white";
                    }}
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="Nhập họ và tên"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900 py-2">{user.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="Nhập số điện thoại"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900 py-2">
                      {user.phone || "Chưa cập nhật"}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-gray-400 text-xs"></span>
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="Nhập địa chỉ email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900 py-2">
                      {user.email || "Chưa cập nhật"}
                    </p>
                  )}
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Điểm tích lũy
                  </label>
                  <p className="text-gray-900 py-2">{user.points ?? 0}</p>
                </div> */}

                {!isEditing && (
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setChangePasswordVisible(true)}
                      className="px-4 py-2 rounded-md text-sm font-medium transition-colors border"
                      style={{
                        borderColor: colors.primary.green,
                        color: colors.primary.green,
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          colors.primary.green;
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = colors.primary.green;
                      }}
                    >
                      Đổi mật khẩu
                    </button>
                  </div>
                )}

                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        reset({
                          name: user.name || "",
                          phone: user.phone || "",
                          email: user.email || "",
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""
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
                        <div className="flex items-center">
                          <Spin
                            size="small"
                            style={{ color: "white", marginRight: 8 }}
                          />
                          Đang lưu...
                        </div>
                      ) : (
                        "Lưu thay đổi"
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Popup */}
      {changePasswordVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Đổi mật khẩu
                </h2>
                <button
                  onClick={() => {
                    setChangePasswordVisible(false);
                    resetPassword();
                  }}
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

              <form
                onSubmit={handleSubmitPassword(onPasswordSubmit)}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="current_password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mật khẩu hiện tại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="current_password"
                    {...registerPassword("current_password")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${passwordErrors.current_password
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                  {passwordErrors.current_password && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.current_password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="new_password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mật khẩu mới <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="new_password"
                    {...registerPassword("new_password")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${passwordErrors.new_password
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                    placeholder="Nhập mật khẩu mới"
                  />
                  {passwordErrors.new_password && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.new_password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="new_password_confirmation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Xác nhận mật khẩu mới{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="new_password_confirmation"
                    {...registerPassword("new_password_confirmation")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${passwordErrors.new_password_confirmation
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  {passwordErrors.new_password_confirmation && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.new_password_confirmation.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setChangePasswordVisible(false);
                      resetPassword();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors ${isChangingPassword ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    style={{ backgroundColor: colors.primary.green }}
                    onMouseEnter={(e) => {
                      if (!isChangingPassword) {
                        e.currentTarget.style.backgroundColor =
                          colors.primary.yellow;
                        e.currentTarget.style.color = colors.primary.green;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isChangingPassword) {
                        e.currentTarget.style.backgroundColor =
                          colors.primary.green;
                        e.currentTarget.style.color = "white";
                      }
                    }}
                  >
                    {isChangingPassword ? (
                      <div className="flex items-center">
                        <Spin
                          size="small"
                          style={{ color: "white", marginRight: 8 }}
                        />
                        Đang xử lý...
                      </div>
                    ) : (
                      "Đổi mật khẩu"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
