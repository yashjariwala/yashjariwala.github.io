import { ReactNode } from "react";

export default function CardFrame({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`relative max-w-md mx-auto w-full group ${className}`}>
      {/* Intricate Indian Die-Cut Card using pure CSS/SVG masking */}
      {/* We use a specialized clip-path to create a cusped arch effect at the top and bottom */}
      <div 
        className="relative bg-white w-full h-full shadow-2xl transition-all duration-500 overflow-hidden"
        style={{
          clipPath: "polygon(50% 0%, 55% 2%, 60% 1%, 65% 4%, 70% 3%, 80% 8%, 95% 15%, 100% 25%, 100% 75%, 95% 85%, 80% 92%, 70% 97%, 65% 96%, 60% 99%, 55% 98%, 50% 100%, 45% 98%, 40% 99%, 35% 96%, 30% 97%, 20% 92%, 5% 85%, 0% 75%, 0% 25%, 5% 15%, 20% 8%, 30% 3%, 35% 4%, 40% 1%, 45% 2%)"
        }}
      >
        <div className="absolute inset-1 border-[2px] border-[#D4AF37]/40 pointer-events-none" 
             style={{
               clipPath: "polygon(50% 0%, 55% 2%, 60% 1%, 65% 4%, 70% 3%, 80% 8%, 95% 15%, 100% 25%, 100% 75%, 95% 85%, 80% 92%, 70% 97%, 65% 96%, 60% 99%, 55% 98%, 50% 100%, 45% 98%, 40% 99%, 35% 96%, 30% 97%, 20% 92%, 5% 85%, 0% 75%, 0% 25%, 5% 15%, 20% 8%, 30% 3%, 35% 4%, 40% 1%, 45% 2%)"
             }}
        />
        <div className="absolute inset-[10px] border border-[#D4AF37]/20 pointer-events-none" 
             style={{
               clipPath: "polygon(50% 0%, 55% 2%, 60% 1%, 65% 4%, 70% 3%, 80% 8%, 95% 15%, 100% 25%, 100% 75%, 95% 85%, 80% 92%, 70% 97%, 65% 96%, 60% 99%, 55% 98%, 50% 100%, 45% 98%, 40% 99%, 35% 96%, 30% 97%, 20% 92%, 5% 85%, 0% 75%, 0% 25%, 5% 15%, 20% 8%, 30% 3%, 35% 4%, 40% 1%, 45% 2%)"
             }}
        />

        <div className="relative z-10 p-8 pt-16 pb-12">
          {children}
        </div>
      </div>
    </div>
  );
}
