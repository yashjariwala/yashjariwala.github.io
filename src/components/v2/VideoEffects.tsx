"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FLOWER_PATHS, petalColors } from "@/lib/FlowerShapes";

type EmberConfig = { size: number; startX: number; duration: number; delay: number; xDrift1: number; xDrift2: number; };
export function FireEmbersOverlay() {
    const [embers, setEmbers] = useState<EmberConfig[]>([]);
    useEffect(() => {
        setTimeout(() => {
            setEmbers(Array.from({ length: 25 }).map(() => ({
                size: Math.random() * 3 + 1,
                startX: Math.random() * 100,
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 3,
                xDrift1: Math.random() * 40 - 20,
                xDrift2: Math.random() * 60 - 30,
            })));
        }, 0);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden mix-blend-lighten pointer-events-none">
            <motion.div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[150%] h-1/2 bg-[#ef4444] blur-[40px] opacity-30 rounded-full"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {embers.map((e, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-[#fca5a5] shadow-[0_0_8px_4px_rgba(239,68,68,0.6)] mix-blend-screen pointer-events-none"
                    style={{ width: e.size, height: e.size, left: `${e.startX}%`, bottom: "-10%" }}
                    animate={{
                        y: [0, -150, -300],
                        x: [0, e.xDrift1, e.xDrift2],
                        opacity: [0, 1, 0.8, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: e.duration,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: e.delay,
                    }}
                />
            ))}
        </div>
    );
}

type DustConfig = { size: number; startX: number; startY: number; duration: number; delay: number; yDrift: number; xDrift: number; };
export function GlowingDustOverlay() {
    const [dust, setDust] = useState<DustConfig[]>([]);
    useEffect(() => {
        setTimeout(() => {
            setDust(Array.from({ length: 20 }).map(() => ({
                size: Math.random() * 4 + 2,
                startX: Math.random() * 100,
                startY: Math.random() * 100,
                duration: Math.random() * 5 + 4,
                delay: Math.random() * 4,
                yDrift: Math.random() * -50 - 20,
                xDrift: Math.random() * 30 - 15,
            })));
        }, 0);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none">
            <motion.div
                className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.08)] to-transparent -rotate-45"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
            />
            {dust.map((d, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-[#fef08a] shadow-[0_0_12px_3px_rgba(250,204,21,0.5)] mix-blend-screen pointer-events-none"
                    style={{ width: d.size, height: d.size, left: `${d.startX}%`, top: `${d.startY}%` }}
                    animate={{
                        y: [0, d.yDrift],
                        x: [0, d.xDrift],
                        opacity: [0, 0.6, 0.1, 0],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: d.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: d.delay,
                    }}
                />
            ))}
        </div>
    );
}

type FlowerConfig = { size: number; startX: number; duration: number; delay: number; colorClass: string; pathIndex: number; xDrift1: number; xDrift2: number; };
export function ShoweringFlowersOverlay() {
    const [flowers, setFlowers] = useState<FlowerConfig[]>([]);
    useEffect(() => {
        setTimeout(() => {
            setFlowers(Array.from({ length: 18 }).map(() => ({
                size: Math.random() * 8 + 8,
                startX: Math.random() * 120 - 10,
                duration: Math.random() * 3 + 2.5,
                delay: Math.random() * -5,
                colorClass: petalColors[Math.floor(Math.random() * petalColors.length)],
                pathIndex: Math.floor(Math.random() * FLOWER_PATHS.length),
                xDrift1: Math.random() * 40 - 20,
                xDrift2: Math.random() * 60 - 30,
            })));
        }, 0);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {flowers.map((f, i) => (
                <motion.svg
                    key={`flower-${i}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`absolute opacity-90 pointer-events-none transform-gpu drop-shadow-md ${f.colorClass}`}
                    style={{ width: f.size, height: f.size, left: `${f.startX}%`, willChange: "transform, opacity" }}
                    initial={{ y: -50, rotate: 0, opacity: 0 }}
                    animate={{
                        y: [-30, 400],
                        x: [0, f.xDrift1, f.xDrift2],
                        rotate: [0, 360, 720],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: f.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: f.delay,
                    }}
                >
                    <path d={FLOWER_PATHS[f.pathIndex]} />
                </motion.svg>
            ))}
        </div>
    );
}
