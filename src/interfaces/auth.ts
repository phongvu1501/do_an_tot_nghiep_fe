export interface RegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
  expires_in: string;
}

// Interface cho response đăng ký - hỗ trợ cả 2 format:
// 1. Format có token: { success, message, data: { token, user } }
// 2. Format không có token: { success, message, user } (user ở root level)
export interface RegisterResponse extends ApiResponse<AuthResponse> {
  user?: User; // User có thể ở root level khi không có token
}
