import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Họ và tên là bắt buộc")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(50, "Họ và tên không được quá 50 ký tự"),
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
  email: yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự"),
  password_confirmation: yup
    .string()
    .required("Xác nhận mật khẩu là bắt buộc")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
});

export const loginSchema = yup.object({
  email: yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
  password: yup.string().required("Mật khẩu là bắt buộc"),
});
