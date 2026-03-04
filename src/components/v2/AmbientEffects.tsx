/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FLOWER_PATHS, petalColors } from "@/lib/FlowerShapes";

type PetalConfig = {
    size: number;
    startX: number;
    duration: number;
    delay: number;
    colorClass: string;
    pathIndex: number;
    xDrift1: number;
    xDrift2: number;
};

type OrbConfig = {
    size: number;
    startX: number;
    startY: number;
    duration: number;
    xDrift1: number;
    yDrift1: number;
};

export function AmbientBackgroundEffects() {
    const [petals, setPetals] = useState<PetalConfig[]>([]);
    const [orbs, setOrbs] = useState<OrbConfig[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setTimeout(() => {
            setPetals(Array.from({ length: 12 }).map(() => ({
                size: Math.random() * 15 + 10,
                startX: Math.random() * 100,
                duration: Math.random() * 8 + 6,
                delay: Math.random() * -10,
                colorClass: petalColors[Math.floor(Math.random() * petalColors.length)],
                pathIndex: Math.floor(Math.random() * FLOWER_PATHS.length),
                xDrift1: Math.random() * 100 - 50,
                xDrift2: Math.random() * 100 - 50,
            })));

            setOrbs(Array.from({ length: 3 }).map(() => ({
                size: Math.random() * 100 + 50,
                startX: Math.random() * 100,
                startY: Math.random() * 100,
                duration: Math.random() * 15 + 10,
                xDrift1: Math.random() * 400 - 200,
                yDrift1: Math.random() * 400 - 200,
            })));
        }, 0);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {orbs.map((orb, i) => (
                <motion.div
                    key={`orb-${i}`}
                    className="absolute rounded-full bg-[#D4AF37] blur-[40px] opacity-15 pointer-events-none mix-blend-screen transform-gpu"
                    style={{ width: orb.size, height: orb.size, left: `${orb.startX}%`, top: `${orb.startY}%`, willChange: "transform" }}
                    animate={{
                        x: [0, orb.xDrift1, 0],
                        y: [0, orb.yDrift1, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
            {petals.map((petal, i) => (
                <motion.svg
                    key={`petal-${i}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`absolute opacity-80 pointer-events-none transform-gpu drop-shadow-sm ${petal.colorClass}`}
                    style={{ width: petal.size, height: petal.size, left: `${petal.startX}%`, willChange: "transform, opacity" }}
                    initial={{ y: -50, rotate: 0, opacity: 0 }}
                    animate={{
                        y: ["-10vh", "350vh"],
                        x: [0, petal.xDrift1, petal.xDrift2],
                        rotate: [0, 360, 720],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: petal.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: petal.delay,
                    }}
                >
                    <path d={FLOWER_PATHS[petal.pathIndex]} />
                </motion.svg>
            ))}
        </div>
    );
}
