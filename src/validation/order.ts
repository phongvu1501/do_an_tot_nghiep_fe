import * as yup from "yup";

export const orderSchema = yup.object({
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
  reservation_time: yup.string().required("Vui lòng chọn giờ đặt bàn"),
  num_people: yup
    .number()
    .typeError("Vui lòng nhập số lượng người")
    .required("Vui lòng nhập số lượng người")
    .min(1, "Số lượng người phải ít nhất 1 người")
    .max(20, "Số lượng người không được vượt quá 20 người")
    .integer("Số lượng người phải là số nguyên"),
  depsection: yup.string().optional().default(undefined),
  voucher_id: yup.string().nullable().optional().default(null),
});
