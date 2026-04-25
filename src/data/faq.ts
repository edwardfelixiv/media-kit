export interface FAQEntry {
  question: string;
  answer: string;
}

export const faq: FAQEntry[] = [
  {
    question: "How is this different from hiring a video editor?",
    answer:
      "A video editor edits footage you've already produced. We produce the entire video from a brief — script, voice, visuals, captions, thumbnail — without you appearing on camera or recording anything. The pricing reflects that scope: a senior editor in the US runs $50–$100/hour and takes 6–10 hours per long-form video, before any of the upstream work (scripting, voice, b-roll, thumbnails). We deliver the full package, including the steps that exist before editing.",
  },
  {
    question: "What if I don't like the scripts?",
    answer:
      "You approve every script before any production happens. Revisions at the script stage are unlimited — it costs nothing to change words. Voice, video, and final cut are only rendered after you sign off. In practice this means 90%+ of revisions happen upstream where they're free, and near-zero happen after production.",
  },
  {
    question: "How long until I see results?",
    answer:
      "YouTube isn't a 30-day channel. Most clients see meaningful watch time and subscriber growth between months 3 and 6. The system is built for compounding, not virality. If you need leads next week, paid ads are a better fit — this is for businesses building a long-term content moat.",
  },
  {
    question: "Do I own the content?",
    answer:
      "Yes. You own all final deliverables outright on delivery — videos, Shorts, captions, metadata, thumbnails. No licensing, no platform lock-in, no clawback if you cancel.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Month-to-month, no long-term contracts. Cancel before your next billing cycle starts and you're done. We deliver any in-flight videos that have already moved past script approval; nothing is held hostage.",
  },
  {
    question: "Can you produce content in my industry?",
    answer:
      "If your business has expertise that converts to a watchable explanation, yes. The pipeline has been validated on home services, real estate, and professional services. Industries where regulatory compliance dominates (healthcare claims, legal advice, financial guidance) need additional review and may add cost — we're upfront about this on the intro call.",
  },
];
