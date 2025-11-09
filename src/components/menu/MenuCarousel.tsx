import React, { useState } from "react";
import { Link } from "react-router-dom";
import colors from "../../config/colors";

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

  return (
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
                    <button className="bg-white border border-gray-300 text-red-500 py-2 px-2 rounded-full hover:bg-red-50 hover:border-red-300 transition-colors flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
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
  );
};

export default MenuCarousel;
