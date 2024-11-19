import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(), commonjs()],
  build: {
    rollupOptions: {
      external: ['ed25519-hd-key', '@solana/web3.js'], // Mark it as an external dependency
    },
  },
})