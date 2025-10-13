import React from "react";
import { FaSearch } from "react-icons/fa";
import colors from "../config/colors";

interface BannerMainProps {
  title: string;
  description: string;
}

const BannerMain: React.FC<BannerMainProps> = ({ title, description }) => {
  return (
    <div className="relative h-48 md:h-64 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: colors.primary.green }}
      />

      <div className="relative z-10 h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1 max-w-2xl">
              <h1
                className="text-4xl md:text-5xl font-bold text-orange-400 mb-4"
                style={{ backgroundColor: colors.primary.green }}
              >
                {title}
              </h1>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                {description}
              </p>
            </div>

            <div className="hidden md:block flex-shrink-0 ml-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm món ăn..."
                  className="w-72 h-10 px-4 pr-12 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl 
                 text-gray-100 placeholder-gray-400 focus:outline-none 
                 focus:border-white/50 focus:bg-white/20 transition-all duration-300 shadow-sm"
                />
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-200 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white border-opacity-20 rounded-full"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white border-opacity-20 rounded-full"></div>
    </div>
  );
};

export default BannerMain;
