import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import colors from "../config/colors";

const menuCategories = [
  "TẤT CẢ",
  "ĐỒ UỐNG",
  "MÓN MỚI",
  "MÓN NHẬU",
  "ĐỒ NƯỚNG",
  "RAU XANH",
  "HẢI SẢN",
  "CÁ",
  "NỘM",
];

const foodItems = [
  {
    id: 1,
    name: "Trâu xào rau muống",
    price: "159,000",
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271706594276.webp",
  },
  {
    id: 2,
    name: "Trâu xào rau muống",
    price: "159,000",
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271706594276.webp",
  },
  {
    id: 3,
    name: "Trâu xào rau muống",
    price: "159,000",
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271706594276.webp",
  },
  {
    id: 4,
    name: "Trâu xào rau muống",
    price: "159,000",
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271706594276.webp",
  },
  {
    id: 5,
    name: "Trâu xào rau muống",
    price: "159,000",
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271706594276.webp",
  },
  {
    id: 6,
    name: "Trâu xào rau muống",
    price: "159,000",
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271706594276.webp",
  },
  {
    id: 7,
    name: "Trâu xào rau muống",
    price: "159,000",
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271706594276.webp",
  },
  {
    id: 8,
    name: "Trâu xào rau muống",
    price: "159,000",
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271706594276.webp",
  },
  {
    id: 9,
    name: "Trâu xào rau muống",
    price: "159,000",
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271706594276.webp",
  },
];

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("TẤT CẢ");
  const [scrollPosition, setScrollPosition] = useState(0);

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

  return (
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
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-4 py-1 text-sm font-semibold uppercase transition-all duration-200 ${
                    activeCategory === category
                      ? "border-b-2 border-b-solid"
                      : ""
                  }`}
                  style={{
                    color:
                      activeCategory === category
                        ? colors.primary.green
                        : "#374151",
                    borderBottomColor:
                      activeCategory === category
                        ? colors.primary.green
                        : "transparent",
                    borderBottomWidth:
                      activeCategory === category ? "2px" : "0px",
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== category) {
                      e.currentTarget.style.color = colors.primary.green;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== category) {
                      e.currentTarget.style.color = "#374151";
                    }
                  }}
                >
                  {category}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex"
              >
                <div className="w-2/5 h-32 overflow-hidden">
                  <img
                    src={item.image}
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
                      {item.price}đ
                    </p>
                  </div>

                  <div className="flex justify-end mt-2">
                    <button
                      className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200"
                      style={{
                        borderColor: "#ef4444",
                        color: "#ef4444",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#ef4444";
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#ef4444";
                      }}
                    >
                      <FaHeart className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
