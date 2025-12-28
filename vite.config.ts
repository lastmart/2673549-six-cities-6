/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, './src/components'),
      'pages': path.resolve(__dirname, './src/pages'),
      'lib': path.resolve(__dirname, './src/lib'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'types': path.resolve(__dirname, './src/types'),
      'mocks': path.resolve(__dirname, './src/mocks'),
      'store': path.resolve(__dirname, './src/store'),
      'services': path.resolve(__dirname, './src/services'),
      'browser-history': path.resolve(__dirname, './src/browser-history'),
      '@constants': path.resolve(__dirname, './src/constants'),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
