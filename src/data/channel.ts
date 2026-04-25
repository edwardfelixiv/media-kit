// Channel section visibility is stats-driven:
// - All zero        → section hidden (pre-launch state, default)
// - Any value > 0   → section visible
// Update these values after launching the channel; redeploy regenerates the PDF
// so the printed/downloadable kit reflects current numbers.

export interface ChannelStats {
  subscribers: number;
  videosPublished: number;
  totalViews: number;
}

export interface ChannelConfig {
  handle: string;          // e.g., "@escapevelocityai"
  channelUrl: string;
  stats: ChannelStats;     // always present; all zero pre-launch
}

export const channel: ChannelConfig = {
  handle: "@escapevelocityai",                          // user replaces with real handle
  channelUrl: "https://youtube.com/@escapevelocityai",  // user replaces with real URL
  stats: {
    subscribers: 0,
    videosPublished: 0,
    totalViews: 0,
  },
};
