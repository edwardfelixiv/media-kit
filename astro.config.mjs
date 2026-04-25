import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://escape-velocity-ai.com',
  build: {
    format: 'directory', // /media-kit/ instead of /media-kit.html
  },
  trailingSlash: 'never',
});
