import React from "react";

const MoveAdvertising: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="flex w-[200%] animate-marquee group">
        <img src="/banner1.png" alt="img1" className="w-1/6 object-cover" />
        <img src="/banner2.png" alt="img2" className="w-1/6 object-cover" />
        <img src="/banner3.png" alt="img3" className="w-1/6 object-cover" />
        <img src="/banner1.png" alt="img1" className="w-1/6 object-cover" />
        <img src="/banner2.png" alt="img2" className="w-1/6 object-cover" />
        <img src="/banner3.png" alt="img3" className="w-1/6 object-cover" />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 15s linear infinite;
        }

        /* Khi hover thì dừng */
        .group:hover {
          animation-play-state: paused !important;
        }

        img {
          flex-shrink: 0;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default MoveAdvertising;
