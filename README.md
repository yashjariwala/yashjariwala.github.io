# Yash Jariwala · Portfolio

Static site, no build step. `index.html` is the interactive phone, `cv.html` is the plain recruiter view.

## Edit content
All text lives in the `ME = {...}` block and `PAGES` in `index.html`. `cv.html` is separate plain HTML, so update both.

## Preview locally
```bash
python3 -m http.server 4322 --bind 127.0.0.1
```
Then open http://localhost:4322

## Go live (pick one, all free)
- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages:** push to a repo → Settings → Pages → deploy from `main` / root
- **Vercel:** `npx vercel` in this folder

## After it's live
1. **Domain:** buy one (e.g. `yashjariwala.dev`) and connect it in the host's settings.
2. **Share preview:** in `index.html`, change `og:image` to the absolute URL (`https://yourdomain/og.jpg`) and set `ME.site` to your domain (used by the QR code and contact card).
3. **Visit counter:** sign up at https://www.goatcounter.com (free, no cookies), then set `ME.goatcounter` to your code.
4. **Check the preview:** paste your link into https://www.linkedin.com/post-inspector/

## Regenerate resume.pdf
`resume.pdf` is rendered from `cv.html` in the site's theme (the `?pdf` styles). After editing `cv.html`:
```bash
python3 -m http.server 4323 --bind 127.0.0.1 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=4000 --print-to-pdf=resume.pdf "http://127.0.0.1:4323/resume-src.html"
```
