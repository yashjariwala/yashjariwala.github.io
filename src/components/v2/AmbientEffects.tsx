"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AmbientBackgroundEffects() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // OPTIMIZED: Reduced petal count from 30 -> 12 for buttery smooth scroll performance
    const petals = Array.from({ length: 12 }).map((_, i) => {
        const startX = Math.random() * 100;
        const duration = Math.random() * 8 + 6; // 6s to 14s falling time
        const delay = Math.random() * -10; // Negative delay to start mid-animation
        const size = Math.random() * 15 + 10; // 10px to 25px

        // OPTIMIZED: Removed heavy box-shadows, using simple text colors for SVGs
        const isMarigold = Math.random() > 0.5;
        const colorClass = isMarigold
            ? "text-[#fbbf24]" // Marigold yellow/orange
            : "text-[#dc2626]"; // Rose red

        return (
            <motion.svg
                key={`petal-${i}`}
                viewBox="0 0 24 24"
                fill="currentColor"
                // OPTIMIZED: Added transform-gpu to offload to hardware
                className={`absolute opacity-60 pointer-events-none transform-gpu ${colorClass}`}
                style={{ width: size, height: size, left: `${startX}%`, willChange: "transform, opacity" }}
                initial={{ y: -50, rotate: 0, opacity: 0 }}
                animate={{
                    y: ["-10vh", "350vh"],
                    x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
                    rotate: [0, 360, 720],
                    opacity: [0, 0.8, 0.8, 0],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay,
                }}
            >
                {/* 5-petaled flower shape */}
                <path d="M12,2 C10,2 8.5,3.5 8.5,5.5 C8.5,6.5 9,7.5 9.8,8.2 C8,8.5 6.5,10 6.5,12 C6.5,14 8,15.5 9.8,15.8 C9,16.5 8.5,17.5 8.5,18.5 C8.5,20.5 10,22 12,22 C14,22 15.5,20.5 15.5,18.5 C15.5,17.5 15,16.5 14.2,15.8 C16,15.5 17.5,14 17.5,12 C17.5,10 16,8.5 14.2,8.2 C15,7.5 15.5,6.5 15.5,5.5 C15.5,3.5 14,2 12,2 Z" />
            </motion.svg>
        );
    });

    // OPTIMIZED: Reduced orbs from 8 to 3. Reduced blur from 60px to 40px (blur is the #1 cause of scroll lag).
    const orbs = Array.from({ length: 3 }).map((_, i) => {
        const size = Math.random() * 100 + 50; // 50px to 150px
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 15 + 10;

        return (
            <motion.div
                key={`orb-${i}`}
                // OPTIMIZED: Added transform-gpu to offload to hardware
                className="absolute rounded-full bg-[#D4AF37] blur-[40px] opacity-15 pointer-events-none mix-blend-screen transform-gpu"
                style={{ width: size, height: size, left: `${startX}%`, top: `${startY}%`, willChange: "transform" }}
                animate={{
                    x: [0, Math.random() * 400 - 200, 0],
                    y: [0, Math.random() * 400 - 200, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        );
    });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {orbs}
            {petals}
        </div>
    );
}
