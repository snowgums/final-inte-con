import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
/* in src/index.css or src/main.css */

export default defineConfig({
  plugins: [react()],
})
