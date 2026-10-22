import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "https://my-irc.onrender.com",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
