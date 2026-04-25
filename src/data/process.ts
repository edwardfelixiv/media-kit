export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration: string;
}

export const process: ProcessStep[] = [
  {
    number: "01",
    title: "Onboarding",
    description:
      "60-minute call to lock in your niche, voice, target audience, and content goals. You give me one expert in your business to interview; I extract the content angles.",
    duration: "Day 1",
  },
  {
    number: "02",
    title: "Content Calendar",
    description:
      "I deliver a 30-day topic plan with hooks and outlines. You approve or redirect before any production starts.",
    duration: "Days 2–5",
  },
  {
    number: "03",
    title: "Script Approval",
    description:
      "For every video, you see the full script before we produce. Edits are unlimited at this stage — it costs nothing to change words.",
    duration: "Per video",
  },
  {
    number: "04",
    title: "Production",
    description:
      "The pipeline runs: Claude writes the long-form draft, ElevenLabs generates voiceover, InVideo AI assembles the visual, Make.com orchestrates handoffs and packages deliverables.",
    duration: "3–5 days per video",
  },
  {
    number: "05",
    title: "Delivery",
    description:
      "Final files arrive in your shared folder: video, thumbnail, captions, metadata, and Shorts cuts. Upload directly or hand to your social manager.",
    duration: "Ongoing",
  },
];
