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

      {/* Venue card */}
      <div className="px-4 py-16 sm:py-20" style={{ background: "linear-gradient(180deg, #1a0808 0%, #2d0f0a 100%)" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-xl mx-auto"
        >
          <div className="relative border border-[#D4AF37]/30 p-10 sm:p-14 text-center overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {/* Gold top accent */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            {/* Inner border */}
            <div className="absolute inset-[7px] border border-[#D4AF37]/15 pointer-events-none" />
            {/* Corner ornaments */}
            <svg className="absolute top-3 left-3 opacity-40" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 1 L8 1 M1 1 L1 8" stroke="#D4AF37" strokeWidth="1.2"/><circle cx="1" cy="1" r="1" fill="#D4AF37"/></svg>
            <svg className="absolute top-3 right-3 opacity-40" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M17 1 L10 1 M17 1 L17 8" stroke="#D4AF37" strokeWidth="1.2"/><circle cx="17" cy="1" r="1" fill="#D4AF37"/></svg>
            <svg className="absolute bottom-3 left-3 opacity-40" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 17 L8 17 M1 17 L1 10" stroke="#D4AF37" strokeWidth="1.2"/><circle cx="1" cy="17" r="1" fill="#D4AF37"/></svg>
            <svg className="absolute bottom-3 right-3 opacity-40" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M17 17 L10 17 M17 17 L17 10" stroke="#D4AF37" strokeWidth="1.2"/><circle cx="17" cy="17" r="1" fill="#D4AF37"/></svg>

            <div className="relative z-10 flex flex-col items-center gap-5">
              <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                <path d="M14 1L17 7L14 13L11 7L14 1Z" stroke="#D4AF37" strokeWidth="0.8" fill="none"/>
                <circle cx="14" cy="7" r="2" fill="#D4AF37" fillOpacity="0.6"/>
                <path d="M0 7H9M19 7H28" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.5"/>
              </svg>

              <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-[#D4AF37]/70">Venue</p>

              <h3
                className="font-script text-[#D4AF37] leading-none"
                style={{ fontSize: "clamp(2.8rem, 9vw, 4.5rem)", textShadow: "0 0 30px rgba(212,175,55,0.4)" }}
              >
                {invitationData.events[0].venue}
              </h3>

              <p className="font-serif italic text-white/50 text-sm sm:text-base">
                {invitationData.events[0].address}
              </p>

              <div className="flex items-center gap-2 w-28">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
                <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/60" />
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
              </div>

              <a
                href={invitationData.events[0].mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-[#D4AF37]/50 px-7 py-2.5 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] hover:bg-[#D4AF37]/10 transition-colors"
              >
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                  <path d="M5 1C2.79 1 1 2.79 1 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4z" stroke="#D4AF37" strokeWidth="1" fill="none"/>
                  <circle cx="5" cy="5" r="1.4" fill="#D4AF37"/>
                </svg>
                Get Directions
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="mt-5 overflow-hidden border border-[#D4AF37]/20 shadow-[0_8px_40px_rgba(0,0,0,0.4)] bg-white">
            <iframe
              src="https://maps.google.com/maps?q=Marriott+Hotel+Navi+Mumbai&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="260"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Marriott Hotel Navi Mumbai"
            />
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
          backgroundImage: `url('${isWedding ? "/v2/wedding.png" : "/v2/reception.png"}')`,
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
          className="grid grid-cols-2 gap-3 sm:gap-6 pt-5 border-t border-[#D4AF37]/25"
        >
          <InfoBlock icon={<CalIcon />} label="Date" value={event.dateLabel} />
          <InfoBlock icon={<ClockIcon />} label="Time" value={event.timeLabel} />
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
