// src/components/Envelope.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import lagu1 from "../assets/lagu1.mp3";
import Navbar from "./Navbar";
import bungaKiri from "../assets/kiri.png";
import bungaKanan from "../assets/kanan.png";
import mandiri from "../assets/mandiri.png";
import { FaCopy, FaCheck } from "react-icons/fa";
import dana from "../assets/dana.png";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg font-semibold shadow-sm bg-[#d4af37] hover:bg-[#c49e2c] text-white transition-all duration-200"
    >
      {copied ? (
        <>
          <FaCheck className="text-white" />
          Disalin
        </>
      ) : (
        <>
          <FaCopy className="text-white" />
          Salin
        </>
      )}
    </button>
  );
}
const sections = [
  {
    title: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    content: (
      <p>
        Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
        pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa
        tenteram kepadanya
        <br />
        <span className="italic">Q.S Ar-Rum Ayat 21</span>
      </p>
    ),
  },
  {
    title: "Assalamualaikum Wr. Wb.",
    content: (
      <p>
        Tanpa mengurangi rasa hormat, <br />
        Kami bermaksud mengundang <strong>Bapak/Ibu/Saudara/i</strong>
        <br />
        Untuk menghadiri acara pernikahan kami:
        <br />
        <strong className="font-[Great_vibes] text-4xl pt-10 text-yellow-700">
          Kisan Rosandi
        </strong>
        <br />
        Putra ke-8 dari Bpk. H. Sugro & Ibu Siti Maryam
        <p className="font-[Great_vibes] text-4xl">&</p>
        <strong className="font-[Great_vibes] text-4xl text-yellow-700">
          Almia Dwiyanti
        </strong>
        <br />
        Putri ke-5 dari Bpk. Muhit (Alm) & Ibu Titing
      </p>
    ),
  },
  {
    title: "Resepsi & Akad Nikah",
    content: (
      <div className="flex flex-col items-center text-black font-[roboto]">
        <div className="text-4xl">Minggu</div>
        <div className="border-t-2 border-b-2 border-red-800 my-1 px-6 py-2 text-6xl font-bold">
          31
        </div>
        <div className="text-4xl">Agustus 2025</div>
        <div className=" text-4xl mt-4 text-xl text-center whitespace-pre-line">
          Pukul 08.00 - Selesai {"\n"}Rumah Mempelai Pria
        </div>
      </div>
    ),
  },
  {
    title: "Lokasi Acara",
    content: null,
  },
  {
    title: "Gift",
    content: (
      <div className="space-y-4">
      <h1 className="text-xl text-yellow-700 font-[roboto]">Terima Kasih telah menambah semangat kami dengan kehadiran dan hadiah anda</h1>
      <div className="flex flex-col sm:flex-row items-center gap-4 font-[roboto] bg-white/80 p-4 rounded-xl shadow-inner border border-yellow-600">
        <img
          src={mandiri}
          alt="Mandiri"
          className="w-20 h-10 object-contain"
        />
        <div className="text-center sm:text-left flex flex-col items-center">
          <h2 className="text-sm font-bold">A/N KISAN ROSANDI</h2>
          <h1 className="text-2xl font-bold tracking-wide text-gray-800">
            1330024852550
          </h1>
          <CopyButton text="1330024852550" />
        </div>
        <div className="flex flex-col items-center">
          <img src={dana} alt="dana" className="w-40 h-20 object-contain" />
          <h2 className="text-sm font-bold"> A/N KISAN ROSANDI</h2>
          <h1 className="text-2xl font-bold tracking-wide text-gray-800">
          0855-8968-732
          </h1>
          <CopyButton text="08558968732" />
        </div>
        
      </div>
    </div>
    ),
  },
  {
    title: "Penutup",
    content: (
      <div>
        <p>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. <br /> Hormat
          kami yang mengundang
        </p>
        <h1 className="font-[Great_vibes] text-4xl pt-5 text-yellow-700">
          Kisan & Almia
        </h1>
        <p className="pt-5">Crafted By @ DimasAnwar</p>
        <p>music by Tiara Andini, Arsy Widianto - Lagu Pernikahan Kita</p>
      </div>
    ),
  },
];

const cardVariants = {
  offscreen: { y: 200, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.9 },
  },
};

export default function Envelope() {
  const [loading, setLoading] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [rotateLid, setRotateLid] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const guest = decodeURIComponent(
    searchParams.get("to") || "Yth. Tamu Undangan"
  );

  
  useEffect(() => {
    const target = new Date("2025-08-31T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) return clearInterval(interval);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowEnvelope(true), 100);
    }, 2000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showEnvelope && !open) {
        // Delay sebelum buka segitiga
        setTimeout(() => {
          setRotateLid(true);
          setTimeout(() => setOpen(true), 1200);
        }, 3000); // ⬅️ Delay 3 detik sebelum buka segitiga
      }
    }, 100); // Delay setelah amplop muncul, kecilin dikit supaya responsif
    return () => clearTimeout(timer);
  }, [showEnvelope]);

  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      document.removeEventListener("click", tryPlay);
    };
    document.addEventListener("click", tryPlay);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleNavigate = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const height = window.innerHeight;
    const index = sectionRefs.current.findIndex((el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.top < height / 2;
    });
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-repeat bg-[#ede0d4] text-gray-800 relative">
      {/* Background Bunga */}
<div className="fixed inset-0 z-0 pointer-events-none">
  <img
    src={bungaKiri}
    alt="bunga kiri"
    className="absolute top-0 left-0 w-32 sm:w-40 w-54"
  />
  <img
    src={bungaKanan}
    alt="bunga kanan"
    className="absolute bottom-0 right-0 w-32 sm:w-60 w-80"
  />
</div>


      <audio ref={audioRef} src={lagu1} loop />
      <div className="fixed top-4 right-2 z-50">
      <motion.button
  onClick={toggleAudio}
  animate={{ rotate: isPlaying ? 360 : 0 }}
  transition={{
    repeat: isPlaying ? Infinity : 0,
    duration: 5,
    ease: "linear",
  }}
  className={`w-12 h-12 rounded-full shadow-md border-2 transition-all duration-300
    ${
      isPlaying
        ? "bg-[##ede0d4] text-white border-[#d4af37]"
        : "bg-[#d4af3] text-[#ede0d4] border-[#ede0d4] hover:bg-[#d4af3755]"
    } flex items-center justify-center`}
>
  <span className="text-2xl">{isPlaying ? "🎵" : "🔇"}</span>
</motion.button>


      </div>

      <Navbar
        sections={["Countdown", ...sections.map((s) => s.title)]}
        onNavigate={handleNavigate}
        activeIndex={activeIndex}
      />

      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-[#ede0d4] z-[100]">
          <motion.div
            className="text-4xl font-[Great_Vibes] text-yellow-700"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            K & A
          </motion.div>
        </div>
      ) : !open ? (
        showEnvelope && (
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-screen flex items-center justify-center"
            onClick={() => {
              setRotateLid(true);
              setTimeout(() => setOpen(true), 2000);
            }}
          >
            <div className="relative w-[90%] max-w-sm aspect-[4/3] mx-auto cursor-pointer">
              <div className="absolute inset-0 z-10 rounded-md border-[3px] border-[#d4af37] shadow-[0_0_10px_#d4af37aa] bg-white" />
              <motion.div
  initial={{ rotateX: 0 }}
  animate={{ rotateX: rotateLid ? -160 : 0 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
  className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[130px] origin-top z-30 overflow-visible"
>
  <div className="relative w-full h-full overflow-visible">
    {/* Segitiga Emas */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
      <div className="w-0 h-0 border-l-[162px] border-l-transparent border-r-[162px] border-r-transparent border-t-[132px] border-t-[#d4af37]" />
    </div>

    {/* TEKS DI DALAM SEGITIGA */}
    <div className="absolute top-[42px] left-1/2 -translate-x-1/2 z-30">
      <p className="text-[#d4af37] text-xl font-[Great_Vibes] font-semibold  text-center">
        Wedding Invitation
      </p>
    </div>

    {/* Segitiga Putih */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
      <div className="w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[130px] border-t-white" />
    </div>
  </div>
</motion.div>

              <div className="absolute top-[140px] left-1/2 -translate-x-1/2 z-30 text-center w-[90%]">
                <p className="text-5xl sm:text-5xl text-[#6b4f2d] font-[Great_Vibes] mt-2">
                  Kisan & Almia
                </p>
              </div>
              <div className="absolute bottom-2 left-3 text-[#6b4f2d] font-[great_vibes] select-none z-20 text-xl">
                {guest}
              </div>
            </div>
          </motion.div>
        )
      ) : (
        <div
          className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
          ref={containerRef}
          onScroll={handleScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`::-webkit-scrollbar { display: none; }`}</style>
          {/* Countdown */}
          <section
            ref={(el) => (sectionRefs.current[0] = el)}
            className="snap-start h-screen flex items-center justify-center px-4 pb-24"
          >
            <motion.div
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.6 }}
              className="bg-white/90 border border-yellow-700 shadow-lg rounded-xl p-6 w-full max-w-xl text-center"
            >
              <h2 className="text-4xl font-bold text-yellow-700 font-[Great_Vibes] mb-4">
                Menghitung Hari
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 justify-center">
                {["Hari", "Jam", "Menit", "Detik"].map((label, i) => (
                  <div
                    key={i}
                    className="bg-white/80 border border-yellow-700 rounded-md p-4 shadow-md"
                  >
                    <div className="text-2xl font-bold text-[#1f1f1f] font-serif">
                      {Object.values(timeLeft)[i]
                        .toString()
                        .padStart(2, "0")}
                    </div>
                    <div className="text-sm text-yellow-700 font-serif">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Section lainnya */}
          {sections.map((section, i) => (
            <section
              key={i + 1}
              ref={(el) => (sectionRefs.current[i + 1] = el)}
              className="snap-start h-screen flex items-center justify-center px-4 pb-24"
            >
              <motion.div
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.6 }}
                className="bg-white/90 border border-yellow-700 shadow-xl rounded-xl p-6 w-full max-w-xl text-center"
              >
                <h2 className="text-4xl sm:text-4xl font-bold text-yellow-700 mb-3 font-[Great_Vibes]">
                  {section.title}
                </h2>
                {section.title === "Lokasi Acara" ? (
                  <div className="w-full aspect-video mt-4">
                    <h1 className="text-xl font-[roboto] font-bold">
                      Kediaman Mempelai Pria
                    </h1>
                    <h2 className="text-sm font-[roboto] font-bold pb-5">
                      Kp. Ciherang Pondok RT 06/01 Kec.Caringin Kab.Bogor
                    </h2>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1069.9710028854668!2d106.83417175346135!3d-6.691959131257065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c92bafce7e67%3A0xba3b129c3c1803bb!2sBengkeL%20(Listrik)%20Las%20berkah!5e0!3m2!1sid!2sid!4v1753941378188!5m2!1sid!2sid"
                      className="w-full h-full border-0 rounded-md"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                   <div className="flex justify-center">
  <a
    href="https://maps.app.goo.gl/jpMBeyb9RNjefF4z7"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#d4af37] hover:bg-[#c49e2c] text-white font-semibold transition-all duration-200 shadow font-[roboto]"
  >
  Lihat di Google Maps
  </a>
</div>
                  </div>
                ) : (
                  <div className="text-gray-700 whitespace-pre-line font-serif text-base">
                    {section.content}
                  </div>
                )}
              </motion.div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
