"use client";

import { motion } from "framer-motion";
import { invitationData } from "@/lib/invitationData";

export default function EventTimeline() {
    return (
        <section id="timeline" className="py-24 px-4 bg-[#FAF9F6] text-[#2D3A3A] relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24 flex flex-col items-center"
                >
                    <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#C5A46D] mb-6 block">Order of Events</span>
                    <h2 className="font-script text-5xl md:text-[5rem] mb-6 text-[#2D3A3A] leading-tight">Weekend Itinerary</h2>

                    <div className="flex items-center justify-center w-full my-6 opacity-75">
                        <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48">
                            <path d="M0 12H65" stroke="#C5A46D" strokeWidth="0.75" />
                            <path d="M115 12H180" stroke="#C5A46D" strokeWidth="0.75" />
                            <path d="M75 12L90 4L105 12L90 20L75 12Z" stroke="#C5A46D" strokeWidth="1" />
                            <path d="M82 12L90 7.5L98 12L90 16.5L82 12Z" fill="#C5A46D" />
                            <circle cx="90" cy="12" r="1.5" fill="#FAF9F6" />
                        </svg>
                    </div>
                </motion.div>

                <div className="space-y-20 lg:space-y-32 relative">
                    {/* Main vertical center line for desktop */}
                    <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-[#C5A46D]/30 -translate-x-1/2 rounded-full" />
                    {/* Main vertical left line for mobile */}
                    <div className="md:hidden absolute left-[15px] top-4 bottom-4 w-[1px] bg-[#C5A46D]/30 rounded-full" />

                    {invitationData.timelineDays.map((day) => (
                        <div key={day.date} className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                                className="flex justify-center mb-12 md:mb-16"
                            >
                                <div className="bg-[#FAF9F6] border border-[#e6dece] px-6 md:px-10 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full text-center relative z-20">
                                    <h3 className="font-serif text-xl md:text-2xl text-[#C5A46D] italic tracking-wide">
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
                                            {/* Node dot on the timeline line */}
                                            <div className="absolute left-[9px] md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 top-1/2 w-4 h-4 bg-white border-[3px] border-[#C5A46D] rounded-full z-10 group-hover:bg-[#C5A46D] transition-colors duration-500 shadow-[0_0_0_6px_#FAF9F6]" />

                                            {/* Horizontal connecting line (Desktop only) */}
                                            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-[1px] bg-[#C5A46D]/20 z-0
                        ${isEven ? 'right-1/2 mr-3' : 'left-1/2 ml-3'}
                      `} />

                                            {/* Desktop layout: alternating left/right strictly forced to their columns */}
                                            <div className="hidden md:flex w-full items-center">
                                                {isEven ? (
                                                    <div className="w-1/2 flex justify-end pr-10 lg:pr-16">
                                                        <EventCard event={event} isEven={true} />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-1/2" />
                                                        <div className="w-1/2 flex justify-start pl-10 lg:pl-16">
                                                            <EventCard event={event} isEven={false} />
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Mobile layout: all cards push right of the line */}
                                            <div className="md:hidden w-full pl-6 pb-2">
                                                <EventCard event={event} isEven={false} mobile />
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

function EventCard({ event, isEven, mobile = false }: { event: { time: string; title: string; location?: string; description?: string }, isEven: boolean, mobile?: boolean }) {
    return (
        <div className={`
      relative bg-white p-6 md:p-8 shadow-md border border-[#e6dece] max-w-[340px] w-full 
      hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden
      ${!mobile && isEven ? 'text-right' : 'text-left'}
    `}>
            {/* Luxury stationery inner borders */}
            <div className="absolute inset-1.5 md:inset-2 border border-[#C5A46D]/15 pointer-events-none" />

            {/* Time Label */}
            <div className={`flex flex-col ${!mobile && isEven ? 'items-end' : 'items-start'} mb-3`}>
                <p className="font-sans tracking-[0.25em] text-[10px] md:text-xs text-[#C5A46D] uppercase font-medium bg-[#f4ebd9]/30 px-3 py-1 rounded-sm">
                    {event.time}
                </p>
            </div>

            {/* Title */}
            <h4 className="font-serif text-2xl md:text-3xl text-[#2D3A3A] mb-3 leading-snug">{event.title}</h4>

            {/* Divider */}
            <div className={`w-12 h-[1px] bg-gradient-to-r from-[#C5A46D]/60 to-transparent block mb-4
        ${!mobile && isEven ? 'ml-auto bg-gradient-to-l' : ''}
      `} />

            {/* Description */}
            <p className="font-sans text-xs md:text-sm text-[#5c5c5c] leading-relaxed">
                {event.description}
            </p>
        </div>
    );
}
