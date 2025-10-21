export interface MenuCategory {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  status: number;
  created_at: string;
  category_id: number;
  category_name: string;
  image_url: string;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export const menuService: {
  getMenuCategories: () => Promise<ApiResponse<MenuCategory[]>>;
  getMenuItems: (categoryId?: number) => Promise<ApiResponse<MenuItem[]>>;
};
