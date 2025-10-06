import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { PopupProvider } from "./contexts/PopupContext";

function App() {
  return (
    <PopupProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </PopupProvider>
  );
}

export default App;
