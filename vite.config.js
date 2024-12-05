import polyfillNode from 'rollup-plugin-polyfill-node';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), polyfillNode()],
  base: '/ai-atende-calendar/',
  global: 'globalThis',
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
    },
  },

})

