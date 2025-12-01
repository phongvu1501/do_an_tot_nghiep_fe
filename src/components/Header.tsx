import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import colors from "../config/colors";
import { useAuth } from "../hooks/useAuth";
import { usePopup } from "../hooks/usePopup";
import LoginPopup from "./auth/LoginPopup";
import RegisterPopup from "./auth/RegisterPopup";
import OrderPopup from "./order/OrderPopup";
import { phone } from "./ContactSection/ContactSection";
import { authService } from "../services/auth/authServices";
import { storage } from "../utils/storage";
import { message } from "antd";

const Header: React.FC = () => {
  const [openAuth, setOpenAuth] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openPopup } = usePopup();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenAuth(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
    } finally {
      storage.clearAuth();
      logout();
      messageApi.success("Đăng xuất thành công!");
      setOpenAuth(false);
      navigate("/");
    }
  };

  return (
    <>
      {contextHolder}
      <header
        className="shadow-md sticky top-0 z-50"
        style={{ backgroundColor: colors.primary.green }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/">
                <img
                  src="/logo4.png"
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <div className="flex items-center ml-3">
                <div className="w-px h-10 bg-white opacity-50"></div>
                <div className="text-white ml-3">
                  <div className="text-xs font-medium uppercase tracking-wide">
                    HOTLINE
                  </div>
                  <div className="text-2xl font-bold text-orange-400">
                    {phone}
                  </div>
                </div>
              </div>
            </div>

            <nav className="hidden md:block">
              <div className="flex items-center space-x-2">
                <Link
                  to="/menu"
                  className="text-white hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Thực Đơn
                </Link>
                <Link
                  to="/about"
                  className="text-white hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Giới thiệu
                </Link>
                {/* <Link
                  to=""
                  className="text-white hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Liên Hệ
                </Link> */}

                <button
                  onClick={() => openPopup("order")}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors border"
                  style={{
                    backgroundColor: colors.primary.green,
                    borderColor: colors.primary.yellow,
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.primary.yellow;
                    e.currentTarget.style.color = colors.primary.green;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.primary.green;
                    e.currentTarget.style.color = "white";
                  }}
                >
                  Đặt Bàn
                </button>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpenAuth(!openAuth)}
                    className="flex items-center space-x-1 text-white text-sm font-medium hover:text-orange-500 transition-colors"
                  >
                    <span>{user ? user.name : "Tài khoản"}</span>
                  </button>

                  {openAuth && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      {!user ? (
                        <>
                          <button
                            onClick={() => {
                              openPopup("login");
                              setOpenAuth(false);
                            }}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                              </svg>
                              <span>Đăng nhập</span>
                            </div>
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={() => {
                              openPopup("register");
                              setOpenAuth(false);
                            }}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                />
                              </svg>
                              <span>Đăng ký</span>
                            </div>
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/profile"
                            onClick={() => setOpenAuth(false)}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              <span>Thông tin cá nhân</span>
                            </div>
                          </Link>
                          <div className="border-t border-gray-100 my-1"></div>
                          <Link
                            to="/history-orders"
                            onClick={() => setOpenAuth(false)}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 17v-6h13M9 7h13M5 7h.01M5 17h.01"
                                />
                              </svg>
                              <span>Lịch sử đặt bàn</span>
                            </div>
                          </Link>
                         <div className="border-t border-gray-100 my-1"></div>
                         
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                              <span>Đăng xuất</span>
                            </div>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </nav>

            <div className="md:hidden">
              <button
                type="button"
                className="text-white hover:text-orange-500 focus:outline-none focus:text-orange-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <RegisterPopup />
        <LoginPopup />
        <OrderPopup />
      </header>
    </>
  );
};

export default Header;
