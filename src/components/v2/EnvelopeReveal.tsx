"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function EnvelopeReveal({ onOpen }: { onOpen?: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [fullyDone, setFullyDone] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const media = window.matchMedia("(max-width: 768px)");
        const updateMobile = () => setIsMobile(media.matches);
        updateMobile();

        media.addEventListener("change", updateMobile);
        return () => media.removeEventListener("change", updateMobile);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!isDone) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        };
    }, [isDone]);

    const handleOpen = () => {
        if (isOpen) return;

        setIsOpen(true);
        onOpen?.();

        const audio = document.getElementById("bg-music") as HTMLAudioElement;
        if (audio) {
            audio.play().catch((e) => console.log("Audio autoplay blocked by browser:", e));
        }

        timeoutRef.current = window.setTimeout(() => {
            setIsDone(true);
        }, 3800);
    };

    if (fullyDone) return null;

    const zoomScale = isMobile ? 3.25 : 3.85;

    return (
        <AnimatePresence onExitComplete={() => setFullyDone(true)}>
            {!isDone && (
                <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                        opacity: isOpen ? 0 : 1,
                        scale: isOpen ? zoomScale : 1,
                    }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{
                        opacity: { duration: 1.2, delay: 1.5, ease: "easeIn" },
                        scale: { duration: 1.72, delay: 0.82, ease: [0.22, 0.61, 0.36, 1] },
                    }}
                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto transform-gpu transform-origin-center overflow-hidden"
                    style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
                >
                    {/* Backlight glow */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                        initial={{ opacity: 0, scale: 0.82 }}
                        animate={{
                            opacity: isOpen ? [0, 1, 0] : 0,
                            scale: isOpen ? 1.48 : 0.82,
                        }}
                        transition={{ duration: 2.02, delay: 0.12, ease: "easeOut" }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <div
                            className="w-[150vw] h-[150vw] sm:w-[80vw] sm:h-[80vw] rounded-full"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(212,175,55,0.6) 20%, rgba(255,255,255,0) 70%)",
                                filter: `blur(${isMobile ? 42 : 58}px)`,
                            }}
                        />
                    </motion.div>

                    {/* Flash to blend into site */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-[100] bg-white mix-blend-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isOpen ? [0, 0.9, 0] : 0 }}
                        transition={{ duration: 2.55, delay: 0.8, ease: "easeInOut" }}
                    />

                    <div
                        className="relative flex-none z-10"
                        style={{
                            width: "max(100vw, 150vh)",
                            height: "max(calc(100vw / 1.5), 100vh)",
                            contain: "layout paint",
                            perspective: 2000,
                            WebkitPerspective: 2000,
                        }}
                    >
                        {/* Left flap */}
                        <div
                            className="absolute inset-0 w-full h-full z-10 transform-gpu"
                            style={{
                                filter: "drop-shadow(3px 0px 10px rgba(0,0,0,0.15))",
                                willChange: "transform",
                                transform: "translateZ(0)",
                                backfaceVisibility: "hidden",
                            }}
                        >
                            <div
                                className="w-full h-full bg-[#8A151B] envelope-texture"
                                style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
                            />
                        </div>

                        {/* Right flap */}
                        <div
                            className="absolute inset-0 w-full h-full z-10 transform-gpu"
                            style={{
                                filter: "drop-shadow(-3px 0px 10px rgba(0,0,0,0.15))",
                                willChange: "transform",
                                transform: "translateZ(0)",
                                backfaceVisibility: "hidden",
                            }}
                        >
                            <div
                                className="w-full h-full bg-[#8A151B] envelope-texture"
                                style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)" }}
                            />
                        </div>

                        {/* Bottom flap */}
                        <div
                            className="absolute inset-0 w-full h-full z-20 transform-gpu"
                            style={{
                                filter: "drop-shadow(0px -5px 15px rgba(0,0,0,0.2))",
                                willChange: "transform",
                                transform: "translateZ(0)",
                                backfaceVisibility: "hidden",
                            }}
                        >
                            <div
                                className="w-full h-full bg-[#730E13] envelope-texture"
                                style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}
                            />
                        </div>

                        {/* Top flap */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-[50%] z-30 transform-gpu origin-top"
                            initial={{ rotateX: 0 }}
                            animate={{ rotateX: isOpen ? 180 : 0 }}
                            transition={{ duration: 1.52, ease: [0.22, 0.61, 0.36, 1] }}
                            style={{
                                transformStyle: "preserve-3d",
                                WebkitTransformStyle: "preserve-3d",
                                willChange: "transform",
                                transform: "translateZ(0)",
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    transform: "translateZ(1px)",
                                }}
                            >
                                <div className="w-full h-full" style={{ filter: "drop-shadow(0px 8px 12px rgba(0,0,0,0.25))" }}>
                                    <div
                                        className="w-full h-full bg-[#A81F26] envelope-texture"
                                        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                                    />
                                </div>

                                <button
                                    onClick={handleOpen}
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[60] w-64 h-64 md:w-80 md:h-80 cursor-pointer hover:scale-105 hover:brightness-110 active:scale-95 transition-all outline-none"
                                    style={{
                                        pointerEvents: isOpen ? "none" : "auto",
                                        transformStyle: "preserve-3d",
                                        transform: "translateZ(10px)",
                                    }}
                                >
                                    <Image
                                        src="/wax_seal.png"
                                        alt="Open Invitation"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        priority
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: [0.7, 1, 0.7], y: 0 }}
                                        transition={{ duration: 2.5, delay: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full flex flex-col items-center justify-center font-sans tracking-widest text-[#fdf5ec] font-semibold text-sm sm:text-base uppercase z-[70] drop-shadow-md"
                                        style={{ pointerEvents: "none" }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-1 text-[#D4AF37] animate-bounce">
                                            <path d="m18 15-6-6-6 6" />
                                        </svg>
                                        <p>Click seal to Open</p>
                                    </motion.div>
                                </button>
                            </div>

                            <div
                                className="absolute inset-0 bg-[#D4AF37] envelope-texture shadow-[inset_0_0_50px_rgba(0,0,0,0.3)]"
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                                    transform: "translateZ(-1px) rotateX(180deg)",
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
