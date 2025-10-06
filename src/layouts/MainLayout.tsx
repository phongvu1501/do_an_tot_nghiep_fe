import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import FloatingContact from "../components/FloatingContact";

const showBanner = location.pathname === "/";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {showBanner && <Banner />}
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
