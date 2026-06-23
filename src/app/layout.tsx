import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Lato, Noto_Serif_Devanagari, Pinyon_Script } from "next/font/google";
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

const pinyonScript = Pinyon_Script({
  weight: "400",
  variable: "--font-pinyon",
  subsets: ["latin"],
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Yash with Dhruvi - Wedding Invitation",
  description: "Join us in celebrating the wedding of Yash with Dhruvi on July 4th & 5th, 2026.",
  metadataBase: new URL("https://yashjariwala.github.io"),
  openGraph: {
    title: "Yash with Dhruvi - Wedding Invitation",
    description: "Join us in celebrating the wedding of Yash with Dhruvi on July 4th & 5th, 2026.",
    images: [{ url: "/v2/wedding.png", width: 1200, height: 630, alt: "Yash with Dhruvi Wedding" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash with Dhruvi - Wedding Invitation",
    description: "Join us in celebrating the wedding of Yash with Dhruvi on July 4th & 5th, 2026.",
    images: ["/v2/wedding.png"],
  },
};

export const themeColor = "#f9f5ed";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Yash with Dhruvi - Wedding Invitation" />
        <meta property="og:description" content="Join us in celebrating the wedding of Yash and Dhruvi on July 4th &amp; 5th, 2026." />
        <meta property="og:image" content="https://yashjariwala.github.io/v2/wedding.png" />
        <meta property="og:image:width" content="1377" />
        <meta property="og:image:height" content="768" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yash with Dhruvi - Wedding Invitation" />
        <meta name="twitter:image" content="https://yashjariwala.github.io/v2/wedding.png" />
      </head>
      <body
        className={`${greatVibes.variable} ${cormorant.variable} ${lato.variable} ${notoDevanagari.variable} ${pinyonScript.variable} antialiased bg-background text-foreground font-sans relative min-h-screen paper-texture`}
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
