"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";
import IndianCard from "./IndianCard";

export default function StoryTimeline() {
  return (
    <section id="story" className="py-24 px-4 border-b border-[#e9e0cf] relative">
      {/* Background Texture Layers */}
      <div className="absolute inset-0 z-0 bg-[#fdf5ec]">
        <Image src="/texture2.jpeg" alt="Background Texture" fill className="object-cover opacity-40 mix-blend-overlay" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block">Our Journey</span>
          <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#4C1215] leading-none">Love Story</h2>


          <div className="flex items-center justify-center w-full my-6 opacity-75">
            <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48">
              <path d="M0 12H65" stroke="#D4AF37" strokeWidth="0.75" />
              <path d="M115 12H180" stroke="#D4AF37" strokeWidth="0.75" />
              <path d="M75 12L90 4L105 12L90 20L75 12Z" stroke="#D4AF37" strokeWidth="1" />
              <path d="M82 12L90 7.5L98 12L90 16.5L82 12Z" fill="#D4AF37" />
              <circle cx="90" cy="12" r="1.5" fill="#fdf5ec" />
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {invitationData.storyMoments.map((moment, idx) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, rotateY: 90, transformPerspective: 1000, transformOrigin: "left" }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <IndianCard>
                <div className="relative z-10 flex flex-col items-center">
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-bold mb-4 bg-[#fdf5ec] inline-block px-3 py-1 rounded-sm border border-[#D4AF37]/20">{moment.year}</p>

                  {/* Ornate Gold Circular Portrait Frame */}
                  <div className="w-20 h-20 mb-5 relative flex items-center justify-center rounded-full border-[2px] border-[#D4AF37]/40 shadow-[inset_0_0_15px_rgba(212,175,55,0.15)] bg-[#fdf5ec]/50">
                    <div className="absolute inset-[-4px] border border-[#D4AF37]/30 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#D4AF37] opacity-80">
                      {idx === 0 && <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-.447.894L15 14M5 18h14M5 18a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2z" />} {/* Book/Map approx */}
                      {idx === 1 && <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />} {/* Heart */}
                      {idx === 2 && <path d="M6 9l6-5 6 5M6 9h12M6 9l2 11h8l2-11" />} {/* Diamond/Ring approx */}
                      {idx === 3 && <path d="M5 12h14M12 5l7 7-7 7" />} {/* Arrow/Forward */}
                    </svg>
                  </div>

                  <div className="flex justify-center mb-3 mt-1">
                    <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/80" />
                  </div>

                  <h3 className="font-serif text-2xl text-[#4C1215] mb-3 font-semibold">{moment.title}</h3>
                  <p className="font-sans text-xs leading-relaxed text-[#6e6e6e]">{moment.text}</p>
                </div>
              </IndianCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
