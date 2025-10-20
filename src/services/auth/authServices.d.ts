import {
  RegisterData,
  LoginData,
  ApiResponse,
  AuthResponse,
} from "../../interfaces";

export const authService: {
  register: (data: RegisterData) => Promise<ApiResponse<AuthResponse>>;
  login: (data: LoginData) => Promise<ApiResponse<AuthResponse>>;
  logout: () => Promise<ApiResponse>;
};
