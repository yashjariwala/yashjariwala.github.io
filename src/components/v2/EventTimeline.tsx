"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";
import IndianCard from "./IndianCard";

export default function EventTimeline() {
    return (
        <section id="timeline" className="py-24 px-4 bg-[#fdf5ec] text-[#4C1215] relative overflow-hidden">
            {/* Background Texture Layers */}
            <div className="absolute inset-0 z-0 bg-[#f4ebd9]">
                <Image src="/texture2.jpeg" alt="Background Texture" fill className="object-cover opacity-40 mix-blend-overlay" />
            </div>
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24 flex flex-col items-center"
                >
                    <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block">Order of Events</span>
                    <h2 className="font-script text-5xl md:text-[5rem] mb-6 text-[#4C1215] leading-tight">Weekend Itinerary</h2>

                    <div className="flex items-center justify-center w-full my-6 opacity-75">
                        <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48">
                            <path d="M0 12H65" stroke="#D4AF37" strokeWidth="0.75" />
                            <path d="M115 12H180" stroke="#D4AF37" strokeWidth="0.75" />
                            <path d="M75 12L90 4L105 12L90 20L75 12Z" stroke="#D4AF37" strokeWidth="1" />
                            <path d="M82 12L90 7.5L98 12L90 16.5L82 12Z" fill="#D4AF37" />
                            <circle cx="90" cy="12" r="1.5" fill="#fdf5ec" />
                        </svg>
                    </div>
                </motion.div>
                <div className="space-y-20 lg:space-y-32 relative">
                    {/* Glowing Gold Thread - Main vertical center line for desktop */}
                    <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent -translate-x-1/2 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
                    {/* Glowing Gold Thread - Main vertical left line for mobile */}
                    <div className="md:hidden absolute left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent rounded-full shadow-[0_0_12px_rgba(212,175,55,0.8)]" />

                    {invitationData.timelineDays.map((day) => (
                        <div key={day.date} className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                                className="flex justify-center mb-12 md:mb-16"
                            >
                                <div className="bg-[#fdf5ec] border border-[#e6dece] px-6 md:px-10 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full text-center relative z-20">
                                    <h3 className="font-serif text-xl md:text-2xl text-[#D4AF37] italic tracking-wide">
                                        {day.date}
                                    </h3>
                                </div>
                            </motion.div>

                            <div className="space-y-12 md:space-y-16">
                                {day.events.map((event, eventIdx) => {
                                    const isEven = eventIdx % 2 === 0;
                                    return (
                                        <motion.div
                                            key={event.title}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.6, delay: eventIdx * 0.1 }}
                                            className="relative flex items-center group px-8 md:px-0 w-full"
                                        >
                                            {/* Ornate Mandala/Lotus Node on the timeline line */}
                                            <div className="absolute left-[9px] md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 top-1/2 w-8 h-8 md:w-10 md:h-10 text-[#D4AF37] z-10 group-hover:scale-125 transition-transform duration-500 shadow-[0_0_0_8px_#fdf5ec] rounded-full bg-[#fdf5ec] flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[85%] h-[85%] drop-shadow-md">
                                                    <path d="M12,2 C12,2 15,7 19.5,7 C19.5,7 15,9 15,14.5 C15,14.5 12,19.5 12,19.5 C12,19.5 9,14.5 9,14.5 C9,14.5 4.5,9 4.5,7 C9,7 12,2 12,2 Z" opacity="0.8" />
                                                    <circle cx="12" cy="12" r="2.5" fill="#4C1215" />
                                                    <path d="M12,4 L13,8 L17,9 L13,10 L12,14 L11,10 L7,9 L11,8 Z" fill="#fdf5ec" />
                                                </svg>
                                            </div>

                                            {/* Horizontal connecting line (Desktop only) */}
                                            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-[2px] bg-gradient-to-r ${isEven ? 'from-transparent to-[#D4AF37]' : 'from-[#D4AF37] to-transparent'} z-0 shadow-[0_0_8px_rgba(212,175,55,0.5)]
                        ${isEven ? 'right-1/2 mr-3' : 'left-1/2 ml-3'}
                      `} />

                                            {/* Desktop layout: alternating left/right strictly forced to their columns */}
                                            <div className="hidden md:flex w-full items-center">
                                                {isEven ? (
                                                    <div className="w-1/2 flex justify-end pr-10 lg:pr-16">
                                                        <EventCard event={event} />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-1/2" />
                                                        <div className="w-1/2 flex justify-start pl-10 lg:pl-16">
                                                            <EventCard event={event} />
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Mobile layout: all cards push right of the line */}
                                            <div className="md:hidden w-full pl-6 pb-2">
                                                <EventCard event={event} />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function EventCard({ event }: { event: { time: string; title: string; location?: string; description?: string } }) {
    return (
        <div className="w-full">
            <IndianCard className="!max-w-[340px]">
                <div className="flex flex-col items-center text-center w-full relative z-10 px-2">
                    {/* Top Decorative Motif */}
                    <div className="text-[#D4AF37] opacity-80 z-10 mb-3 transition-transform duration-500 hover:scale-110">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                        </svg>
                    </div>

                    {/* Time Label */}
                    <div className="w-full flex justify-center mb-3">
                        <p className="font-sans tracking-[0.25em] text-[10px] md:text-xs text-[#D4AF37] uppercase font-bold bg-[#fdf5ec] px-3 py-1 rounded-sm border border-[#D4AF37]/20 shadow-sm">
                            {event.time}
                        </p>
                    </div>

                    {/* Title */}
                    <h4 className="font-serif text-2xl md:text-3xl text-[#4C1215] mb-3 leading-snug font-semibold w-full text-center">{event.title}</h4>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-1.5 mb-4 w-full">
                        <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
                        <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                        <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs md:text-sm text-[#5c5c5c] leading-relaxed w-full text-center">
                        {event.description}
                    </p>
                </div>
            </IndianCard>
        </div>
    );
}
