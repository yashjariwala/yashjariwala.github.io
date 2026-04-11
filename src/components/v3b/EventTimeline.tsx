"use client";

import { useRef, forwardRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// useScroll/useTransform kept for the line drawing — useSpring on lineScaleY is fine (single value, not per-card)
import { invitationData } from "@/lib/invitationData";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function EventTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  });
  const lineScaleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 55, damping: 16 }
  );

  return (
    <section
      id="timeline"
      className="py-24 sm:py-28 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fffbf5 0%, #fef6e8 100%)" }}
    >
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent" />

      {/* Diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-16 sm:mb-20 flex flex-col items-center"
        >
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="mb-4 opacity-70">
            <path d="M20 2 C14 2, 6 8, 2 10 C6 12, 14 18, 20 18 C26 18, 34 12, 38 10 C34 8, 26 2, 20 2Z" stroke="#D4AF37" strokeWidth="0.7" fill="none"/>
            <circle cx="20" cy="10" r="2.5" fill="#D4AF37" fillOpacity="0.5"/>
            <path d="M2 10H0 M38 10H40" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.5"/>
          </svg>
          <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">
            Order of Events
          </p>
          <h2
            className="font-script text-[#4C1215] leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 12vw, 5.5rem)",
              textShadow: "0 0 40px rgba(212,175,55,0.15)",
            }}
          >
            Weekend Itinerary
          </h2>
          <div className="flex items-center gap-2 w-36">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Self-drawing golden thread — mobile (left side) */}
          <div className="md:hidden absolute left-[19px] top-2 bottom-2 w-[2px]">
            <motion.div
              className="w-full origin-top"
              style={{
                scaleY: lineScaleY,
                height: "100%",
                background: "linear-gradient(to bottom, #D4AF37, #D4AF37aa, #D4AF3730)",
              }}
            />
          </div>
          {/* Self-drawing golden thread — desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-[2px]">
            <motion.div
              className="w-full origin-top"
              style={{
                scaleY: lineScaleY,
                height: "100%",
                background: "linear-gradient(to bottom, #D4AF37, #D4AF37aa, #D4AF3730)",
              }}
            />
          </div>

          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {invitationData.timelineDays.map((day, dayIdx) => (
              <DayBlock key={day.date} day={day} dayIdx={dayIdx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DayBlock({
  day,
  dayIdx,
}: {
  day: (typeof invitationData.timelineDays)[number];
  dayIdx: number;
}) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex justify-center mb-10 sm:mb-12 relative z-20"
      >
        <div className="ml-10 md:ml-0 inline-flex items-center gap-3 border border-[#D4AF37]/50 bg-[#fef9f2]/90 backdrop-blur-sm px-5 py-2.5 shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
          <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/80" />
          <span className="font-serif text-base sm:text-lg text-[#4C1215]/80 italic tracking-wide">
            {day.date}
          </span>
          <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/80" />
        </div>
      </motion.div>
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        {day.events.map((event, eventIdx) => (
          <TimelineEvent
            key={event.title}
            event={event}
            eventIdx={eventIdx}
            isEven={eventIdx % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineEvent({
  event,
  eventIdx,
  isEven,
}: {
  event: { time: string; title: string; description?: string };
  eventIdx: number;
  isEven: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Use whileInView (IntersectionObserver) instead of useScroll per card — no per-frame scroll listeners
  const revealVariants = {
    hidden: { opacity: 0, x: isEven ? -28 : 28, y: 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  const mobileVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <div className="relative flex items-center px-2 md:px-0">
      {/* Node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 z-20 w-[16px] h-[16px] md:w-[20px] md:h-[20px] bg-[#fef9f2] border-2 border-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_18px_rgba(212,175,55,0.6)]"
      >
        <div className="w-[5px] h-[5px] md:w-[6px] md:h-[6px] rounded-full bg-[#D4AF37]" />
      </motion.div>

      {/* Mobile — full width single column */}
      <div className="md:hidden w-full pl-9">
        <EventCard ref={cardRef} event={event} variants={mobileVariants} align="left" />
      </div>

      {/* Desktop alternating */}
      <div className="hidden md:flex w-full items-center">
        {isEven ? (
          <>
            <div className="w-1/2 flex justify-end pr-10 lg:pr-14">
              <EventCard ref={cardRef} event={event} variants={revealVariants} align="right" />
            </div>
            <div className="w-1/2" />
          </>
        ) : (
          <>
            <div className="w-1/2" />
            <div className="w-1/2 flex justify-start pl-10 lg:pl-14">
              <EventCard ref={cardRef} event={event} variants={revealVariants} align="left" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const EventCard = forwardRef<
  HTMLDivElement,
  {
    event: { time: string; title: string; description?: string };
    variants: import("framer-motion").Variants;
    align: "left" | "right";
  }
>(({ event, variants, align }, ref) => (
  <motion.div
    ref={ref}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={variants}
    className={`relative bg-[#fef9f2]/92 backdrop-blur-sm border border-[#D4AF37]/40 shadow-[0_8px_40px_rgba(212,175,55,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] p-5 sm:p-6 max-w-[300px] w-full overflow-hidden ${align === "right" ? "text-right" : "text-left"}`}
  >
    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    <div className="absolute inset-[5px] border border-[#D4AF37]/15 pointer-events-none" />
    {/* Corner ornaments */}
    <svg className="absolute top-2 left-2 opacity-30" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1 L5 1 M1 1 L1 5" stroke="#D4AF37" strokeWidth="1"/><circle cx="1" cy="1" r="0.8" fill="#D4AF37"/></svg>
    <svg className="absolute top-2 right-2 opacity-30" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M11 1 L7 1 M11 1 L11 5" stroke="#D4AF37" strokeWidth="1"/><circle cx="11" cy="1" r="0.8" fill="#D4AF37"/></svg>

    <div className={`flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
      <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] bg-[#D4AF37]/08 px-2.5 py-1 mb-3 inline-block">
        {event.time}
      </span>
      <h4 className="font-serif text-lg sm:text-xl text-[#4C1215]/90 mb-2 leading-snug font-medium">
        {event.title}
      </h4>
      <div
        className={`w-8 h-[1px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent mb-2.5 ${align === "right" ? "ml-auto rotate-180" : ""}`}
      />
      {event.description && (
        <p className="font-sans text-xs sm:text-sm text-[#4C1215]/50 leading-relaxed">
          {event.description}
        </p>
      )}
    </div>
  </motion.div>
));
EventCard.displayName = "EventCard";
