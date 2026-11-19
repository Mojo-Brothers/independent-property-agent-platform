import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: false,
    },
  }),
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['@lucide/astro', 'lucide-astro'],
    },
  },
});
