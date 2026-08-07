# Folder Structure

## Top-Level Files

| Path | Responsibility |
| --- | --- |
| `package.json` | Scripts, dependencies, and project metadata. |
| `vite.config.ts` | Vite, TanStack Router plugin, Tailwind plugin, React plugin, PWA configuration, and `@` alias. |
| `tsconfig*.json` | TypeScript project configuration. |
| `components.json` | shadcn/ui component configuration. |
| `index.html` | Vite HTML entry. |
| `public/` | Static assets copied into the build, including app icons and `pcs-logo.png`. |

## `src/`

Main application source.

| Folder/File | Responsibility |
| --- | --- |
| `src/main.tsx` | Creates the TanStack router and mounts React. |
| `src/index.css` | Tailwind imports, font setup, theme variables, and custom animation keyframes. |
| `src/routeTree.gen.ts` | Generated TanStack Router route tree. |

## `src/routes/`

File-based TanStack Router routes.

| File | Route | Responsibility |
| --- | --- | --- |
| `__root.tsx` | Root layout | Blocks non-mobile and non-installed access, renders route outlet and global dialog. |
| `index.tsx` | `/` | Redirects to the current phase route. |
| `register.tsx` | `/register` | Registration form and session start. |
| `quest.tsx` | `/quest` | Active riddle, progress, QR scan modal, answer reveal, answer submission. |
| `finish.tsx` | `/finish` | Full story reveal and reflection input. |
| `completed.tsx` | `/completed` | Final event completion screen. |

## `src/components/`

Reusable UI components.

| Folder | Responsibility |
| --- | --- |
| `src/components/custom/` | App-specific components such as scanner modal, riddle card, progress card, install screen, mobile-required screen, and global dialog. |
| `src/components/ui/` | shadcn/ui-compatible primitives such as `button` and `dialog`. |

Important custom components:

- `QRScanner.tsx`: camera scanner wrapper.
- `ScannerPanel.tsx`: scanner modal and scanner state UI.
- `GameDialog.tsx`: global dialog renderer.
- `InstallationRequired.tsx`: install prompt and iOS installation guidance.
- `MobileRequired.tsx`: desktop/non-mobile blocking screen.
- `RiddleCard.tsx`, `ProgressCard.tsx`, `AnwerInput.tsx`: quest UI pieces.

## `src/stores/`

Zustand stores and selectors.

| File | Responsibility |
| --- | --- |
| `session.store.ts` | Persisted player session and game actions. |
| `session.selectors.ts` | Small convenience selectors for session, current stage, and phase. |
| `ui.store.ts` | Global dialog state. |

## `src/lib/`

Domain and platform utilities.

| File | Responsibility |
| --- | --- |
| `game.ts` | Current story/quest/answer helpers, answer validation, marker reuse checking, progress. |
| `qr.ts` | QR JSON parsing and marker/game validation. |
| `story.ts` | Story list, story lookup, random story selection. |
| `router-guard.ts` | Route protection and phase redirects. |
| `pwa.ts` | Service worker registration through `virtual:pwa-register`. |
| `pwaDetection.ts` | Standalone, iOS, and mobile detection helpers. |
| `dialog.ts` | Helper around the UI dialog store. |
| `env.ts` | Environment helper file. |
| `utils.ts` | Shared class name utility used by UI primitives. |

## `src/data/`

Static event content.

| File | Responsibility |
| --- | --- |
| `quests.json` | Story titles, riddles, answers, and final story text. |
| `qrs.ts` | Valid physical QR marker IDs and game code. |

## `src/types/`

Shared TypeScript types.

| File | Responsibility |
| --- | --- |
| `session.ts` | `PlayerSession`. |
| `game.ts` | `GamePhase` and answer validation result. |
| `qr.ts` | `QRPayload` and `QRScanResult`. |
| `story.ts` | `Quest`, `Story`, and story database types. |
| `ui.ts` | Dialog payload and variants. |
