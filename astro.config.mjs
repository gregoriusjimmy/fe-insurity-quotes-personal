// @ts-check
import { defineConfig } from 'astro/config';


import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site:"fe-insurity-quotes.netlify.app",
  integrations: [react(), tailwind()],
  prefetch:true,
});