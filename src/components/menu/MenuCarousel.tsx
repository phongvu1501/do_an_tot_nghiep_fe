import React, { useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import colors from "../../config/colors";
import { storage } from "../../utils/storage";

interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface MenuCarouselProps {
  foodItems: FoodItem[];
  title: string;
}

const MenuCarousel: React.FC<MenuCarouselProps> = ({ foodItems, title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(foodItems.length / itemsPerPage);
  const [messageApi, contextHolder] = message.useMessage();

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = foodItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleAddToCart = (item: FoodItem) => {
    storage.addMenuToCart({
      id: item.id,
      name: item.name,
      price: item.price.toString(),
      image_url: item.image,
      quantity: 1,
    });
    messageApi.success(`Đã thêm "${item.name}" vào giỏ hàng`);
  };

  return (
    <>
      {contextHolder}
      <div className="mt-16">
        <Link to="#">
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-wide leading-tight text-gray-100 mb-12 text-center">
            {title}
          </h3>
        </Link>

        <div className="relative flex justify-center">
          <div className="relative flex items-center">
            <button
              onClick={prevPage}
              className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition-colors z-10"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex space-x-4 transition-transform duration-300 ease-in-out">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden w-52 h-72"
                >
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <Link to={"#"}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>
                  <div className="p-4 relative h-32 flex flex-col justify-between">
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-black mb-1">
                        {item.name}
                      </h4>
                      <p className="text-base font-bold text-blue-600">
                        {item.price.toLocaleString()}đ
                      </p>
                    </div>
                    <div className="flex justify-end">
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

            <button
              onClick={nextPage}
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition-colors z-10"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPage ? "bg-yellow-400" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        <a href="/menu">
          <div className="text-center mt-12">
            <button
              className="border-2 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300 hover:text-white"
              style={{
                backgroundColor: colors.primary.green,
                borderColor: colors.primary.yellow,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.yellow;
                e.currentTarget.style.color = colors.primary.green;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.green;
                e.currentTarget.style.color = "white";
              }}
            >
              XEM THỰC ĐƠN
            </button>
          </div>
        </a>
      </div>
    </>
  );
};

export default MenuCarousel;
