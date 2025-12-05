import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Outlet, useLocation } from "react-router-dom";
import FloatingContact from "../components/FloatingContact";
import BannerHome from "../components/BannerHome";
import BannerMain from "../components/BannerMain";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const hiddenBannerRoutes = new Set<string>(["/about"]);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const getBannerConfig = () => {
    switch (location.pathname) {
      case "/menu":
        return {
          title: "Thực đơn",
          description:
            "Thăng hoa vị giác với 100+ món ăn đặc sắc, hải sản, món hấp được chuẩn bị từ những đầu bếp chuyên nghiệp hàng đầu.",
        };
      case "/history-orders":
        return {
          title: "Lịch sử đặt bàn",
          description: "Xem lại tất cả các đơn đặt bàn của bạn tại nhà hàng",
        };
      case "/redeem-voucher":
        return {
          title: "Đổi voucher",
          description: "Sử dụng điểm tích lũy để đổi lấy các voucher hấp dẫn từ nhà hàng của chúng tôi",
        };
      case "/profile":
        return {
          title: "Thông tin cá nhân",
          description: "Quản lý thông tin tài khoản của bạn",
        };
      case "/about":
        return {
          title: "Giới thiệu",
          description:
            "Khám phá hành trình phát triển và dịch vụ của DATBAN Quán.",
        };
      default:
        return {
          title: "Trang chủ",
          description: "Chào mừng bạn đến với nhà hàng của chúng tôi.",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {isHomePage ? (
        <BannerHome />
      ) : hiddenBannerRoutes.has(location.pathname) ? null : (
        <BannerMain {...getBannerConfig()} />
      )}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingContact />
    </div>
  );
};

export default MainLayout;
