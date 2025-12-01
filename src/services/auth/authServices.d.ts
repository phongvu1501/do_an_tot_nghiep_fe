import {
  RegisterData,
  LoginData,
  ApiResponse,
  AuthResponse,
  RegisterResponse,
  User,
} from "../../interfaces";

export interface UpdateProfileData {
  name: string;
  email?: string;
  phone: string;
}

export interface UpdateProfileResponse extends ApiResponse {
  user?: User;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

export type ChangePasswordResponse = ApiResponse;

export const authService: {
  register: (data: RegisterData) => Promise<RegisterResponse>;
  login: (data: LoginData) => Promise<ApiResponse<AuthResponse>>;
  logout: () => Promise<ApiResponse>;
  updateProfile: (data: UpdateProfileData) => Promise<UpdateProfileResponse>;
  changePassword: (data: ChangePasswordData) => Promise<ChangePasswordResponse>;
};
