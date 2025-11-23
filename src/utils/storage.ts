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

  addMenuToCart: (menuItem: {
    id: number;
    name: string;
    price: string;
    image_url: string;
    quantity?: number;
  }) => {
    const cart = storage.getMenuCart();
    const existingItem = cart.find((item) => item.menu_id === menuItem.id);

    if (existingItem) {
      existingItem.quantity =
        (existingItem.quantity || 1) + (menuItem.quantity || 1);
    } else {
      cart.push({
        menu_id: menuItem.id,
        quantity: menuItem.quantity || 1,
        name: menuItem.name,
        price: menuItem.price,
        image_url: menuItem.image_url,
      });
    }

    localStorage.setItem("menu_cart", JSON.stringify(cart));
    return cart;
  },

  getMenuCart: (): Array<{
    menu_id: number;
    quantity: number;
    name?: string;
    price?: string;
    image_url?: string;
  }> => {
    const cart = localStorage.getItem("menu_cart");
    return cart ? JSON.parse(cart) : [];
  },

  removeMenuFromCart: (menuId: number) => {
    const cart = storage.getMenuCart();
    const filteredCart = cart.filter((item) => item.menu_id !== menuId);
    localStorage.setItem("menu_cart", JSON.stringify(filteredCart));
    return filteredCart;
  },

  updateMenuQuantity: (menuId: number, quantity: number) => {
    const cart = storage.getMenuCart();
    const item = cart.find((item) => item.menu_id === menuId);
    if (item) {
      if (quantity <= 0) {
        return storage.removeMenuFromCart(menuId);
      }
      item.quantity = quantity;
      localStorage.setItem("menu_cart", JSON.stringify(cart));
    }
    return cart;
  },

  clearMenuCart: () => {
    localStorage.removeItem("menu_cart");
  },
};
