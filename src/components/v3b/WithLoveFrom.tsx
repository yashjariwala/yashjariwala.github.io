"use client";

import { motion } from "framer-motion";

export default function WithLoveFrom() {
  return (
    <section
      className="relative py-16 sm:py-20 flex flex-col items-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fffbf5, #fef6e8, #fdf3e0)" }}
    >
      {/* Top gold rule */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-10" />

      {/* Heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5"
      >
        <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
          <path
            d="M20 34 C20 34 3 22 3 11 C3 5.477 7.477 1 13 1 C16.5 1 19.5 2.9 20 5 C20.5 2.9 23.5 1 27 1 C32.523 1 37 5.477 37 11 C37 22 20 34 20 34Z"
            fill="#D4AF37"
            fillOpacity="0.85"
            stroke="#D4AF37"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="font-sans text-[#D4AF37] text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-6"
      >
        With Love From
      </motion.p>

      {/* Names on one line */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="text-center"
      >
        <p
          className="text-[#4C1215] leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", fontFamily: "var(--font-pinyon), cursive" }}
        >
          Ankita{" "}
          <span className="font-sans font-light text-[#4C1215]" style={{ fontSize: "clamp(1.1rem, 3vw, 1.6rem)" }}>&amp;</span>
          {" "}Amit Jariwala
        </p>
        <p className="font-sans text-[#D4AF37]/80 text-[10px] sm:text-xs uppercase tracking-[0.28em] mt-2">
          Chachi &amp; Chachu
        </p>
      </motion.div>

      {/* Bottom gold rule */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mt-10" />
    </section>
  );
}
