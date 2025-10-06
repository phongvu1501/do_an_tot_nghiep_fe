import React from "react";
import { phone } from "./ContactSection/ContactSection";
import colors from "../config/colors";

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/Bia-Web.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/5 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <img src="/logo4.png" alt="logo" className="w-28 h-auto" />
              </div>
            </div>

            <button
              className="px-6 py-2 border transition-colors duration-300 rounded"
              style={{
                backgroundColor: "white",
                borderColor: colors.primary.green,
                color: colors.primary.green,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.green;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = colors.primary.green;
              }}
            >
              ĐẶT BÀN
            </button>
          </div>

          <div>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: colors.primary.green }}
                >
                  Thực đơn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: colors.primary.green }}
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: colors.primary.green }}
                >
                  Ưu đãi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: colors.primary.green }}
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div>
              <span style={{ color: colors.primary.green }}>Hotline: </span>
              <span
                className="font-bold"
                style={{ color: colors.primary.green }}
              >
                {phone}
              </span>
            </div>
            <div>
              <span style={{ color: colors.primary.green }}>Email: </span>
              <span style={{ color: colors.primary.green }}>
                datban@gmail.com
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                style={{
                  borderColor: colors.primary.green,
                  color: colors.primary.green,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary.green;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = colors.primary.green;
                }}
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                style={{
                  borderColor: colors.primary.green,
                  color: colors.primary.green,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary.green;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = colors.primary.green;
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                style={{
                  borderColor: colors.primary.green,
                  color: colors.primary.green,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary.green;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = colors.primary.green;
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                style={{
                  borderColor: colors.primary.green,
                  color: colors.primary.green,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary.green;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = colors.primary.green;
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <p className="text-sm" style={{ color: colors.primary.green }}>
              © by fpy polytechnic
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
