import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { VitePWA } from "vite-plugin-pwa";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    VitePWA({
      registerType: "prompt",

      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],

      manifest: {
        name: "ARG Quest",
        short_name: "ARG Quest",
        start_url: "/",
        scope: "/",
        description: "Interactive campus adventure quest",

        theme_color: "#0891b2",

        background_color: "#f8fafc",

        display: "standalone",

        orientation: "portrait",

        icons: [
          {
            src: "/appstore-images/android/launchericon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "/appstore-images/android/launchericon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },

          {
            src: "/appstore-images/android/launchericon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",

        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,

            handler: "CacheFirst",

            options: {
              cacheName: "google-fonts",

              expiration: {
                maxEntries: 10,

                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },

          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,

            handler: "CacheFirst",

            options: {
              cacheName: "arg-assets",

              expiration: {
                maxEntries: 100,
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: true,
      },
    }),
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
