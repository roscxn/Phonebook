import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from env

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": process.env.SERVER,

      // "/api": "http://localhost:3000",
    },
  },
})