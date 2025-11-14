import {
  RegisterData,
  LoginData,
  ApiResponse,
  AuthResponse,
  RegisterResponse,
} from "../../interfaces";

export const authService: {
  register: (data: RegisterData) => Promise<RegisterResponse>;
  login: (data: LoginData) => Promise<ApiResponse<AuthResponse>>;
  logout: () => Promise<ApiResponse>;
};
