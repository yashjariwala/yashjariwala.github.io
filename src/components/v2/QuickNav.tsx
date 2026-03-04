"use client";

const navItems = [
  { label: "Countdown", href: "#countdown" },
  { label: "Details", href: "#details" },
  { label: "Itinerary", href: "#timeline" },
  { label: "Guide", href: "#guide" },
];

export default function QuickNav() {
  return (
    <div className="fixed top-0 inset-x-0 z-40 pointer-events-none">
      <nav className="pointer-events-auto max-w-max mx-auto mt-4 px-3 sm:px-4 py-2 rounded-full border border-[#d7cfbe] bg-[#fdf5ec] shadow-[0_12px_30px_-20px_rgba(0,0,0,0.45)]">
        <ul className="flex items-center gap-1 sm:gap-2 overflow-x-auto hide-scrollbar">
          {navItems.map((link) => (
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
