# Wedding Invitation (Next.js)

A premium single-page wedding invitation website built with Next.js, Tailwind CSS, and Framer Motion.

## Stack

- Next.js 16
- React 19
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project structure

- `src/app/page.tsx`: Main page composition
- `src/lib/invitationData.ts`: Central content/configuration for names, dates, events, FAQs, etc.
- `src/components/EnvelopeReveal.tsx`: Cinematic invitation opening animation
- `src/components/Hero.tsx`: Hero section with names/date/CTAs
- `src/components/CountdownTimer.tsx`: Live countdown
- `src/components/EventDetails.tsx`: Wedding + reception cards
- `src/components/StoryTimeline.tsx`: Story timeline section
- `src/components/Gallery.tsx`: Horizontal gallery
- `src/components/GuideSection.tsx`: Travel, dress code, gifts, FAQs
- `src/components/RSVPForm.tsx`: RSVP UI with localStorage fallback
- `src/components/QuickNav.tsx`: Sticky top section navigation

## Customize content

Update `src/lib/invitationData.ts` to change:

- Couple names
- Wedding date/time and RSVP deadline
- Event schedule and locations
- Story moments
- Travel, dress code, gifts, and FAQs

## Notes

- RSVP currently stores submissions in browser `localStorage` (`invite-rsvp`) for demo behavior.
- For production guest management, replace this with a real backend/API.

## Family Stay Hotel Form

The `/family-stay` page now includes a hotel check-in form that can:

- collect first name and last name
- upload a masked Aadhaar copy
- send the submission to Google Apps Script
- save the file into Google Drive
- append the guest row and Drive link into Google Sheets

To enable it:

1. Create a Google Sheet and a Drive folder.
2. Create a Google Apps Script project and paste in [google-apps-script/family-stay-intake.gs](/Users/yashjariwala/Documents/GitHub/invite/google-apps-script/family-stay-intake.gs).
3. Replace `SHEET_ID` and `DRIVE_FOLDER_ID` in that script.
4. Deploy the script as a web app with access for anyone who has the link.
5. Paste the deployed web app URL into `invitationData.familyStayForm.appsScriptUrl` in [src/lib/invitationData.ts](/Users/yashjariwala/Documents/GitHub/invite/src/lib/invitationData.ts).
6. Rebuild and push the site.
