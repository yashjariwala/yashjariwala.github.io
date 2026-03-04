"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  "/photo1.webp",
  "/photo2.webp",
  "/photo3.webp",
  "/photo4.webp",
  "/photo5.webp",
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 text-[#4C1215] overflow-hidden border-b border-[#e3dccf] bg-[#fdf5ec] relative">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0">
        <Image src="/texture2.jpeg" alt="Background Texture" fill className="object-cover opacity-40 mix-blend-overlay" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 px-4 flex flex-col items-center"
      >
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block">Memories</span>
        <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#4C1215] leading-none">Our Story</h2>


        <div className="flex items-center justify-center w-full my-6 opacity-75">
          <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48">
            <path d="M0 12H65" stroke="#D4AF37" strokeWidth="0.75" />
            <path d="M115 12H180" stroke="#D4AF37" strokeWidth="0.75" />
            <path d="M75 12L90 4L105 12L90 20L75 12Z" stroke="#D4AF37" strokeWidth="1" />
            <path d="M82 12L90 7.5L98 12L90 16.5L82 12Z" fill="#D4AF37" />
            <circle cx="90" cy="12" r="1.5" fill="#fdf5ec" />
          </svg>
        </div>
      </motion.div>

      <div className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 pt-4 px-6 md:px-16 flex gap-4 md:gap-8">
        {photos.map((photo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
            // The Palace Portrait Frame Style
            className="snap-center relative p-3 bg-[#4C1215] w-[75vw] sm:w-[45vw] md:w-[32vw] lg:w-[25vw] aspect-[3/4] flex-shrink-0 shadow-[0_20px_40px_rgba(76,18,21,0.5)] border border-[#4C1215]"
          >
            {/* Double Gold Inner Trim */}
            <div className="absolute inset-1.5 border-[2px] border-[#D4AF37]/80 pointer-events-none z-20" />
            <div className="absolute inset-3 border border-[#D4AF37]/40 pointer-events-none z-20" />

            <div className="relative w-full h-full overflow-hidden bg-[#fdf5ec]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[15s] ease-linear hover:scale-125"
                style={{ backgroundImage: `url(${photo})` }}
              />
              {/* Inner vignette for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4C1215]/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ))}

        <div className="w-[4vw] flex-shrink-0" />
      </div>
    </section>
  );
}
