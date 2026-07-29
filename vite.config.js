import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // m4a isn't in Vite's default asset list; needed for the music reel
  assetsInclude: ['**/*.m4a'],
})
