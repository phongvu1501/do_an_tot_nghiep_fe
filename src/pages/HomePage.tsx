import React, { useEffect, useRef, useState } from "react";
import AboutSection from "../components/home/AboutSection";
import MoveAdvertising from "../components/home/MoveAdvertising";
import PromotionSection from "../components/home/PromotionSection";
import MenuCarousel from "../components/menu/MenuCarousel";
import colors from "../config/colors";
import { menuService } from "../services/menu/menuServices";
import type { MenuCategory, MenuItem } from "../services/menu/menuServices";

const AnimatedText: React.FC<{ text: string; isVisible: boolean }> = ({
  text,
  isVisible,
}) => {
  return (
    <span
      className="inline-block"
      style={{
        transform: isVisible ? "translate(0px, 0px)" : "translate(0px, 20px)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 1.2s ease-out, opacity 1.2s ease-out",
        transformOrigin: "50% 100%",
        willChange: "transform, opacity",
      }}
    >
      {text}
    </span>
  );
};

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [comboItems, setComboItems] = useState<MenuItem[]>([]);
  const [loadingCombo, setLoadingCombo] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchComboItems = async () => {
      try {
        setLoadingCombo(true);
        // Lấy danh sách categories
        const categoriesResponse = await menuService.getMenuCategories();

        if (categoriesResponse.status === "success") {
          // Tìm category có tên là "combo" (không phân biệt hoa thường)
          const comboCategory = categoriesResponse.data.find(
            (cat: MenuCategory) => cat.name.toLowerCase() === "combo"
          );

          if (comboCategory) {
            // Lấy món ăn của category combo
            const itemsResponse = await menuService.getMenuItems(
              comboCategory.id
            );
            if (itemsResponse.status === "success") {
              setComboItems(itemsResponse.data);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching combo items:", err);
      } finally {
        setLoadingCombo(false);
      }
    };

    fetchComboItems();
  }, []);

  return (
    <>
      <div
        className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12"
        style={{ backgroundColor: colors.primary.green }}
      >
        <div ref={sectionRef} className="text-center mb-16">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="hero-text mb-4 mt-20 text-white text-5xl font-extrabold">
              <AnimatedText
                text="Trải nghiệm khác biệt, dịch vụ tận tâm"
                isVisible={isVisible}
              />
            </h2>
            <div className="w-16 h-0.5 bg-yellow-400 mx-auto"></div>
          </div>

          <div className="mt-16">
            {loadingCombo ? (
              <div className="flex justify-center items-center py-8">
                <div
                  className="animate-spin rounded-full h-8 w-8 border-b-2"
                  style={{ borderColor: colors.primary.yellow }}
                ></div>
                <span className="ml-2 text-white">Đang tải combo...</span>
              </div>
            ) : comboItems.length > 0 ? (
              <MenuCarousel
                foodItems={comboItems.map((item) => ({
                  id: item.id,
                  name: item.name,
                  price: parseFloat(item.price),
                  image: item.image_url,
                }))}
                title="Combo hấp dẫn"
              />
            ) : null}
          </div>

          <div className="mt-16">
            <AboutSection />
          </div>
        </div>
      </div>
      <PromotionSection />
      <MoveAdvertising />
    </>
  );
};

export default HomePage;
