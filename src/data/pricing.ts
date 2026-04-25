export interface PricingTier {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

export const pricing: PricingTier[] = [
  {
    name: "Starter",
    price: "$750",
    cadence: "/month",
    tagline: "For businesses validating YouTube as a channel.",
    features: [
      "4 long-form videos per month (8–12 min each)",
      "8 Shorts per month",
      "Captions, metadata, and thumbnails included",
      "Monthly content calendar",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$1,500",
    cadence: "/month",
    tagline: "For businesses ready to compound on YouTube.",
    highlighted: true,
    features: [
      "8 long-form videos per month",
      "16 Shorts per month",
      "Captions, metadata, and thumbnails included",
      "Monthly content calendar + topic research",
      "Async messaging support",
      "Performance review every 30 days",
    ],
  },
  {
    name: "Premium",
    price: "$2,000–$2,500",
    cadence: "/month",
    tagline: "For businesses scaling content as a primary growth lever.",
    features: [
      "12 long-form videos per month",
      "24 Shorts per month",
      "Captions, metadata, and thumbnails included",
      "Monthly content calendar + topic research + competitive analysis",
      "Custom intro/outro branding",
      "Priority support + monthly strategy call",
      "Performance review every 30 days",
      "Cross-platform publishing assist (TikTok, Instagram Reels)",
    ],
  },
];
