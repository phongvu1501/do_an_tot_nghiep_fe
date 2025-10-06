import React, { useEffect, useRef, useState } from "react";
import AboutSection from "../components/home/AboutSection";
import MoveAdvertising from "../components/home/MoveAdvertising";
import PromotionSection from "../components/home/PromotionSection";
import MenuCarousel from "../components/menu/MenuCarousel";
import colors from "../config/colors";
const foodItems = [
  {
    id: 1,
    name: "Gỏi chân gà trộn thính",
    price: 150000,
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271714549081.webp",
  },
  {
    id: 2,
    name: "Gỏi chân gà trộn thính",
    price: 150000,
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271714549081.webp",
  },
  {
    id: 3,
    name: "Gỏi chân gà trộn thính",
    price: 150000,
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271714549081.webp",
  },
  {
    id: 4,
    name: "Gỏi chân gà trộn thính",
    price: 150000,
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271714549081.webp",
  },
  {
    id: 5,
    name: "Lợn mán nướng giềng mẻ",
    price: 150000,
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271704483259.webp ",
  },
  {
    id: 6,
    name: "Lợn mán nướng giềng mẻ",
    price: 150000,
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271704483259.webp ",
  },
  {
    id: 7,
    name: "Lợn mán nướng giềng mẻ",
    price: 150000,
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271704483259.webp ",
  },
  {
    id: 8,
    name: "Lợn mán nướng giềng mẻ",
    price: 150000,
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271704483259.webp ",
  },
  {
    id: 9,
    name: "Gỏi chân gà trộn thính",
    price: 150000,
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271714549081.webp",
  },
  {
    id: 10,
    name: "Gỏi chân gà trộn thính",
    price: 150000,
    image:
      "https://storage.quannhautudo.com/data/thumb_400/Data/images/product/2025/06/202506271714549081.webp",
  },
];

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
            <MenuCarousel foodItems={foodItems} title="Món ăn mới" />
          </div>

          <div className="mt-16">
            <AboutSection />
          </div>
        </div>
      </div>
      <PromotionSection />
      <MoveAdvertising/>
    </>
  );
};

export default HomePage;
