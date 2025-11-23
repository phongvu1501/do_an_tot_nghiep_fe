import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { message } from "antd";
import colors from "../config/colors";
import { menuService } from "../services/menu/menuServices";
import type { MenuCategory, MenuItem } from "../services/menu/menuServices";
import { storage } from "../utils/storage";

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchMenuItems = async (categoryId?: number) => {
    try {
      setItemsLoading(true);
      const response = await menuService.getMenuItems(categoryId);

      if (response.status === "success") {
        setMenuItems(response.data);
      }
    } catch (err) {
      console.error("Error fetching menu items:", err);
    } finally {
      setItemsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMenuCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await menuService.getMenuCategories();

        if (response.status === "success") {
          setMenuCategories(response.data);
          // Select first category and fetch its items
          if (response.data.length > 0) {
            const firstCategory = response.data[0];
            setActiveCategory(firstCategory.name);
            await fetchMenuItems(firstCategory.id);
          }
        } else {
          setError("Không thể tải danh mục menu");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Có lỗi xảy ra khi tải danh mục menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuCategories();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("menu-scroll");
    if (container) {
      const scrollAmount = 200;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    storage.addMenuToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      quantity: 1,
    });
    messageApi.success(`Đã thêm "${item.name}" vào giỏ hàng`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: colors.primary.green }}
          ></div>
          <p className="text-gray-600">Đang tải danh mục...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="min-h-screen">
        <div
          className="border-t-2"
          style={{
            backgroundColor: colors.primary.yellow,
            borderTopColor: colors.primary.green,
          }}
        >
          <div className="flex items-center">
            <button
              onClick={() => handleScroll("left")}
              className="p-3 text-white transition-colors"
              style={{
                backgroundColor: colors.primary.yellow,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.green;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.yellow;
              }}
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>

            <div
              id="menu-scroll"
              className="flex-1 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex space-x-6 px-4 py-1">
                {menuCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.name);
                      fetchMenuItems(category.id);
                    }}
                    className={`whitespace-nowrap px-4 py-1 text-sm font-semibold uppercase transition-all duration-200 ${
                      activeCategory === category.name
                        ? "border-b-2 border-b-solid"
                        : ""
                    }`}
                    style={{
                      color:
                        activeCategory === category.name
                          ? colors.primary.green
                          : "#374151",
                      borderBottomColor:
                        activeCategory === category.name
                          ? colors.primary.green
                          : "transparent",
                      borderBottomWidth:
                        activeCategory === category.name ? "2px" : "0px",
                    }}
                    onMouseEnter={(e) => {
                      if (activeCategory !== category.name) {
                        e.currentTarget.style.color = colors.primary.green;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeCategory !== category.name) {
                        e.currentTarget.style.color = "#374151";
                      }
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleScroll("right")}
              className="p-3 text-white transition-colors"
              style={{
                backgroundColor: colors.primary.yellow,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.green;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.yellow;
              }}
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full py-8">
          <div className="w-4/5 mx-auto">
            <div className="text-center mb-8">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: colors.primary.green }}
              >
                {activeCategory}
              </h2>
            </div>

            {itemsLoading ? (
              <div className="flex justify-center items-center py-8">
                <div
                  className="animate-spin rounded-full h-8 w-8 border-b-2"
                  style={{ borderColor: colors.primary.green }}
                ></div>
                <span className="ml-2 text-gray-600">Đang tải món ăn...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex"
                  >
                    <div className="w-2/5 h-32 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='14'%3EẢnh món ăn%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>

                    <div className="w-3/5 p-3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-lg font-semibold text-gray-900">
                          {parseFloat(item.price).toLocaleString("vi-VN")}đ
                        </p>
                      </div>

                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="px-3 py-1 text-xs font-semibold rounded transition-colors duration-200"
                          style={{
                            backgroundColor: colors.primary.green,
                            color: "white",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              colors.primary.yellow;
                            e.currentTarget.style.color = colors.primary.green;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              colors.primary.green;
                            e.currentTarget.style.color = "white";
                          }}
                        >
                          Đặt
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
