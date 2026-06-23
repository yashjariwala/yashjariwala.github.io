/**
 * Postbuild script: Injects page-specific OG meta tags into the static HTML.
 *
 * Next.js 16 + Turbopack static export renders metadata inside JS <script>
 * payloads instead of raw <meta> tags in <head>. Social crawlers (WhatsApp,
 * Telegram, etc.) don't execute JS, so they never see the OG tags.
 *
 * This script reads each HTML file in `out/` and injects the correct raw
 * <meta> tags right after the opening <head> tag.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://yashjariwala.github.io";

// Per-page OG metadata
const pages = [
  {
    file: "out/index.html",
    title: "Yash with Dhruvi - Reception Invitation",
    description:
      "Join us in celebrating the reception of Yash with Dhruvi on July 5th, 2026.",
    image: `${BASE_URL}/v2/reception.png`,
  },
  {
    file: "out/wedding-reception.html",
    title: "Yash with Dhruvi - Wedding & Reception Invitation",
    description:
      "Join us in celebrating the wedding and reception of Yash with Dhruvi on July 4th & 5th, 2026.",
    image: `${BASE_URL}/v2/wedding.png`,
  },
  {
    file: "out/family-stay.html",
    title: "Yash with Dhruvi - Family Stay Invitation",
    description:
      "Join us for the wedding celebrations and family stay of Yash with Dhruvi on July 4th & 5th, 2026.",
    image: `${BASE_URL}/v2/wedding.png`,
  },
];

for (const page of pages) {
  const filePath = resolve(page.file);
  if (!existsSync(filePath)) {
    console.warn(`⚠ Skipping ${page.file} — file not found`);
    continue;
  }

  let html = readFileSync(filePath, "utf-8");

  const metaTags = [
    `<meta property="og:title" content="${page.title}" />`,
    `<meta property="og:description" content="${page.description}" />`,
    `<meta property="og:image" content="${page.image}" />`,
    `<meta property="og:image:width" content="1377" />`,
    `<meta property="og:image:height" content="768" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${page.title}" />`,
    `<meta name="twitter:image" content="${page.image}" />`,
  ].join("\n");

  // Inject right after <head> (or after <head><meta charset...>)
  html = html.replace("<head>", `<head>\n${metaTags}`);

  writeFileSync(filePath, html, "utf-8");
  console.log(`✅ Injected OG meta into ${page.file}`);
}

console.log("\nDone! All OG meta tags injected.");
