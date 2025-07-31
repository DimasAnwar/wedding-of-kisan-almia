import { motion } from "framer-motion";

export default function EnvelopeLid({ rotateLid, onOpen }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative w-[90%] max-w-sm aspect-[4/3] mx-auto">
        <div className="absolute inset-0 bg-neutral-900 z-10 rounded-md border border-gray-700 shadow-inner bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] bg-repeat" />
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: rotateLid ? -160 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[130px] origin-top z-30"
        >
          <div className="w-0 h-0 mx-auto border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[130px] border-t-[#1f1f1f]" />
        </motion.div>
        <div
          onClick={onOpen}
          className="absolute top-[125px] left-1/2 -translate-x-1/2 z-40 cursor-pointer"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-yellow-500 rounded-full border-[3px] border-yellow-800 shadow-xl"
          />
        </div>
        <div className="absolute top-[140px] left-1/2 -translate-x-1/2 z-30 text-center w-[90%]">
          <h2 className="text-xl sm:text-2xl text-[#d4af37] font-semibold font-serif">Wedding Invitation</h2>
          <p className="text-3xl sm:text-4xl text-white font-[Great_Vibes] mt-2">Kisan & Almia</p>
        </div>
        <div className="absolute bottom-2 left-3 text-[#d4af37] font-serif font-semibold select-none z-20">K & A</div>
      </div>
    </div>
  );
}
