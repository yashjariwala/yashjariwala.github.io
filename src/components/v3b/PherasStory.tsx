"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";

const pheras = [
  { number: 1, sanskrit: "प्रथम फेरा",  vow: "Nourishment" },
  { number: 2, sanskrit: "द्वितीय फेरा", vow: "Strength"    },
  { number: 3, sanskrit: "तृतीय फेरा",  vow: "Prosperity"  },
  { number: 4, sanskrit: "चतुर्थ फेरा", vow: "Happiness"   },
  { number: 5, sanskrit: "पंचम फेरा",   vow: "Family"      },
  { number: 6, sanskrit: "षष्ठ फेरा",   vow: "Longevity"   },
  { number: 7, sanskrit: "सप्तम फेरा",  vow: "Eternity"    },
];

const N  = pheras.length;
const s  = 1 / N; // one segment = 1/7 of total scroll

export default function PherasStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── track active dot via scroll ──
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(Math.floor(v * N), N - 1));
  });

  // ── Shared animated values ──
  const fireScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.55, 2.4]),
    { stiffness: 50, damping: 15 }
  );
  const ringRotate  = useTransform(scrollYProgress, [0, 1], [0, 210]);
  const bgUnblur    = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"]);
  const progressW   = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // ── Per-phera scroll-driven transforms (hooks called at fixed count, not in loop) ──
  // Each phera occupies scroll range [i*s … (i+1)*s].
  // Content enters from +80px below, centres, then exits to -80px above.
  // Ghost number scales 0.7 → 1.4 within its window.
  // Sanskrit slides in from +30px right.

  const mk = (i: number) => {
    const a = i * s, b = a + 0.28 * s, c = a + 0.72 * s, d = (i + 1) * s;
    return {
      y:   useTransform(scrollYProgress, [a, b, c, d], [80, 0, 0, -80]),
      op:  useTransform(scrollYProgress, [a, a + 0.18*s, c, d], [0, 1, 1, 0]),
      sc:  useTransform(scrollYProgress, [a, b, c, d], [0.78, 1, 1, 0.78]),
      sanX:useTransform(scrollYProgress, [a, b], [28, 0]),
    };
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = [mk(0), mk(1), mk(2), mk(3), mk(4), mk(5), mk(6)];

  // smooth y for each
  const sy = t.map((v) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring(v.y, { stiffness: 120, damping: 22 })
  );

  // first phera should start fully visible
  const o0fixed = useTransform(
    scrollYProgress,
    [0, 0.72 * s, s],
    [1, 1, 0]
  );

  return (
    <div
      ref={containerRef}
      id="pheras"
      style={{ height: `${N * 100}vh` }}
      className="relative"
    >
      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 h-[100svh] overflow-hidden"
        style={{ background: "linear-gradient(160deg, #160303 0%, #2d0f00 55%, #1a0800 100%)" }}
      >
        {/* Blurring cinematic BG */}
        <motion.div className="absolute inset-0" style={{ filter: bgUnblur }}>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/v2/wedding_pheras_cinematic.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160303] via-[#160303]/65 to-[#160303]/25" />
        </motion.div>

        {/* Rotating dashed mandala ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            rotate: ringRotate,
            width:  "min(90vw, 520px)",
            height: "min(90vw, 520px)",
          }}
        >
          <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
            <circle cx="200" cy="200" r="192" stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="3 14" strokeOpacity="0.18" />
            <circle cx="200" cy="200" r="158" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="2 9"  strokeOpacity="0.12" />
            <circle cx="200" cy="200" r="118" stroke="#F97316" strokeWidth="0.3" strokeDasharray="1 7"  strokeOpacity="0.1"  />
          </svg>
        </motion.div>

        {/* Top label */}
        <div className="absolute top-7 left-0 right-0 text-center z-20">
          <p className="font-sans text-[8px] uppercase tracking-[0.55em] text-[#D4AF37]/45">
            The Seven Sacred Vows
          </p>
        </div>

        {/* Progress dots */}
        <div className="absolute top-[52px] left-0 right-0 flex justify-center gap-2.5 z-20">
          {pheras.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale:           i === active ? 1.5 : 1,
                backgroundColor: i <= active  ? "#D4AF37" : "rgba(212,175,55,0.18)",
              }}
              transition={{ duration: 0.3 }}
              className="w-[6px] h-[6px] rounded-full"
            />
          ))}
        </div>

        {/* ── All 7 pheras rendered with absolute pos + scroll-driven transforms ── */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {pheras.map((p, i) => (
            <motion.div
              key={i}
              className="absolute flex flex-col items-center text-center px-6 w-full"
              style={{
                y:       sy[i],
                opacity: i === 0 ? o0fixed : t[i].op,
                scale:   t[i].sc,
              }}
            >
              {/* Sanskrit — slides in from right */}
              <motion.p
                className="font-sans text-[9px] uppercase tracking-[0.55em] text-[#D4AF37]/65 mb-5"
                style={{ x: t[i].sanX }}
              >
                {p.sanskrit}
              </motion.p>

              {/* Ghost number */}
              <div
                className="absolute font-serif font-black text-[#D4AF37]/[0.06] select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(7rem, 35vw, 15rem)", top: "50%", transform: "translateY(-50%)" }}
                aria-hidden
              >
                {p.number}
              </div>

              {/* "For" prefix */}
              <p
                className="font-serif italic text-[#fdf6e3]/50 leading-none mb-1"
                style={{ fontSize: "clamp(1.1rem, 4vw, 1.8rem)" }}
              >
                For
              </p>

              {/* Main vow word */}
              <h3
                className="font-script text-[#fdf6e3] leading-none relative z-10"
                style={{
                  fontSize:   "clamp(3rem, 14vw, 7rem)",
                  textShadow: "0 0 60px rgba(249,115,22,0.5), 0 0 20px rgba(212,175,55,0.3)",
                }}
              >
                {p.vow}
              </h3>

              {/* Gold divider */}
              <div className="flex items-center gap-2 mt-5 w-32">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
                <div className="w-[5px] h-[5px] rotate-45 bg-[#D4AF37]/70 flex-shrink-0" />
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sacred flame — grows from 0.55 → 2.4 through the section */}
        <motion.div
          className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          style={{ scale: fireScale }}
        >
          <Flame />
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#D4AF37]/08 z-30">
          <motion.div
            className="h-full bg-gradient-to-r from-[#F97316]/50 via-[#D4AF37] to-[#F97316]/50"
            style={{ width: progressW }}
          />
        </div>

        {/* Step counter */}
        <div className="absolute bottom-5 left-0 right-0 text-center z-20 pointer-events-none">
          <p className="font-sans text-[8px] uppercase tracking-[0.45em] text-[#D4AF37]/35">
            {active + 1} / {N}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Animated SVG flame ── */
function Flame() {
  return (
    <div className="relative w-24 sm:w-32 flex justify-center">
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "160px", height: "160px",
          background: "radial-gradient(circle, rgba(249,115,22,0.32), transparent 68%)",
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "70px", height: "70px",
          background: "radial-gradient(circle, rgba(255,210,60,0.55), transparent 68%)",
        }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
      />
      <motion.svg
        viewBox="0 0 60 90"
        fill="none"
        className="w-full h-auto relative z-10"
        animate={{ scaleX: [1, 0.91, 1.06, 1], skewX: ["0deg", "-4deg", "2deg", "0deg"] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="fg2" x1="30" y1="88" x2="30" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#F97316" stopOpacity="0.95" />
            <stop offset="38%"  stopColor="#FBBF24" />
            <stop offset="72%"  stopColor="#FEF08A" stopOpacity="0.9"  />
            <stop offset="100%" stopColor="#FFFFFF"  stopOpacity="0.5"  />
          </linearGradient>
          <linearGradient id="ig2" x1="30" y1="80" x2="30" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FFFFFF"  stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <motion.path
          d="M30 88 C10 70 5 50 15 35 C20 25 25 30 22 18 C28 28 35 20 32 8 C42 22 55 38 45 55 C50 45 52 35 48 28 C55 42 55 65 30 88Z"
          fill="url(#fg2)"
          animate={{
            d: [
              "M30 88 C10 70 5 50 15 35 C20 25 25 30 22 18 C28 28 35 20 32 8 C42 22 55 38 45 55 C50 45 52 35 48 28 C55 42 55 65 30 88Z",
              "M30 88 C8 68 8 48 18 33 C22 22 28 28 24 16 C30 26 38 18 34 6 C44 20 58 36 46 53 C52 42 54 32 50 26 C57 40 57 63 30 88Z",
              "M30 88 C10 70 5 50 15 35 C20 25 25 30 22 18 C28 28 35 20 32 8 C42 22 55 38 45 55 C50 45 52 35 48 28 C55 42 55 65 30 88Z",
            ],
          }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
        />
        <path
          d="M30 80 C20 65 18 52 24 40 C26 34 29 37 28 28 C32 34 36 28 34 20 C40 30 44 46 38 58 C40 50 41 42 38 36 C43 46 42 62 30 80Z"
          fill="url(#ig2)"
          opacity="0.85"
        />
      </motion.svg>
    </div>
  );
}
