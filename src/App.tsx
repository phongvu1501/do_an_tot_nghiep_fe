import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/reset.css";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import HistoryPage from "./pages/HistoryPage";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { PopupProvider } from "./contexts/PopupContext";
import { AuthProvider } from "./contexts/AuthContext";

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
      <AuthProvider>
        <PopupProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="history-orders" element={<HistoryPage />} />
              </Route>
            </Routes>
          </Router>
        </PopupProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
