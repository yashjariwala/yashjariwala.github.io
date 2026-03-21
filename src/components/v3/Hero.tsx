"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";

const EASE = [0.22, 1, 0.36, 1] as const;

function AnimatedName({ name, startDelay }: { name: string; startDelay: number }) {
  return (
    <span style={{ display: "inline-block", perspective: "600px" }}>
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -55 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: startDelay + i * 0.055,
            duration: 0.6,
            ease: EASE,
          }}
          style={{ display: "inline-block", transformOrigin: "bottom center" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

type Petal = { x: number; tx: number; dur: number; delay: number; size: number; hue: number };

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mandalaScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const mandalaOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const smoothY = useSpring(contentY, { stiffness: 70, damping: 18 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? 14 : 22;
    setPetals(
      [...Array(count)].map(() => ({
        x: Math.random() * window.innerWidth,
        tx: Math.random() * window.innerWidth,
        dur: Math.random() * 9 + 10,
        delay: Math.random() * 9,
        size: Math.random() * 10 + 7,
        hue: Math.random() * 30,
      }))
    );
  }, []);

  const brideDelay = 1.0;
  const groomDelay = brideDelay + invitationData.couple.bride.length * 0.055 + 0.55;

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Full-bleed watercolor floral background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/watercolor_floral.png"
          alt=""
          fill
          className="object-cover object-center"
          style={{ filter: "saturate(0.85) brightness(1.05)" }}
          priority
        />
      </div>

      {/* Warm parchment overlay — preserves floral but makes it invitational */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,251,245,0.78) 0%, rgba(254,246,232,0.72) 50%, rgba(253,243,224,0.78) 100%)",
        }}
      />

      {/* Warm radial glow at center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[90vw] max-h-[700px] rounded-full pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(249,115,22,0.1) 40%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Parallax mandala — subtler, sits above floral */}
      <motion.div
        className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none"
        style={{
          scale: shouldReduceMotion ? 1 : mandalaScale,
          opacity: shouldReduceMotion ? 0.12 : useTransform(mandalaOpacity, [0, 0.55], [0, 0.18]),
        }}
      >
        <Image
          src="/mandala_pattern.png"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "sepia(1) hue-rotate(5deg) saturate(2) brightness(0.5)" }}
          priority
        />
      </motion.div>

      {/* Top border stripe */}
      <div className="absolute top-0 inset-x-0 h-[3px] z-[4] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      {/* Corner ornaments */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-20 sm:w-28 h-20 sm:h-28 pointer-events-none z-[4]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          <svg
            viewBox="0 0 80 80"
            fill="none"
            className="w-full h-full"
            style={{ transform: `rotate(${i * 90}deg)` }}
          >
            <path
              d="M4 4 L32 4 M4 4 L4 32"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
            <path
              d="M10 10 L26 10 M10 10 L10 26"
              stroke="#D4AF37"
              strokeWidth="0.5"
              strokeOpacity="0.35"
            />
            <circle cx="4" cy="4" r="2" fill="#D4AF37" fillOpacity="0.6" />
            <circle cx="4" cy="4" r="1" fill="#D4AF37" fillOpacity="0.9" />
          </svg>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : smoothY, opacity: shouldReduceMotion ? 1 : contentOpacity }}
        className="relative z-[5] text-center px-5 flex flex-col items-center select-none pt-16"
      >
        {/* Invocation */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="font-serif text-[#D4AF37] text-sm sm:text-base md:text-lg mb-8 md:mb-10 tracking-[0.35em] italic"
        >
          {invitationData.invocation}
        </motion.p>

        {/* Names */}
        <h1
          className="font-script leading-[0.84] text-[#4C1215]"
          style={{
            fontSize: "clamp(3.8rem, 14vw, 10.5rem)",
            textShadow:
              "0 0 60px rgba(212,175,55,0.3), 0 4px 24px rgba(212,175,55,0.12)",
          }}
        >
          <AnimatedName name={invitationData.couple.bride} startDelay={brideDelay} />
          <motion.span
            initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: brideDelay + invitationData.couple.bride.length * 0.055 + 0.2,
              duration: 0.7,
              ease: EASE,
            }}
            className="block font-sans font-extralight tracking-[0.3em] text-[#D4AF37]"
            style={{ fontSize: "clamp(1.6rem, 5vw, 3.5rem)", margin: "0.2em 0" }}
          >
            &amp;
          </motion.span>
          <AnimatedName name={invitationData.couple.groom} startDelay={groomDelay} />
        </h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            delay: groomDelay + invitationData.couple.groom.length * 0.055 + 0.3,
            duration: 1,
            ease: EASE,
          }}
          className="flex items-center gap-2.5 my-6 sm:my-8 w-full max-w-[260px]"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none" className="flex-shrink-0">
            <path d="M14 1L17 7L14 13L11 7L14 1Z" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
            <circle cx="14" cy="7" r="2" fill="#D4AF37" />
            <path d="M0 7H9M19 7H28" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.6" />
          </svg>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: groomDelay + invitationData.couple.groom.length * 0.055 + 0.5,
            duration: 0.9,
          }}
          className="font-serif text-lg sm:text-2xl md:text-3xl text-[#4C1215]/90 italic tracking-wide"
        >
          {invitationData.couple.date}
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: groomDelay + invitationData.couple.groom.length * 0.055 + 0.8,
            duration: 0.8,
          }}
          className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37] mt-3"
        >
          {invitationData.cityLabel}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: groomDelay + invitationData.couple.groom.length * 0.055 + 1.2,
          duration: 1,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById("pheras")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="font-sans text-[8px] uppercase tracking-[0.45em] text-[#D4AF37]/60">
          Scroll
        </span>
        <motion.div
          className="w-[1px] bg-gradient-to-b from-[#D4AF37]/80 to-transparent"
          animate={{ height: [18, 36, 18], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Falling marigold petals */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-[7] overflow-hidden">
          {petals.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: -80, x: p.x, opacity: 0, rotate: 0 }}
              animate={{
                y: "115vh",
                x: p.tx,
                opacity: [0, 0.65, 0.65, 0],
                rotate: [0, 200, 400],
              }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "linear" }}
              style={{ position: "absolute", willChange: "transform, opacity" }}
            >
              <svg width={p.size} height={p.size * 1.3} viewBox="0 0 12 16" fill="none">
                <ellipse
                  cx="6"
                  cy="8"
                  rx="4.5"
                  ry="7"
                  fill={`hsl(${28 + p.hue}, 92%, 55%)`}
                  fillOpacity="0.8"
                />
                <ellipse cx="6" cy="8" rx="2" ry="4" fill="white" fillOpacity="0.2" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
