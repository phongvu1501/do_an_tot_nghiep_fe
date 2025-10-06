import { FaPhoneVolume } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { address, mapUrl, phone } from "../ContactSection/ContactSection";
import type { JSX } from "react";

function AboutSection(): JSX.Element {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-4xl aspect-[2/1]">
        <div
          className="w-1/3 rounded-l-2xl p-6 flex flex-col justify-start"
          style={{ backgroundColor: "#f9b233" }}
        >
          <div className="flex items-center justify-start mb-6 flex-wrap">
            <h2 className="text-xl font-bold text-black text-left">
              DATBAN QUÁN
            </h2>
            <div className="ml-3 bg-green-600 text-white px-2 py-[2px] rounded-full text-xs font-semibold">
              ĐANG MỞ
            </div>
          </div>

          <h3 className="flex items-center text-sm text-black font-medium">
            <FaPhoneVolume className="text-red-600 mr-1" />
            Số điện thoại: {phone}
          </h3>

          <h3 className="flex items-center text-sm text-black font-medium mb-2">
            <IoLocation className="text-red-600 mr-1" />
            {address}
          </h3>

          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between">
              <div className="flex-1 text-center border-r border-gray-200 pr-2">
                <p className="text-xs text-gray-500 mb-1">Sức chứa</p>
                <p className="text-sm font-bold text-black">500 KHÁCH</p>
              </div>
              <div className="flex-1 text-center border-r border-gray-200 px-2">
                <p className="text-xs text-gray-500 mb-1">Diện tích</p>
                <p className="text-sm font-bold text-black">1000 M2</p>
              </div>
              <div className="flex-1 text-center pl-2">
                <p className="text-xs text-gray-500 mb-1">Số tầng</p>
                <p className="text-sm font-bold text-black">3 TẦNG</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button className="px-3 py-1.5 text-sm font-medium text-green-700 bg-gray-100 rounded-md border border-gray-300 hover:bg-green-600 hover:text-white transition-all duration-200">
              Đặt bàn ngay
            </button>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-gray-100 rounded-md border border-gray-300 hover:bg-green-600 hover:text-white transition-all duration-200"
            >
              <IoLocation className="mr-1 text-base" />
              Xem bản đồ
            </a>
          </div>

          <div className="text-left">
            <p
              className="text-xs md:text-sm leading-relaxed mt-2"
              style={{ color: "#603A03" }}
            >
              <strong>DATBAN Quán</strong> là một trong những quán ăn - nhậu nổi
              tiếng nhất khu Trịnh Văn Bô. Với đội ngũ nhân viên nhiệt tình, đầu
              bếp nhiều năm kinh nghiệm và không gian rộng rãi, ấm cúng -{" "}
              <strong>DATBAN Quán</strong> sẽ mang đến cho bạn những kỉ niệm
              không thể nào quên cùng bạn bè và người thân!
            </p>
          </div>
        </div>

        <div className="w-2/3 rounded-r-2xl overflow-hidden">
          <img
            src="/anhquanan.png"
            alt="datban-quan"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
