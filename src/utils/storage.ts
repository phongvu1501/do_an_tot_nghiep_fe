export const storage = {
  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },

  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  setUser: (user: {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  }) => {
    localStorage.setItem("user_info", JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem("user_info");
    return user ? JSON.parse(user) : null;
  },

  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_info");
  },

};
