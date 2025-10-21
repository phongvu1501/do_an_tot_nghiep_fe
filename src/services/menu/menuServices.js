import { axiosInstance } from '../../config/axios';

export const menuService = {
  getMenuCategories: async () => {
    const response = await axiosInstance.get('/menu-categories');
    return response.data;
  },
  
  getMenuItems: async (categoryId = null) => {
    const url = categoryId ? `/menus?category_id=${categoryId}` : '/menus';
    const response = await axiosInstance.get(url);
    return response.data;
  },
};
