import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const FloatingContact: React.FC = () => {
  return (
    <div className="fixed right-6 bottom-8 flex flex-col items-center gap-4 z-50">
      <a
        href="https://zalo.me/0366744340"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 flex items-center justify-center bg-blue-500 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-50 animate-ping"></div>
        <SiZalo className="text-white text-2xl z-10" />
      </a>

      <a
        href="tel:19000000"
        className="relative w-14 h-14 flex items-center justify-center bg-green-500 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-50 animate-ping"></div>
        <FaPhoneAlt className="text-white text-xl z-10 animate-ring" />
      </a>

      <style>{`
        /* Hiệu ứng rung cho icon điện thoại */
        @keyframes ring {
          0% { transform: rotate(0); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-15deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          50% { transform: rotate(5deg); }
          60% { transform: rotate(-5deg); }
          70%, 100% { transform: rotate(0); }
        }

        .animate-ring {
          animation: ring 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FloatingContact;
