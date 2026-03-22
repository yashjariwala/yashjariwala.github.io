import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Lato, Noto_Serif_Devanagari } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Yash & Dhruvi - Wedding Invitation",
  description: "Join us in celebrating the wedding of Yash and Dhruvi on July 4th & 5th, 2026.",
};

export const themeColor = "#f9f5ed";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${cormorant.variable} ${lato.variable} ${notoDevanagari.variable} antialiased bg-background text-foreground font-sans relative min-h-screen paper-texture`}
      >
        <Script
          id="force-top-open"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
                  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
                  window.scrollTo(0, 0);
                  window.addEventListener("pageshow", function () {
                    window.scrollTo(0, 0);
                  });
                } catch (_) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
