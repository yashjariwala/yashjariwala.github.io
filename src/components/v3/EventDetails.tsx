"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { invitationData } from "@/lib/invitationData";
import { FireEmbersOverlay, GlowingDustOverlay } from "@/components/v2/VideoEffects";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function EventDetails() {
  return (
    <section id="details" className="relative overflow-hidden">
      {/* Editorial full-bleed event cards — no padding, edge to edge */}
      <div className="flex flex-col">
        {invitationData.events.map((event, idx) => (
          <EventCard key={event.title} event={event} idx={idx} />
        ))}
      </div>

      {/* Map — contained, with breathing room */}
      <div className="px-4 py-16 sm:py-20" style={{ background: "linear-gradient(180deg, #1a0808 0%, #2d0f0a 100%)" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex flex-col items-center mb-8">
            <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-[#D4AF37] mb-3">Venue</p>
            <h3 className="font-script text-3xl sm:text-4xl text-[#fdf6e3]" style={{ textShadow: "0 0 30px rgba(212,175,55,0.4)" }}>
              How to Find Us
            </h3>
          </div>
          <div className="overflow-hidden border border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="w-full h-[240px] sm:h-[320px]">
              <iframe
                src="https://maps.google.com/maps?q=Marriott%20Hotel%20Navi%20Mumbai&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location Map"
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EventCard({ event, idx }: { event: (typeof invitationData.events)[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // No spring — direct transform avoids jitter during fast scroll
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  const isWedding = event.title.includes("Wedding");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative overflow-hidden"
      style={{ height: "clamp(480px, 75vh, 720px)" }}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-[-12%] bg-cover bg-center"
        style={{
          backgroundImage: `url('${isWedding ? "/wedding.avif" : "/v2/reception_stage_cinematic.png"}')`,
          y: imgY,
          willChange: "transform",
        }}
      />

      {/* Fire / dust overlay */}
      <div className="absolute inset-0 z-10">
        {isWedding ? <FireEmbersOverlay /> : <GlowingDustOverlay />}
      </div>

      {/* Rich gradient — dark at bottom where text lives */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background: isWedding
            ? "linear-gradient(to top, #1a0505 0%, rgba(26,5,5,0.82) 35%, rgba(26,5,5,0.5) 65%, rgba(26,5,5,0.25) 100%)"
            : "linear-gradient(to top, #0d0c1a 0%, rgba(13,12,26,0.7) 35%, rgba(13,12,26,0.1) 65%, transparent 100%)",
        }}
      />

      {/* Gold top accent line */}
      {idx === 0 && (
        <div className="absolute top-0 inset-x-0 h-[2px] z-30 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
      )}

      {/* Bottom divider between cards */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] z-30 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      {/* Text content — sits over the image */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-8 sm:p-12 md:p-16">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-[1px] bg-[#D4AF37]/70" />
          <span className="font-sans text-[9px] uppercase tracking-[0.5em] text-[#D4AF37]">
            {isWedding ? "Wedding Ceremony" : "Grand Reception"}
          </span>
        </motion.div>

        {/* Big title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="font-script text-white mb-6 leading-none"
          style={{
            fontSize: "clamp(3rem, 11vw, 7rem)",
            textShadow: "0 4px 40px rgba(0,0,0,0.8), 0 0 60px rgba(212,175,55,0.2)",
          }}
        >
          {event.title}
        </motion.h2>

        {/* Info blocks — prominent, readable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 border-t border-[#D4AF37]/25"
        >
          <InfoBlock icon={<CalIcon />} label="Date" value={event.dateLabel} />
          <InfoBlock icon={<ClockIcon />} label="Time" value={event.timeLabel} />
          <InfoBlock icon={<PinIcon />} label="Venue" value={event.venue} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function InfoBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <div className="w-3.5 h-3.5 flex-shrink-0 text-[#D4AF37]/70">{icon}</div>
        <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]/70">{label}</span>
      </div>
      <span className="font-serif text-base sm:text-xl md:text-2xl text-white italic leading-snug">{value}</span>
    </div>
  );
}

function CalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="4" width="16" height="14" rx="1" />
      <path d="M6 2v4M14 2v4M2 9h16" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 6v4l3 2" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" />
      <circle cx="10" cy="7" r="1.5" />
    </svg>
  );
}
