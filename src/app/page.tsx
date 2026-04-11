import type { Metadata } from "next";
import EnvelopeReveal from "@/components/v2/EnvelopeReveal";
import AudioPlayer from "@/components/v2/AudioPlayer";
import QuickNav, { navWithoutItinerary } from "@/components/v2/QuickNav";
import Hero from "@/components/v3b/Hero";
import CountdownTimer from "@/components/v3b/CountdownTimer";
import EventDetails from "@/components/v3b/EventDetails";
import GuideSection from "@/components/v3b/GuideSection";
import GlobalPetals from "@/components/v3b/GlobalPetals";
import WithLoveFrom from "@/components/v3b/WithLoveFrom";
import { invitationData } from "@/lib/invitationData";

export const metadata: Metadata = {
  title: "Yash & Dhruvi - Reception Invitation",
  description: "Join us in celebrating the reception of Yash and Dhruvi on July 5th, 2026.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yash & Dhruvi - Reception Invitation",
    description: "Join us in celebrating the reception of Yash and Dhruvi on July 5th, 2026.",
    url: "/",
  },
  twitter: {
    title: "Yash & Dhruvi - Reception Invitation",
    description: "Join us in celebrating the reception of Yash and Dhruvi on July 5th, 2026.",
  },
};

export default function Home() {
  const receptionEvent = [invitationData.events[1]];

  return (
    <main className="min-h-screen bg-[#fffbf5] text-[#4C1215] font-sans selection:bg-[#D4AF37]/30 selection:text-[#4C1215] pb-0 [overflow-x:clip]">
      <GlobalPetals />
      <AudioPlayer />
      <QuickNav items={navWithoutItinerary} />
      <EnvelopeReveal />
      <Hero dateDisplay={invitationData.receptionDateDisplay} />
      <CountdownTimer
        targetDateIso={invitationData.receptionDateIso}
        dateLabel={invitationData.receptionDateLabel}
      />
      <EventDetails events={receptionEvent} />
      <GuideSection showStay={false} />
      <WithLoveFrom />

      <footer className="bg-[#2d0607] text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.18), transparent 65%)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)", backgroundSize: "28px 28px" }} />

        <div className="flex items-center justify-center gap-4 mb-8 relative z-10">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
            <path d="M14 1L17 7L14 13L11 7L14 1Z" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
            <circle cx="14" cy="7" r="2" fill="#D4AF37" fillOpacity="0.6" />
            <path d="M0 7H9M19 7H28" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.5" />
          </svg>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>

        <p className="font-script text-5xl sm:text-7xl mb-3 text-[#D4AF37] relative z-10" style={{ textShadow: "0 0 40px rgba(212,175,55,0.3)" }}>
          {invitationData.couple.groom}{" "}
          <span className="font-sans text-2xl font-light text-[#D4AF37]/50">&amp;</span>{" "}
          {invitationData.couple.bride}
        </p>

        <p className="font-serif text-sm text-[#D4AF37]/60 italic mb-6 relative z-10">
          {invitationData.receptionDateDisplay}
        </p>

        <div className="flex items-center justify-center gap-3 mb-6 relative z-10">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
          <div className="w-1 h-1 rotate-45 bg-[#D4AF37]/50" />
          <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
        </div>

        <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-white/25 relative z-10">
          Can&apos;t wait to celebrate with you
        </p>
      </footer>
    </main>
  );
}
