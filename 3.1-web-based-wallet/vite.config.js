import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills, commonjs} from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(), commonjs()],
  build: {
    rollupOptions: {
      external: ['ed25519-hd-key', '@solana/web3.js', 'tweetnacl'], // Mark it as an external dependency
    },
  },
})