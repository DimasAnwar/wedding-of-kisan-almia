import { motion } from "framer-motion";

const cardVariants = {
  offscreen: { y: 200, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.9 },
  },
};

export default function CountdownCard({ timeLeft }) {
  return (
    <section className="snap-start h-screen flex items-center justify-center px-4">
      <motion.div
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.6 }}
        className="bg-white/90 border border-yellow-700 shadow-lg rounded-xl p-6 w-full max-w-xl text-center"
      >
        <h2 className="text-2xl font-bold text-yellow-700 font-serif mb-4">Menuju Hari Bahagia</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
          {["Hari", "Jam", "Menit", "Detik"].map((label, i) => (
            <div key={i} className="bg-white/80 border border-yellow-700 rounded-md p-4 shadow-md">
              <div className="text-2xl font-bold text-[#1f1f1f] font-serif">
                {Object.values(timeLeft)[i].toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-yellow-700 font-serif">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
