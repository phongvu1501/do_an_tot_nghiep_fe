import React from "react";
import colors from "../config/colors";

const Banner: React.FC = () => {
  return (
    <div
      className="relative h-96 md:h-[540px] overflow-hidden group"
      style={{ backgroundColor: colors.primary.green }}
    >
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-1 opacity-70">
        <img
          src="/banner/bia1.png"
          alt="Background"
          className="w-full h-full object-cover animate-slide-lr"
        />
      </div>

      <div>
        <img src="/banner/chairuou.png" alt="gach1" className="w-40 float1" />
      </div>

      <div>
        <img src="/banner/bia.png" alt="gach2" className="w-32 float2" />
      </div>

      <div>
        <img src="/banner/sup.png" alt="sieunhan" className="w-32 float3" />
      </div>

      <div>
        <img src="/banner/bongden.png" alt="bongden" className="w-32 float4" />
      </div>

      <div>
        <img src="/banner/banghieu.png" alt="anh" className="w-32 float6" />
      </div>

      <div>
        <img src="/banner/maybay.png" alt="anh" className="w-32 float8" />
      </div>

      <div>
        <img src="/banner/daubep.png" alt="gach2" className="w-32 float7" />
      </div>
      <div className="relative z-10 h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          <div className="absolute left-[340px] top-[300px] text-white">
            <p className="banner-text">Chào mừng bạn đến quán ăn!</p>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white border-opacity-30 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white border-opacity-30 rounded-full group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 delay-100"></div>
      <div className="absolute top-1/2 right-8 w-12 h-12 border-2 border-white border-opacity-20 rounded-full group-hover:scale-125 group-hover:rotate-45 transition-all duration-500 delay-200 hidden md:block"></div>
    </div>
  );
};

export default Banner;
