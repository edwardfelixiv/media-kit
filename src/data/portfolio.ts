export interface PortfolioSample {
  client: string;
  industry: string;
  title: string;
  description: string;
  thumbnail: string;       // path under /thumbnails/
  watchUrl: string;        // YouTube or hosted URL
  label: "capability demonstration" | "case study";
  deliverables: string[];  // what we shipped for this sample
}

export const portfolio: PortfolioSample[] = [
  {
    client: "Ramirez Plumbing",
    industry: "Home services",
    title: "Why Your Water Heater Is Costing You $300/Year",
    description:
      "Educational long-form designed to convert search-intent traffic into local service calls. Shows how the system handles technical-but-accessible explainer content for blue-collar service businesses.",
    thumbnail: "/thumbnails/ramirez-plumbing.jpg",
    watchUrl: "https://example.com/ramirez-sample", // user replaces with real URL
    label: "capability demonstration",
    deliverables: [
      "1 long-form video (9 min)",
      "3 Shorts cuts (60 sec each)",
      "Custom thumbnail with A/B variant",
      "SRT captions + burn-in version",
      "Title, description, tags, timestamps",
    ],
  },
  {
    client: "Sarah Chen Realty",
    industry: "Residential real estate",
    title: "5 Things I'd Check Before Buying a Home in Austin",
    description:
      "Personal-brand-style content built around an agent persona. Demonstrates the system's range when the buyer wants face-of-business positioning without ever appearing on camera.",
    thumbnail: "/thumbnails/sarah-chen-realty.jpg",
    watchUrl: "https://example.com/sarah-chen-sample", // user replaces with real URL
    label: "capability demonstration",
    deliverables: [
      "1 long-form video (11 min)",
      "4 Shorts cuts repurposed for TikTok/Reels",
      "Persona-branded thumbnail",
      "Captions + chapter timestamps",
      "Local-SEO metadata package",
    ],
  },
];
