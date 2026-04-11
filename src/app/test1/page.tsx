import EnvelopeReveal from "@/components/EnvelopeReveal";
import Hero from "@/components/Hero";
import CountdownTimer from "@/components/CountdownTimer";
import EventDetails from "@/components/EventDetails";
import EventTimeline from "@/components/EventTimeline";
import StoryTimeline from "@/components/StoryTimeline";
import Gallery from "@/components/Gallery";
import GuideSection from "@/components/GuideSection";
import QuickNav from "@/components/QuickNav";
import AudioPlayer from "@/components/AudioPlayer";
import { invitationData } from "@/lib/invitationData";

export default function Test1Page() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#2D3A3A] font-sans selection:bg-[#C5A46D]/30 selection:text-white pb-0">
      <AudioPlayer />
      <QuickNav />
      <EnvelopeReveal />
      <Hero />
      <CountdownTimer />
      <EventDetails />
      <EventTimeline />
      <StoryTimeline />
      <Gallery />
      <GuideSection />

      <footer className="bg-[#2D3A3A] text-white py-12 text-center">
        <p className="font-script text-5xl mb-2 text-[#C5A46D]">
          {invitationData.couple.bride} <span className="font-sans text-3xl font-light">&amp;</span> {invitationData.couple.groom}
        </p>
        <p className="font-sans text-[10px] tracking-widest uppercase text-white/50">Can&apos;t wait to celebrate with you</p>
      </footer>
    </main>
  );
}
