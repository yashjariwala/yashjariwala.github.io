"use client";

import { motion } from "framer-motion";
import { invitationData } from "@/lib/invitationData";

export default function WithLoveFrom() {
  return (
    <section className="relative py-16 sm:py-20 flex flex-col items-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fffbf5, #fef6e8, #fdf3e0)" }}
    >
      {/* Top gold rule */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-12" />

      {/* Decorative motif */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        width="48" height="48" viewBox="0 0 48 48" fill="none"
        className="mb-6"
      >
        <circle cx="24" cy="24" r="10" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5" />
        <circle cx="24" cy="24" r="3" fill="#D4AF37" fillOpacity="0.7" />
        <path d="M24 4 L24 14 M24 34 L24 44 M4 24 L14 24 M34 24 L44 24" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.4" />
        <path d="M10 10 L17 17 M31 31 L38 38 M38 10 L31 17 M17 31 L10 38" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
      </motion.svg>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-sans text-[#D4AF37] text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-5"
      >
        With Love From
      </motion.p>

      <div className="flex flex-col items-center gap-3">
        {invitationData.withLoveFrom.map((person, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
            className="text-center"
          >
            <p className="font-script text-[#4C1215] leading-tight"
              style={{ fontSize: "clamp(1.6rem, 5vw, 2.4rem)" }}
            >
              {person.name}
            </p>
            <p className="font-sans text-[#D4AF37] text-[9px] sm:text-[11px] uppercase tracking-[0.28em] mt-0.5">
              {person.relation}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom gold rule */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mt-12" />
    </section>
  );
}
