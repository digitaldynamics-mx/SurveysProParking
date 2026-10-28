import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://surveys.proparking.mx',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: { port: 7171 },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
