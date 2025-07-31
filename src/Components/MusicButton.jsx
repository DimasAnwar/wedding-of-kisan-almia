import React from "react";
import { motion } from "framer-motion";

export default function MusicButton({ isPlaying, toggleAudio }) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        onClick={toggleAudio}
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ repeat: isPlaying ? Infinity : 0, duration: 5, ease: "linear" }}
        className="w-14 h-14 rounded-full bg-black border-[5px] border-gray-800 shadow-lg flex items-center justify-center"
      >
        <span className="text-yellow-400 text-2xl">{isPlaying ? "🎵" : "🔇"}</span>
      </motion.button>
    </div>
  );
}
