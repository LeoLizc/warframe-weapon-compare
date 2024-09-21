import preactPlugin from '@preact/preset-vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/warframe-weapon-compare/',
  plugins: [preactPlugin()],
});
