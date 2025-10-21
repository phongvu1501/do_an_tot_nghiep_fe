import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { message, Spin, DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import colors from "../../config/colors";
import { vietnameseLocale } from "../../config/datePickerLocale";
import { timeSlots } from "../../config/timeSlots";
import { usePopup } from "../../hooks/usePopup";
import { useDisableScroll } from "../../hooks/useDisableScroll";
import { orderSchema } from "../../validation/order";
import type { OrderFormData } from "../../interfaces/order";

dayjs.locale("vi");

const OrderPopup: React.FC = () => {
  const { currentPopup, closePopup } = usePopup();
  const [isLoading, setIsLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Disable scroll when popup is open
  useDisableScroll(currentPopup === "order");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: yupResolver(orderSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  if (currentPopup !== "order") return null;

  const onSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    try {
      console.log("Order data:", data);

      messageApi.success("Đặt bàn thành công!");

      setTimeout(() => {
        closePopup();
        reset();
      }, 1500);
    } catch {
      messageApi.error("Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại.");
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
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.primary.green }}
              >
                Đặt bàn
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
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-sm ${
                        errors.reservation_date
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      disabledDate={(current) => {
                        // Disable dates before today
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
                  htmlFor="reservation_time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Giờ đặt bàn
                </label>
                <select
                  id="reservation_time"
                  {...register("reservation_time")}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-sm ${
                    errors.reservation_time
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Chọn giờ</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.reservation_time && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.reservation_time.message}
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
                      if (
                        value === "" ||
                        value === null ||
                        value === undefined
                      ) {
                        return undefined;
                      }
                      const num = parseInt(value);
                      if (isNaN(num)) {
                        return undefined;
                      }
                      return num;
                    },
                  })}
                  onKeyDown={(e) => {
                    // Chỉ cho phép số, backspace, delete, arrow keys
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

                    // Chặn số lớn hơn 20
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

                    // Chỉ giữ lại số
                    value = value.replace(/[^0-9]/g, "");

                    // Giới hạn tối đa 20
                    const num = parseInt(value);
                    if (num > 20) {
                      value = "20";
                    }

                    target.value = value;
                  }}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-sm ${
                    errors.num_people ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập số lượng người"
                />
                {errors.num_people && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.num_people.message}
                  </p>
                )}
              </div>

              <div>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-sm"
                  placeholder="Nhập mã voucher nếu có"
                />
              </div>

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
    </>
  );
};

export default OrderPopup;
