"use client";

import { motion } from "framer-motion";

export function FireEmbersOverlay() {
    // Generate random embers
    const embers = Array.from({ length: 25 }).map((_, i) => {
        const size = Math.random() * 3 + 1; // 1px to 4px
        const startX = Math.random() * 100; // 0% to 100% width
        const duration = Math.random() * 3 + 2; // 2s to 5s
        const delay = Math.random() * 3;

        return (
            <motion.div
                key={i}
                className="absolute rounded-full bg-[#fca5a5] shadow-[0_0_8px_4px_rgba(239,68,68,0.6)] mix-blend-screen pointer-events-none"
                style={{
                    width: size,
                    height: size,
                    left: `${startX}%`,
                    bottom: "-10%",
                }}
                animate={{
                    y: [0, -150, -300], // Float way up
                    x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30], // Drift side to side
                    opacity: [0, 1, 0.8, 0], // Flash and fade out
                    scale: [0, 1.5, 0],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: delay,
                }}
            />
        );
    });

    return (
        <div className="absolute inset-0 overflow-hidden mix-blend-lighten pointer-events-none">
            {/* Dynamic warm bottom glow for the fire source */}
            <motion.div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[150%] h-1/2 bg-[#ef4444] blur-[40px] opacity-30 rounded-full"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {embers}
        </div>
    );
}

export function GlowingDustOverlay() {
    // Generate elegant floating dust motes (bokeh)
    const dust = Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 4 + 2; // 2px to 6px
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 5 + 4; // 4s to 9s
        const delay = Math.random() * 4;

        return (
            <motion.div
                key={i}
                className="absolute rounded-full bg-[#fef08a] shadow-[0_0_12px_3px_rgba(250,204,21,0.5)] mix-blend-screen pointer-events-none"
                style={{
                    width: size,
                    height: size,
                    left: `${startX}%`,
                    top: `${startY}%`,
                }}
                animate={{
                    y: [0, Math.random() * -50 - 20], // Drift slowly up
                    x: [0, Math.random() * 30 - 15], // Drift gently side to side
                    opacity: [0, 0.6, 0.1, 0], // Shimmer
                    scale: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                }}
            />
        );
    });

    return (
        <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none">
            {/* Subtle sweeping light ray */}
            <motion.div
                className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.08)] to-transparent -rotate-45"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
            />
            {dust}
        </div>
    );
}

export function ShoweringFlowersOverlay() {
    const flowers = Array.from({ length: 18 }).map((_, i) => {
        const size = Math.random() * 8 + 8; // 8px to 16px (slightly smaller for the circle)
        const startX = Math.random() * 120 - 10; // -10% to 110% width
        const duration = Math.random() * 3 + 2.5; // 2.5s to 5.5s
        const delay = Math.random() * -5;

        const isMarigold = Math.random() > 0.5;
        const colorClass = isMarigold
            ? "text-[#fbbf24]" // Marigold yellow/orange
            : "text-[#dc2626]"; // Rose red

        return (
            <motion.svg
                key={`flower-${i}`}
                viewBox="0 0 24 24"
                fill="currentColor"
                // Added drop-shadow for depth over the image
                className={`absolute opacity-90 pointer-events-none transform-gpu drop-shadow-sm ${colorClass}`}
                style={{
                    width: size,
                    height: size,
                    left: `${startX}%`,
                    willChange: "transform, opacity",
                }}
                initial={{ y: -50, rotate: 0, opacity: 0 }}
                animate={{
                    y: [-30, 400], // Fall completely through the 256px circle
                    x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30], // Random wind drift
                    rotate: [0, 360, 720],
                    opacity: [0, 1, 1, 0],
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

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {flowers}
        </div>
    );
}
