export type EventInfo = {
  title: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  address: string;
  mapUrl: string;
};

export type FamilyStayFormConfig = {
  appsScriptUrl: string;
  acceptedMimeTypes: readonly string[];
  maxUploadMb: number;
};

export const invitationData = {
  couple: {
    bride: "Dhruvi",
    groom: "Yash",
    shortMonogram: "Y & D",
    date: "July 4th & 5th, 2026",
    time: "10:30 AM",
  },
  brideFamily: {
    fatherName: "Mansukh Manani",
    motherName: "Tina Manani",
    surname: "Manani",
  },
  groomFamily: {
    fatherName: "Ashish Jariwala",
    motherName: "Rupa Jariwala",
    surname: "Jariwala",
  },
  withLoveFrom: [
    { name: "Ankita", relation: "Chachi" },
    { name: "Amit Jariwala", relation: "Chachu" },
  ],
  weddingDateIso: "2026-07-04T16:30:00+05:30",
  weddingDateLabel: "Saturday, July 4, 2026",
  receptionDateIso: "2026-07-05T19:00:00+05:30",
  receptionDateLabel: "Sunday, July 5, 2026",
  receptionDateDisplay: "July 5th, 2026",
  invocation: "॥ श्री गणेशाय नमः ॥",
  heroSubtitle: "With the blessings of the Almighty, Mr. Mansukh Manani & Mrs. Tina Manani joyfully invite you to the wedding of their beloved daughter",
  cityLabel: "Marriot Hotel, Navi Mumbai",
  events: [
    {
      title: "Wedding Ceremony",
      dateLabel: "Saturday, July 4, 2026",
      timeLabel: "4:30 PM onwards",
      venue: "Marriott Hotel",
      address: "Navi Mumbai, Maharashtra, India",
      mapUrl: "https://www.google.com/maps/search/Marriott+Hotel+Navi+Mumbai/@19.0433,73.0297,15z",
    },
    {
      title: "Reception",
      dateLabel: "Sunday, July 5, 2026",
      timeLabel: "7:00 PM onwards",
      venue: "Marriott Hotel",
      address: "Navi Mumbai, Maharashtra, India",
      mapUrl: "https://www.google.com/maps/search/Marriott+Hotel+Navi+Mumbai/@19.0433,73.0297,15z",
    },
  ] as EventInfo[],
  timelineDays: [
    {
      date: "Saturday, July 4",
      events: [
        { time: "1:00 PM", title: "Check-in", description: "Settle in and relax." },
        { time: "3:00 PM", title: "High Tea", description: "Enjoy light refreshments before the festivities begin." },
        { time: "4:30 PM", title: "Wedding Ceremony", description: "The beautiful wedding ceremony of Yash & Dhruvi, followed by dinner." },
      ],
    },
    {
      date: "Sunday, July 5",
      events: [
        { time: "7:30 AM - 10:30 AM", title: "Breakfast", description: "Enjoy a relaxed morning breakfast." },
        { time: "1:00 PM - 3:00 PM", title: "Lunch", description: "Join us for a delightful afternoon lunch." },
        { time: "4:30 PM", title: "High Tea", description: "Enjoy light refreshments." },
        { time: "7:00 PM", title: "Reception & Dinner", description: "An evening of celebration, dancing, and a grand feast." },
      ],
    },
    {
      date: "Monday, July 6",
      events: [
        { time: "7:30 AM - 10:00 AM", title: "Breakfast", description: "Enjoy a relaxed morning breakfast." },
        { time: "12:00 PM", title: "Check-out", description: "Bid farewell with beautiful memories." },
      ],
    },
  ],
  storyMoments: [
    {
      title: "How They Met",
      text: "Their paths first crossed in 2018 while studying together in engineering college.",
      year: "2018",
    },
    {
      title: "Falling in Love",
      text: "After years of friendship, Yash & Dhruvi officially started dating and building a beautiful life together.",
      year: "2022",
    },
    {
      title: "The Proposal",
      text: "A magical moment as they got engaged and decided to spend the rest of their lives by each other's side.",
      year: "Dec 2025",
    },
    {
      title: "Forever Begins",
      text: "They are finally tying the knot and we can't wait to celebrate this joyous occasion with all of you.",
      year: "July 2026",
    },
  ],
  travel: {
    airports: [
      { name: "Navi Mumbai International Airport (NMIA)", note: "Closer" },
      { name: "Chhatrapati Shivaji Maharaj International Airport (BOM)", note: "" },
    ],
    nearestStation: "Turbhe Railway Station",
  },
  accommodation: {
    hotel: "Marriott Hotel",
    checkIn: "July 4th, 2026 (After 1:00 PM)",
    checkOut: "July 6th, 2026 (12:00 PM Morning)",
  },
  familyStayForm: {
    appsScriptUrl: "https://script.google.com/macros/s/AKfycbyUlkCfWgmk5LodyoxXJZuwRVivQcnDfYIjkQj7uwLosQYch5FkSAxh0I8qzJtmMkY2pg/exec",
    acceptedMimeTypes: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ],
    maxUploadMb: 10,
  } as FamilyStayFormConfig,
  gifts: "Please, no gifts. Your presence at their wedding and your loving blessings are the greatest gifts the family could ask for.",
  faqs: [
    {
      q: "Are kids welcome?",
      a: "Yes, we would love to celebrate with your little ones. Please let us know if they need any special accommodations.",
    },
    {
      q: "What time should I arrive?",
      a: "We recommend arriving 30 minutes prior to the start of the ceremonies so you can comfortably find a seat.",
    },
  ],
} as const;
