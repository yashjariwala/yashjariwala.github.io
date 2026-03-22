"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Petal = {
  id: number;
  left: number;
  dur: number;
  delay: number;
  size: number;
  hue: number;
  drift: number;
};

export default function GlobalPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? 8 : 14;
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 96 + 2,
        dur: Math.random() * 14 + 16,
        delay: Math.random() * 20,
        size: Math.random() * 7 + 6,
        hue: Math.random() * 25,
        drift: (Math.random() - 0.5) * 120,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -30, x: `${p.left}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: "108vh",
            x: [`${p.left}vw`, `${p.left + p.drift * 0.5}vw`, `${p.left + p.drift}vw`],
            opacity: [0, 0.45, 0.45, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.05, 0.9, 1],
          }}
          style={{ position: "fixed", top: 0, willChange: "transform, opacity" }}
        >
          <svg width={p.size} height={p.size * 1.4} viewBox="0 0 12 17" fill="none">
            <ellipse
              cx="6" cy="8.5" rx="4.5" ry="7.5"
              fill={`hsl(${25 + p.hue}, 88%, 60%)`}
              fillOpacity="0.7"
            />
            <ellipse cx="6" cy="8.5" rx="2" ry="4" fill="white" fillOpacity="0.25" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
