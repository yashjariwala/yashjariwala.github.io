"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { invitationData } from "@/lib/invitationData";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => setIsClient(true), 0);
    const target = new Date(invitationData.weddingDateIso).getTime();
    const id = setInterval(() => {
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      } else {
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown"
      className="relative py-24 sm:py-28 px-4 text-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fffbf5 0%, #fef6e8 100%)" }}
    >
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent" />

      {/* Large ornamental ring — client only to avoid SSR floating point mismatch */}
      {isMounted && <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: "min(90vw, 560px)", height: "min(90vw, 560px)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 560 560" fill="none" className="w-full h-full opacity-[0.22]">
          {/* Outer ring */}
          <circle cx="280" cy="280" r="272" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="4 8" />
          {/* Middle ring */}
          <circle cx="280" cy="280" r="248" stroke="#D4AF37" strokeWidth="0.5" />
          {/* Inner ring */}
          <circle cx="280" cy="280" r="224" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2 6" />
          {/* 8 lotus petals */}
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const x = 280 + Math.cos(a) * 248;
            const y = 280 + Math.sin(a) * 248;
            return (
              <g key={i} transform={`translate(${x},${y}) rotate(${(i / 8) * 360})`}>
                <ellipse rx="10" ry="22" fill="#D4AF37" opacity="0.6" />
              </g>
            );
          })}
          {/* 16 small diamonds at middle ring */}
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const x = 280 + Math.cos(a) * 248;
            const y = 280 + Math.sin(a) * 248;
            return (
              <rect key={i} x={x - 3.5} y={y - 3.5} width="7" height="7"
                transform={`rotate(45,${x},${y})`} fill="#D4AF37" opacity="0.5" />
            );
          })}
          {/* 4 corner flourishes */}
          {Array.from({ length: 4 }, (_, i) => {
            const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
            const x = 280 + Math.cos(a) * 236;
            const y = 280 + Math.sin(a) * 236;
            return (
              <g key={i} transform={`translate(${x},${y}) rotate(${45 + (i / 4) * 360})`}>
                <path d="M0,-18 C6,-10 10,-4 0,0 C-10,-4 -6,-10 0,-18Z" fill="#D4AF37" opacity="0.7" />
              </g>
            );
          })}
        </svg>
      </motion.div>}

      {/* Counter-rotating inner decoration — client only */}
      {isMounted && <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: "min(60vw, 380px)", height: "min(60vw, 380px)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 380 380" fill="none" className="w-full h-full opacity-[0.18]">
          <circle cx="190" cy="190" r="182" stroke="#F97316" strokeWidth="0.6" strokeDasharray="3 12" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x = 190 + Math.cos(a) * 182;
            const y = 190 + Math.sin(a) * 182;
            return <circle key={i} cx={x} cy={y} r="3.5" fill="#F97316" opacity="0.7" />;
          })}
        </svg>
      </motion.div>}

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[500px] h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.12), transparent 70%)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-lg mx-auto flex flex-col items-center"
      >
        <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">
          Moments Until
        </p>
        <h2
          className="font-script text-5xl sm:text-6xl text-[#4C1215] mb-2 leading-none"
          style={{ textShadow: "0 0 30px rgba(212,175,55,0.2)" }}
        >
          Yash &amp; Dhruvi
        </h2>

        <p className="font-serif text-[#D4AF37] text-sm sm:text-base italic mb-8">
          {invitationData.weddingDateLabel}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-8 w-36">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/70" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>

        {isClient ? (
          <div className="flex justify-center items-start gap-3 sm:gap-6 md:gap-10">
            <TimeUnit value={timeLeft.days} label="Days" />
            <Colon />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <Colon />
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <Colon />
            <TimeUnit value={timeLeft.seconds} label="Secs" />
          </div>
        ) : (
          <div className="h-28" />
        )}
      </motion.div>
    </section>
  );
}

function Colon() {
  return (
    <div className="flex flex-col gap-1.5 pb-8 pt-2">
      <motion.div
        className="w-1 h-1 rounded-full bg-[#D4AF37]/50"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.div
        className="w-1 h-1 rounded-full bg-[#D4AF37]/50"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const display = value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2" style={{ perspective: "500px" }}>
      <div
        className="relative bg-[#fef9f2]/88 backdrop-blur-sm border border-[#D4AF37]/55 px-3 sm:px-4 py-2.5 sm:py-3 min-w-[2.8rem] sm:min-w-[4.2rem] flex justify-center overflow-hidden shadow-[0_4px_24px_rgba(212,175,55,0.28),inset_0_1px_0_rgba(255,255,255,0.9)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gold top accent */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
        {/* Gold bottom accent */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        {/* Corner ornaments */}
        <svg className="absolute top-1 left-1 opacity-35" width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1 L4 1 M1 1 L1 4" stroke="#D4AF37" strokeWidth="0.8"/></svg>
        <svg className="absolute top-1 right-1 opacity-35" width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M7 1 L4 1 M7 1 L7 4" stroke="#D4AF37" strokeWidth="0.8"/></svg>
        <svg className="absolute bottom-1 left-1 opacity-35" width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 7 L4 7 M1 7 L1 4" stroke="#D4AF37" strokeWidth="0.8"/></svg>
        <svg className="absolute bottom-1 right-1 opacity-35" width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M7 7 L4 7 M7 7 L7 4" stroke="#D4AF37" strokeWidth="0.8"/></svg>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="font-serif text-3xl sm:text-4xl md:text-6xl text-[#4C1215] font-light tabular-nums tracking-wide block"
            style={{ transformOrigin: "center", transformStyle: "preserve-3d" }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-sans text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
        {label}
      </span>
    </div>
  );
}
