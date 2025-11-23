import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { message, Spin, DatePicker, Modal } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import colors from "../../config/colors";
import { vietnameseLocale } from "../../config/datePickerLocale";
import { shifts } from "../../config/timeSlots";
import { usePopup } from "../../hooks/usePopup";
import { orderSchema } from "../../validation/order";
import type { OrderFormData } from "../../interfaces/order";
import { orderService } from "../../services/order/orderServices";
import { storage } from "../../utils/storage";

type CreateReservationResponse = {
  success?: boolean;
  data?: {
    payment_url?: string;
  };
  payment_url?: string;
  message?: string;
  error?: string;
};

dayjs.locale("vi");

const ReservationPopup: React.FC = () => {
  const { currentPopup, closePopup } = usePopup();
  const [isLoading, setIsLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [paymentModalVisible, setPaymentModalVisible] = React.useState(false);
  const [paymentUrl, setPaymentUrl] = React.useState<string | null>(null);
  const [menuCart, setMenuCart] = React.useState(storage.getMenuCart());

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: yupResolver(orderSchema),
  });

  const resetAndClose = () => {
    reset();
    closePopup();
    setPaymentModalVisible(false);
    setPaymentUrl(null);
  };

  const isOrderPopupOpen = currentPopup === "order";

  React.useEffect(() => {
    if (isOrderPopupOpen) {
      setMenuCart(storage.getMenuCart());
    }
  }, [isOrderPopupOpen]);

  const handleRemoveMenu = (menuId: number) => {
    storage.removeMenuFromCart(menuId);
    setMenuCart(storage.getMenuCart());
    messageApi.success("Đã xóa món khỏi giỏ hàng");
  };

  const handleUpdateQuantity = (menuId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveMenu(menuId);
      return;
    }
    storage.updateMenuQuantity(menuId, quantity);
    setMenuCart(storage.getMenuCart());
  };

  const onSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    try {
      // Convert menu cart to the format expected by API
      const menus = menuCart.map((item) => ({
        menu_id: item.menu_id,
        quantity: item.quantity,
      }));

      const orderData: OrderFormData = {
        ...data,
        menus: menus.length > 0 ? menus : undefined,
      };

      const response = (await orderService.createReservation(
        orderData
      )) as CreateReservationResponse;

      if (response?.success) {
        const paymentUrl =
          response.data?.payment_url || response.payment_url || null;

        messageApi.success("Đặt bàn thành công!");

        // Clear menu cart after successful order
        storage.clearMenuCart();
        setMenuCart([]);

        if (paymentUrl) {
          setPaymentUrl(paymentUrl);
          setPaymentModalVisible(true);
          reset();
          closePopup();
        }
        if (!paymentUrl) {
          setTimeout(() => {
            resetAndClose();
          }, 1500);
        }
      } else {
        const errorMessage =
          response?.message ||
          response?.error ||
          "Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại.";

        messageApi.error(errorMessage);
      }
    } catch (error: unknown) {
      console.error("Create reservation error:", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (
          error as {
            response?: { data?: { message?: string; error?: string } };
          }
        ).response?.data
      ) {
        const { message: errorMessage, error: errorDetail } =
          (
            error as {
              response?: { data?: { message?: string; error?: string } };
            }
          ).response?.data ?? {};

        messageApi.error(
          errorMessage ||
            errorDetail ||
            "Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại."
        );
      } else {
        messageApi.error("Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    resetAndClose();
  };

  return (
    <>
      {contextHolder}

      {isOrderPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Đặt bàn</h2>
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
                    htmlFor="reservation_date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ngày đặt bàn
                  </label>
                  <Controller
                    name="reservation_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                          field.onChange(date ? date.format("YYYY-MM-DD") : "");
                        }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày"
                        className={`w-full ${
                          errors.reservation_date ? "border-red-500" : ""
                        }`}
                        disabledDate={(current) => {
                          return current && current < dayjs().startOf("day");
                        }}
                        locale={vietnameseLocale}
                      />
                    )}
                  />
                  {errors.reservation_date && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.reservation_date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="shift"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ca đặt bàn
                  </label>
                  <select
                    id="shift"
                    {...register("shift")}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.shift ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn ca</option>
                    {shifts.map((shift) => (
                      <option key={shift.value} value={shift.value}>
                        {shift.label}
                      </option>
                    ))}
                  </select>
                  {errors.shift && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.shift.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="num_people"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Số lượng người
                  </label>
                  <input
                    type="number"
                    id="num_people"
                    min="1"
                    max="20"
                    step="1"
                    {...register("num_people", {
                      valueAsNumber: true,
                      setValueAs: (value) => {
                        const num = parseInt(value);
                        if (isNaN(num) || num < 1 || num > 20) {
                          return undefined;
                        }
                        return num;
                      },
                    })}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }

                      if (/[0-9]/.test(e.key)) {
                        const currentValue = e.currentTarget.value;
                        const newValue = currentValue + e.key;
                        const num = parseInt(newValue);
                        if (num > 20) {
                          e.preventDefault();
                        }
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      let value = target.value;

                      value = value.replace(/[^0-9]/g, "");

                      const num = parseInt(value);
                      if (num > 20) {
                        value = "20";
                      }

                      target.value = value;
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.num_people ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập số lượng người (1-20)"
                  />
                  {errors.num_people && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.num_people.message}
                    </p>
                  )}
                </div>

                {/* <div>
                  <label
                    htmlFor="voucher_id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mã voucher (tùy chọn)
                  </label>
                  <input
                    type="text"
                    id="voucher_id"
                    {...register("voucher_id")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Nhập mã voucher nếu có"
                  />
                </div> */}

                {menuCart.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Món ăn đã chọn ({menuCart.length})
                    </label>
                    <div className="border border-gray-300 rounded-md max-h-48 overflow-y-auto">
                      {menuCart.map((item) => (
                        <div
                          key={item.menu_id}
                          className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              {item.name || `Món #${item.menu_id}`}
                            </p>
                            {item.price && (
                              <p className="text-xs text-gray-500">
                                {parseFloat(item.price).toLocaleString("vi-VN")}
                                đ
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.menu_id,
                                  item.quantity - 1
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.menu_id,
                                  item.quantity + 1
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveMenu(item.menu_id)}
                              className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="depsection"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ghi chú
                  </label>
                  <textarea
                    id="depsection"
                    {...register("depsection")}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white text-sm ${
                      errors.depsection ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập ghi chú. yêu cầu đặc biệt..."
                  />
                  {errors.depsection && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.depsection.message}
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
                    "Đặt bàn"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
        centered
        maskClosable={false}
      >
        <div className="space-y-4 text-center">
          <h3
            className="text-xl font-semibold"
            style={{ color: colors.primary.green }}
          >
            Thanh toán tiền cọc
          </h3>
          <p className="text-gray-600 text-sm">
            Đơn đặt bàn của bạn đã được tạo. Vui lòng thanh toán tiền cọc trong
            vòng 15 phút để hoàn tất xác nhận đặt bàn.
          </p>
          <button
            type="button"
            className="w-full py-3 px-4 rounded-md text-sm font-semibold transition-colors"
            style={{
              backgroundColor: colors.primary.green,
              color: "white",
            }}
            onClick={() => {
              if (paymentUrl) {
                window.open(paymentUrl, "_blank", "noopener,noreferrer");
                resetAndClose();
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary.yellow;
              e.currentTarget.style.color = colors.primary.green;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary.green;
              e.currentTarget.style.color = "white";
            }}
          >
            Đi tới trang thanh toán
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ReservationPopup;
