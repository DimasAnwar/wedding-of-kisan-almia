import React, { useRef, useEffect } from "react";
import {
  FaClock,
  FaPrayingHands,
  FaEnvelopeOpenText,
  FaCalendar,
  FaMapMarked,
  FaGifts,
  FaImages,
  FaCheck,
} from "react-icons/fa";

const icons = [
  { icon: <FaClock />, label: "Countdown" },
  { icon: <FaPrayingHands />, label: "Surat" },
  { icon: <FaEnvelopeOpenText />, label: "Pengantin" },
  { icon: <FaCalendar />, label: "waktu" },
  { icon: <FaMapMarked />, label: "Lokasi" },
  { icon: <FaGifts />, label: "Hadiah" },
  { icon: <FaCheck />, label: "Terimakasih" },
];

const Navbar = ({ onNavigate, activeIndex }) => {
  const containerRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const activeBtn = buttonRefs.current[activeIndex];
    if (activeBtn && containerRef.current) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-[#d4af37] shadow-inner py-4">
      <div
        ref={containerRef}
        className="flex overflow-x-auto no-scrollbar justify-start gap-4 px-4 sm:justify-center"
      >
        {icons.map((item, index) => (
          <button
            key={index}
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() => onNavigate(index)}
            className={`flex flex-col items-center justify-center text-[#d4af37] transition-all duration-200 px-5 py-4 rounded-xl shadow-md min-w-[70px] font-serif text-base
              ${
                activeIndex === index
                  ? "bg-[#d4af37] text-white scale-105"
                  : "bg-[#d4af3722] hover:bg-[#d4af3755]"
              }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="mt-1 hidden sm:block">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
