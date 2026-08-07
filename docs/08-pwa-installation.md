# PWA Installation and Offline Behavior

## PWA Configuration

PWA setup lives in `vite.config.ts` through `vite-plugin-pwa`.

Key configuration:

```ts
VitePWA({
  registerType: "prompt",
  manifest: {
    name: "ARG Quest",
    short_name: "ARG Quest",
    start_url: "/",
    scope: "/",
    description: "Interactive campus adventure quest",
    theme_color: "#0891b2",
    background_color: "#f8fafc",
    display: "standalone",
    orientation: "portrait"
  },
  workbox: {
    navigateFallback: "/index.html",
    globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"]
  }
})
```

## Service Worker Registration

The app imports:

```ts
import "../src/lib/pwa";
```

from `src/main.tsx`.

`src/lib/pwa.ts` registers the generated service worker using the PWA plugin virtual module.

## Offline Behavior

The generated service worker precaches build assets matching:

```text
**/*.{js,css,html,ico,png,svg,json}
```

The app also configures runtime caching for:

| Resource | Strategy | Cache |
| --- | --- | --- |
| Google font stylesheet URLs | `CacheFirst` | `google-fonts` |
| Image files | `CacheFirst` | `arg-assets` |

Game data is bundled locally:

- stories are in `src/data/quests.json`
- QR markers are in `src/data/qrs.ts`
- session state persists locally through Zustand persist

No gameplay request requires a backend.

## Installation Requirement

Normal routed gameplay is only available when `isStandalone()` returns true.

`isStandalone()` checks:

- `window.matchMedia("(display-mode: standalone)").matches`
- iOS-style `navigator.standalone === true`

If standalone mode is false on a mobile device, the root route renders:

```text
InstallationRequired
```

This screen:

- explains that installation is required
- uses `usePWAInstall()` for Android/Chromium `beforeinstallprompt`
- shows an install button when `beforeinstallprompt` is available
- shows iOS Add to Home Screen guidance when `isIOS()` is true

## Mobile Camera Requirement

The root route checks `isMobileDevice()` before checking standalone mode.

If the device is not considered mobile, it renders:

```text
MobileRequired
```

This is because the live event flow depends on students scanning physical QR markers with a phone camera.

## Install Prompt Hook

`src/hooks/usePWAInstall.ts` listens for:

- `beforeinstallprompt`
- `appinstalled`

It exposes:

| Value | Meaning |
| --- | --- |
| `canInstall` | Whether a deferred install prompt is available. |
| `install()` | Calls the deferred prompt and returns whether the user accepted. |
| `installed` | Tracks the `appinstalled` browser event. |

## Important Operational Notes

- The app should be loaded once with network access before the event so assets and the service worker are installed.
- Students should launch from the installed app icon, not from a normal browser tab.
- QR scanning still requires browser camera permission.
- Camera APIs usually require a secure context, such as HTTPS or localhost.
