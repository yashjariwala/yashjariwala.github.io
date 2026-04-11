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
          transition={{ delay: startDelay + i * 0.055, duration: 0.6, ease: EASE }}
          style={{ display: "inline-block", transformOrigin: "bottom center" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

type Petal = { x: number; tx: number; dur: number; delay: number; size: number; hue: number };

export default function Hero({ dateDisplay = invitationData.couple.date }: { dateDisplay?: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("mobile");

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const smoothY  = useSpring(contentY, { stiffness: 70, damping: 18 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const w = window.innerWidth;
      setScreenSize(w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 10 : 18;
    setPetals(
      Array.from({ length: count }, () => ({
        x:     Math.random() * window.innerWidth,
        tx:    Math.random() * window.innerWidth,
        dur:   Math.random() * 9 + 10,
        delay: Math.random() * 9,
        size:  Math.random() * 10 + 7,
        hue:   Math.random() * 30,
      }))
    );
  }, []);

  const groomName  = invitationData.couple.groom;
  const brideName  = invitationData.couple.bride;
  const brideDelay = 1.1;
  const groomDelay = brideDelay + groomName.length * 0.045 + 0.55;
  const finalDelay = groomDelay + brideName.length * 0.045;

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] min-h-[700px] flex items-center justify-center overflow-hidden"
      style={{ background: "#f5ede0" }}
    >
      {/* Full-screen illustrated background — portrait on mobile, landscape on desktop */}
      <div className="absolute inset-0 z-[1]">
        <Image
          src={screenSize === "mobile" ? "/ref/bg.png" : "/ref/desktop_bg.png"}
          alt="Wedding invitation background"
          fill
          className={screenSize === "mobile" ? "object-cover object-center" : "object-cover object-top"}
          priority
        />
      </div>

      {/* THE CARD — text over full-screen illustration */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : smoothY }}
        className="absolute inset-0 z-[4] flex items-start justify-center"
      >
        <div className="relative w-full h-full">
          {/* Text — positioned in the clear centre of the illustration */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-start text-center select-none"
            style={{
              paddingTop:    screenSize === "mobile" ? "calc(45% - 20px)" : screenSize === "tablet" ? "22%" : "10%",
              paddingLeft:   screenSize === "desktop" ? "12%" : screenSize === "tablet" ? "11%" : "20%",
              paddingRight:  screenSize === "desktop" ? "12%" : screenSize === "tablet" ? "11%" : "20%",
              paddingBottom: screenSize === "mobile" ? "32%" : screenSize === "tablet" ? "26%" : "16%",
            }}
          >
            {/* Invocation */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.2 }}
              className="text-[#7a5c10]"
              style={{
                fontFamily: "var(--font-devanagari), serif",
                fontSize: "clamp(1rem, 3.5vw, 1.3rem)",
                letterSpacing: "0.05em",
                marginBottom: "0.6rem",
              }}
            >
              {invitationData.invocation}
            </motion.p>

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="w-full max-w-[180px] h-[1px] mb-4"
              style={{ background: "linear-gradient(90deg, transparent, #C5973E 30%, #C5973E 70%, transparent)" }}
            />

            {/* Parents */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1 }}>
              <p
                className="text-[#4C1215] leading-snug"
                style={{ fontFamily: "var(--font-pinyon), cursive", fontSize: "clamp(1.75rem, 3.8vw, 3.1rem)", letterSpacing: "0.01em" }}
              >
                Rupa
                <span className="not-italic font-light text-[#4C1215]/60 mx-1" style={{ fontSize: "clamp(0.85rem, 2.4vw, 1.2rem)" }}>&amp;</span>
                Ashish<br className="sm:hidden" />
                {" "}Jariwala
              </p>
            </motion.div>

            {/* Invite line */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 1 }}
              className="font-sans text-[#4C1215]/75 uppercase tracking-[0.18em] mt-2 mb-0"
              style={{ fontSize: "clamp(0.82rem, 2.5vw, 1rem)", lineHeight: 1.7 }}
            >
              invite you to the wedding<br />of their son
            </motion.p>

            {/* Names — extra top margin so Y ascender clears the invite line */}
            <h1
              className="font-script leading-[0.88] text-[#4C1215]"
              style={{
                fontSize: screenSize === "desktop" ? "clamp(3rem, 6vw, 5.5rem)" : "clamp(3.5rem, 10vw, 8rem)",
                textShadow: "0 0 40px rgba(255,255,255,0.7), 0 2px 20px rgba(212,175,55,0.3), 0 4px 12px rgba(0,0,0,0.08)",
                marginTop: "0.55em",
                lineHeight: 1.1,
              }}
            >
              <AnimatedName name={groomName} startDelay={brideDelay} />
              <motion.span
                initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: brideDelay + groomName.length * 0.055 + 0.2, duration: 0.7, ease: EASE }}
                className="block font-sans font-extralight text-[#4C1215]"
                style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", margin: "0.3em 0", letterSpacing: "0.3em" }}
              >
                &amp;
              </motion.span>
              <AnimatedName name={brideName} startDelay={groomDelay} />
            </h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: finalDelay + 0.35, duration: 1, ease: EASE }}
              className="flex items-center gap-2 my-3 w-full max-w-[160px]"
            >
              <div className="flex-1 h-[0.5px]" style={{ background: "linear-gradient(90deg, transparent, #C5973E)" }} />
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                <path d="M9 1L11 5L9 9L7 5L9 1Z" stroke="#C5973E" strokeWidth="0.7" fill="none"/>
                <circle cx="9" cy="5" r="1.4" fill="#C5973E"/>
                <path d="M0 5H5M13 5H18" stroke="#C5973E" strokeWidth="0.5" strokeOpacity="0.8"/>
              </svg>
              <div className="flex-1 h-[0.5px]" style={{ background: "linear-gradient(270deg, transparent, #C5973E)" }} />
            </motion.div>

            {/* Date */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: finalDelay + 0.5, duration: 0.9 }}
              className="font-serif italic text-[#4C1215]/90"
              style={{ fontSize: "clamp(1.2rem, 3.8vw, 1.7rem)", letterSpacing: "0.04em" }}
            >
              {dateDisplay}
            </motion.p>

            {/* Venue — hidden for now */}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — bottom centre on mobile, left side vertical on desktop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: finalDelay + 1.2, duration: 1 }}
        className="absolute z-[6] cursor-pointer bottom-[3%] left-0 right-0 flex flex-col items-center gap-2"
        onClick={() => document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="font-sans text-[14px] uppercase tracking-[0.35em] font-semibold text-[#4C1215]/90">Scroll</span>
        <motion.div
          className="w-[1.5px]"
          style={{ background: "linear-gradient(to bottom, #4C1215, transparent)" }}
          animate={{ height: [16, 32, 16], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Falling petals */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-[7] overflow-hidden">
          {petals.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: -80, x: p.x, opacity: 0, rotate: 0 }}
              animate={{ y: "115vh", x: p.tx, opacity: [0, 0.6, 0.6, 0], rotate: [0, 200, 400] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "linear" }}
              style={{ position: "absolute", willChange: "transform, opacity" }}
            >
              <svg width={p.size} height={p.size * 1.3} viewBox="0 0 12 16" fill="none">
                <ellipse cx="6" cy="8" rx="4.5" ry="7" fill={`hsl(${28 + p.hue}, 92%, 55%)`} fillOpacity="0.8"/>
                <ellipse cx="6" cy="8" rx="2" ry="4" fill="white" fillOpacity="0.2"/>
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
