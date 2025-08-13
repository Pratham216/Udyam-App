import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'test' section to configure Vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
  },
});