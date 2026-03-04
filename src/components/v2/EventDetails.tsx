"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/lib/invitationData";
import IndianCard from "./IndianCard";
import { FireEmbersOverlay, GlowingDustOverlay } from "./VideoEffects";
import { AmbientBackgroundEffects } from "./AmbientEffects";

export default function EventDetails() {
  return (
    <section id="details" className="py-24 px-4 bg-[#f4ebd9] text-[#4C1215] border-b border-[#e3dccf] relative overflow-hidden">
      <AmbientBackgroundEffects />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block">When &amp; Where</span>
          <h2 className="font-script text-6xl md:text-[6rem] mb-8 text-[#4C1215] leading-none">The Celebrations</h2>


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

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {invitationData.events.map((event, idx) => (
            <EventCard
              key={event.title}
              title={event.title}
              date={event.dateLabel}
              time={event.timeLabel}
              venue={event.venue}
              address={event.address}
              mapUrl={event.mapUrl}
              delay={0.2 + idx * 0.2}
            />
          ))}
        </div>

        {/* Embedded Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 w-full h-[300px] md:h-[450px] p-3 md:p-4 shadow-xl border-t-4 border-[#D4AF37]"
        >
          <iframe
            src="https://maps.google.com/maps?q=Marriott%20Hotel%20Navi%20Mumbai&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Event Location Map"
            className="w-full h-full grayscale-[25%] contrast-[1.1]"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}

function EventCard({
  title,
  date,
  time,
  venue,
  address,
  delay,
}: {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="w-full flex"
    >
      <IndianCard>
        <div className="flex flex-col items-center text-center w-full h-full justify-between">
          <div className="flex flex-col items-center w-full">
            {/* Elegant Video Portals */}
            {title === "Wedding Ceremony (Lagna)" ? (
              <div className="w-52 h-52 md:w-64 md:h-64 mb-6 mt-2 relative rounded-full overflow-hidden border-[3px] border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(76,18,21,0.4)] flex items-center justify-center bg-[#4C1215] group">
                <div className="absolute inset-0 w-full h-full">
                  {/* Base Image with Cinematic Pan */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear group-hover:scale-125"
                    style={{ backgroundImage: `url('/v2/wedding_pheras_realistic.png')` }}
                  />
                  {/* Subtle pulsing CSS fire overlay over the image */}
                  <FireEmbersOverlay />
                </div>
                {/* Inner gold shadow ring to blend the video border */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(212,175,55,0.6)] pointer-events-none z-10" />
              </div>
            ) : title === "Reception" ? (
              <div className="w-52 h-52 md:w-64 md:h-64 mb-6 mt-2 relative rounded-full overflow-hidden border-[3px] border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(76,18,21,0.4)] flex items-center justify-center bg-[#4C1215] group">
                <div className="absolute inset-0 w-full h-full">
                  {/* Base Image with Cinematic Pan */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear group-hover:scale-125"
                    style={{ backgroundImage: `url('/v2/reception_sofa_realistic.png')` }}
                  />
                  {/* Subtle elegant stardust overlay over the image */}
                  <GlowingDustOverlay />
                </div>
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(212,175,55,0.6)] pointer-events-none z-10" />
              </div>
            ) : (
              <div className="text-[#D4AF37] opacity-80 z-10 mb-4 transition-transform duration-500 hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                </svg>
              </div>
            )}

            <h3 className="font-serif text-2xl md:text-3xl text-[#4C1215] mb-3 leading-tight font-semibold relative z-10 w-full px-2">
              {title}
            </h3>

            {/* Ornate Indian Divider */}
            <div className="flex items-center gap-2 mb-8 relative z-10 w-full justify-center">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] opacity-50" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </div>

          <div className="space-y-6 w-full flex-grow flex flex-col items-center justify-center relative z-10">
            <div className="flex flex-col items-center gap-1 w-full relative">
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 opacity-20 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              </div>
              <p className="font-sans tracking-[0.25em] text-[9px] md:text-[10px] uppercase text-[#D4AF37] font-bold mb-0.5">Date</p>
              <p className="font-serif text-lg md:text-xl text-[#4C1215] italic">{date}</p>
            </div>

            <div className="flex flex-col items-center gap-1 w-full relative">
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 opacity-20 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              </div>
              <p className="font-sans tracking-[0.25em] text-[9px] md:text-[10px] uppercase text-[#D4AF37] font-bold mb-0.5">Time</p>
              <p className="font-serif text-lg md:text-xl text-[#4C1215] italic">{time}</p>
            </div>

            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mt-2 mb-1" />

            <div className="flex flex-col items-center gap-1 pb-2">
              <p className="font-sans tracking-[0.25em] text-[9px] md:text-[10px] uppercase text-[#D4AF37] font-bold mb-0.5">Venue</p>
              <p className="font-serif text-xl md:text-2xl text-[#4C1215] mt-1">{venue}</p>
              <p className="font-sans text-[9px] md:text-[10px] text-[#8a8a8a] mt-2 tracking-widest uppercase">{address}</p>
            </div>
          </div>
        </div>
      </IndianCard>
    </motion.div>
  );
}
