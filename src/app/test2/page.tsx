import EnvelopeReveal from "@/components/v2/EnvelopeReveal";
import Hero from "@/components/v2/Hero";
import CountdownTimer from "@/components/v2/CountdownTimer";
import EventDetails from "@/components/v2/EventDetails";
import EventTimeline from "@/components/v2/EventTimeline";
import StoryTimeline from "@/components/v2/StoryTimeline";
import Gallery from "@/components/v2/Gallery";
import GuideSection from "@/components/v2/GuideSection";
import QuickNav from "@/components/v2/QuickNav";
import AudioPlayer from "@/components/v2/AudioPlayer";
import { invitationData } from "@/lib/invitationData";

export default function Test2Page() {
  return (
    <main className="min-h-screen bg-[#fdf5ec] text-[#4C1215] font-sans selection:bg-[#D4AF37]/30 selection:text-white pb-0">
      <AudioPlayer />
      <QuickNav />
      <EnvelopeReveal />
      <Hero />
      <CountdownTimer />
      <EventDetails />
      <EventTimeline />
      {/* <StoryTimeline /> */}
      {/* <Gallery /> */}
      <GuideSection />

      <footer className="bg-[#4C1215] text-white py-12 text-center">
        <p className="font-script text-5xl mb-2 text-[#D4AF37]">
          {invitationData.couple.bride} <span className="font-sans text-3xl font-light">&amp;</span> {invitationData.couple.groom}
        </p>
        <p className="font-sans text-[10px] tracking-widest uppercase text-white/50">Can&apos;t wait to celebrate with you</p>
      </footer>
    </main>
  );
}
