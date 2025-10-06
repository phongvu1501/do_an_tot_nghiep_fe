import React from "react";
import { FaTags } from "react-icons/fa";
import { Link } from "react-router-dom";
import colors from "../../config/colors";

const PromotionSection: React.FC = () => {
  return (
    <div>
      <div
        className="w-full overflow-hidden whitespace-nowrap py-3"
        style={{ backgroundColor: colors.primary.yellow }}
      >
        <div
          className="animate-scroll inline-block font-extrabold text-3xl tracking-wide"
          style={{ color: "#0B3D2E" }}
        >
          {Array(20)
            .fill("ƯU ĐÃI SIÊU HẤP DẪN")
            .map((text, i) => (
              <span key={i} className="mx-8 flex items-center inline-flex">
                <FaTags className="text-2xl mr-2" />
                {text}
              </span>
            ))}
        </div>
      </div>

      <div
        className="w-full py-12"
        style={{ backgroundColor: colors.primary.green }}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link to="#" className="block">
                  <div className="h-48 relative">
                    <img
                      src="/promotion/sinhnhat.png"
                      alt="New Menu"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </Link>

                <div className="p-6">
                  <Link to="#" className="block">
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "black" }}
                    >
                      Chúc mừng sinh nhật
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Giảm giá 10% hóa đơn đối với những khách hàng đăng kí tài
                    khoản trên 6 tháng tổ chức sinh nhật tại quán...
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link to="#" className="block">
                  <div className="h-48 relative">
                    <img
                      src="/promotion/doidiem.png"
                      alt="Birthday Party"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </Link>

                <div className="p-6">
                  <Link to="#" className="block">
                    <h3
                      className="text-lg font-bold mb-3"
                      style={{ color: "black" }}
                    >
                      Chương trình tích điểm
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Mỗi 1k khi thanh toán sẽ được đổi sang thành 1 điểm. CÓ thể
                    tích lũy để đổi voucher hấp dẫn...
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link to="#" className="block">
                  <div className="h-48 relative">
                    <img
                      src="/promotion/datbanonlie.png"
                      alt="Party Preparation"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </Link>

                <div className="p-6">
                  <Link to="#" className="block">
                    <h3
                      className="text-lg font-bold mb-3"
                      style={{ color: "black" }}
                    >
                      Đặt bàn online
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Khi đặt bàn online qua website quý khách sẽ được giảm 5%
                    tổng hóa đơn. Đồng thời không lo hết bàn...
                  </p>
                </div>
              </div>
            </div>

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
                XEM TẤT CẢ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionSection;
