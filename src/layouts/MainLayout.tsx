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

  const getBannerConfig = () => {
    switch (location.pathname) {
      case "/menu":
        return {
          title: "Thực đơn",
          description:
            "Thăng hoa vị giác với 100+ món ăn đặc sắc, hải sản, món hấp được chuẩn bị từ những đầu bếp chuyên nghiệp hàng đầu.",
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
      {isHomePage ? <BannerHome /> : <BannerMain {...getBannerConfig()} />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingContact/>
    </div>
  );
};

export default MainLayout;
