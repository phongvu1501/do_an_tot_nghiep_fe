import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/reset.css";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import HistoryPage from "./pages/HistoryPage";
import RedeemVoucherPage from "./pages/RedeemVouchers.tsx";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { PopupProvider } from "./contexts/PopupContext.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { MessageProvider } from "./contexts/MessageProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MessageProvider>
        <AuthProvider>
          <PopupProvider>
            <Router>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="menu" element={<MenuPage />} />
                  <Route path="history-orders" element={<HistoryPage />} />
                  <Route path="redeem-voucher" element={<RedeemVoucherPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Router>
          </PopupProvider>
        </AuthProvider>
      </MessageProvider>
    </QueryClientProvider>
  );
}

export default App;
