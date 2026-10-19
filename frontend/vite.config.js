import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Tindog',
        short_name: 'Tindog',
        description: 'Swipe, match and chat with other dog owners',
        start_url: '/',
        display: 'standalone',
        theme_color: '#D96C4D',
        background_color: '#EDE0D3',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api/, /^\/socket\.io/],
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: { usePolling: true },
    allowedHosts: ['localhost'],
    hmr: {
      host: 'localhost',
      protocol: 'wss',
      clientPort: 443,
    },
  },
})