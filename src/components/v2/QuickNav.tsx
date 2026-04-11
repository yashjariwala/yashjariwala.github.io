"use client";

import { useEffect, useState } from "react";

type NavItem = { label: string; href: string };

const allNavItems: NavItem[] = [
  { label: "Countdown", href: "#countdown" },
  { label: "Details", href: "#details" },
  { label: "Itinerary", href: "#timeline" },
  { label: "Guide", href: "#guide" },
];

export const navWithoutItinerary: NavItem[] = allNavItems.filter((i) => i.href !== "#timeline");

export default function QuickNav({ items = allNavItems }: { items?: NavItem[] }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const countdown = document.getElementById("countdown");
      if (countdown) {
        setVisible(countdown.getBoundingClientRect().top < window.innerHeight * 0.9);
      } else {
        setVisible(window.scrollY > window.innerHeight * 0.6);
      }
    };
    check(); // run on mount in case page reloads mid-scroll
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 z-40 pointer-events-none transition-[opacity,transform] duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-14px)",
        pointerEvents: visible ? "none" : "none",
      }}
    >
      <nav
        className="pointer-events-auto max-w-max mx-auto mt-4 px-3 sm:px-4 py-2 rounded-full border border-[#d7cfbe] bg-[#fdf5ec] shadow-[0_12px_30px_-20px_rgba(0,0,0,0.45)]"
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        <ul className="flex items-center gap-1 sm:gap-2 overflow-x-auto hide-scrollbar">
          {items.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block px-3 py-1.5 rounded-full text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[#5a5a5a] hover:text-white hover:bg-[#4C1215] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
