import * as yup from "yup";
import type { OrderFormData } from "../interfaces/order";

export const orderSchema: yup.ObjectSchema<OrderFormData> = yup
  .object({
    reservation_date: yup
      .string()
      .required("Vui lòng chọn ngày đặt bàn")
      .test(
        "future-date",
        "Ngày đặt bàn phải là ngày trong tương lai",
        function (value) {
          if (!value) return false;
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selectedDate >= today;
        }
      ),
    shift: yup
      .string()
      .required("Vui lòng chọn ca đặt bàn")
      .oneOf(
        ["morning", "afternoon", "evening", "night"],
        "Vui lòng chọn ca ăn"
      ),
    num_people: yup
      .number()
      .typeError("Vui lòng nhập số lượng người")
      .required("Vui lòng nhập số lượng người")
      .min(1, "Số lượng người phải ít nhất 1 người")
      .test(
        "max-people",
        "Số lượng người không được vượt quá giới hạn",
        function (value) {
          const preferVip = this.parent.prefer_vip;
          const maxPeople = preferVip ? 50 : 20;
          if (value && value > maxPeople) {
            return this.createError({
              message: preferVip
                ? "Số lượng người không được vượt quá 50 người (bàn VIP)"
                : "Số lượng người không được vượt quá 20 người (bàn thường)",
            });
          }
          return true;
        }
      )
      .integer("Số lượng người phải là số nguyên"),
    depsection: yup.string().optional().default(undefined),
    voucher_id: yup.string().nullable().optional().default(null),
    menus: yup
      .array()
      .of(
        yup.object({
          menu_id: yup.number().required(),
          quantity: yup.number().required().min(1),
        })
      )
      .optional()
      .default([]),
    prefer_vip: yup.boolean().optional().default(false),
  })
  .required();
