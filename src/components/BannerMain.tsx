import React from "react";
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
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white border-opacity-20 rounded-full"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white border-opacity-20 rounded-full"></div>
    </div>
  );
};

export default BannerMain;
