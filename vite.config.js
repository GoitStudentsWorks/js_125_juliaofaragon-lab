import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/project_group2/',
  plugins: [injectHTML()],
  server: {
    port: 5173,
    open: false,
  },
}));
