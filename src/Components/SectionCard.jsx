import { motion } from "framer-motion";

const cardVariants = {
  offscreen: { y: 200, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.9 },
  },
};

export default function SectionCard({ title, content }) {
  return (
    <section className="snap-start h-screen flex items-center justify-center px-4">
      <motion.div
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.6 }}
        className="bg-white/90 border border-yellow-700 shadow-xl rounded-xl p-6 w-full max-w-xl text-center"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 font-serif">{title}</h2>
        <p className="text-gray-700 whitespace-pre-line font-serif">{content}</p>
      </motion.div>
    </section>
  );
}
