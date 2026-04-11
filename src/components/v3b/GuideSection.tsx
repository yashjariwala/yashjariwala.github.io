"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { invitationData } from "@/lib/invitationData";

function TravelIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#D4AF37" strokeWidth="1.1">
      <path d="M2 15l4-8 3 4 4-6 3 5 3-3" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M1 19h20" strokeOpacity="0.4"/>
      <path d="M11 3v2M7 4l1 1M15 4l-1 1"/>
    </svg>
  );
}

function StayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#D4AF37" strokeWidth="1.1">
      <path d="M3 19V9l8-6 8 6v10" strokeLinejoin="round" strokeLinecap="round"/>
      <rect x="8" y="13" width="3" height="6" rx="0.5"/>
      <rect x="13" y="10" width="3" height="3" rx="0.5"/>
      <path d="M1 19h20" strokeOpacity="0.4"/>
    </svg>
  );
}

function BlessingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#D4AF37" strokeWidth="1.1">
      <path d="M11 18C11 18 3 13 3 7.5A4 4 0 0 1 11 5.5a4 4 0 0 1 8 2C19 13 11 18 11 18Z" strokeLinejoin="round"/>
      <path d="M11 5.5V3M8 4l1 1M14 4l-1 1" strokeLinecap="round"/>
    </svg>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.7, ease: EASE },
  }),
};

export default function GuideSection({ showStay = true }: { showStay?: boolean }) {
  const { travel, accommodation, gifts } = invitationData;

  return (
    <section
      id="guide"
      className="py-16 sm:py-20 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fef6e8 0%, #fffbf5 100%)" }}
    >
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      {/* Soft bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />

      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-5xl mx-auto">
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
            Everything You Need
          </p>
          <h2
            className="font-script text-[#4C1215] leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 12vw, 5.5rem)",
              textShadow: "0 0 40px rgba(212,175,55,0.15)",
            }}
          >
            Guest Guide
          </h2>
          <div className="flex items-center gap-2 w-36">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={`grid gap-5 sm:gap-6 ${showStay ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
        >
          <InfoCard title="Travel" icon={<TravelIcon />} idx={0}>
            <div className="space-y-2">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-2">
                Nearest Airports
              </p>
              {travel.airports.map((a) => (
                <p key={a.name} className="leading-snug text-[#4C1215]/70">
                  {a.name}
                  {a.note && (
                    <span className="text-[#F97316]/80 italic"> ({a.note})</span>
                  )}
                </p>
              ))}
              <div className="pt-2 border-t border-[#D4AF37]/15 mt-3">
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-1">
                  Nearest Station
                </p>
                <p className="text-[#4C1215]/70">{travel.nearestStation}</p>
              </div>
            </div>
          </InfoCard>

          {showStay && (
            <InfoCard title="Stay" icon={<StayIcon />} idx={1}>
              <div className="space-y-3">
                <p className="font-serif text-base text-[#D4AF37] italic mb-3">
                  {accommodation.hotel}
                </p>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-0.5">
                    Check-in
                  </p>
                  <p className="text-[#4C1215]/70">{accommodation.checkIn}</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-0.5">
                    Check-out
                  </p>
                  <p className="text-[#4C1215]/70">{accommodation.checkOut}</p>
                </div>
              </div>
            </InfoCard>
          )}

          <InfoCard title="Gifts" icon={<BlessingIcon />} idx={showStay ? 2 : 1} className={showStay ? "sm:col-span-2 lg:col-span-1" : ""}>
            <p className="leading-relaxed text-[#4C1215]/70">{gifts}</p>
          </InfoCard>
        </motion.div>
      </div>
    </section>
  );
}

function InfoCard({
  title,
  icon,
  idx,
  children,
  className = "",
}: {
  title: string;
  icon: ReactNode;
  idx: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      custom={idx}
      variants={cardVariants}
      className={`relative bg-[#fef9f2]/92 backdrop-blur-sm border border-[#D4AF37]/40 p-6 sm:p-7 overflow-hidden shadow-[0_8px_40px_rgba(212,175,55,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] ${className}`}
    >
      {/* Gold top accent */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      {/* Inner border */}
      <div className="absolute inset-[5px] border border-[#D4AF37]/15 pointer-events-none" />
      {/* Corner ornament */}
      <svg className="absolute bottom-2 right-2 opacity-20" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 15 L9 15 M15 15 L15 9" stroke="#D4AF37" strokeWidth="1"/><circle cx="15" cy="15" r="1" fill="#D4AF37"/></svg>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="flex-shrink-0">{icon}</span>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#4C1215] font-medium leading-tight">
              {title}
            </h3>
            <div className="w-8 h-[1px] bg-gradient-to-r from-[#D4AF37]/60 to-transparent mt-1" />
          </div>
        </div>
        <div className="font-sans text-xs sm:text-sm leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );
}
