# Morning Walk ARG Quest PWA: Project Overview

## Purpose

Morning Walk ARG Quest is a temporary offline-first Progressive Web App for a university Morning Walk event. Students install the app on a mobile phone, complete a short campus adventure, and return to the event booth for a validation stamp.

The application is intentionally small and event-focused:

- No backend
- No authentication
- No database
- No network dependency after installation
- Local-only state through browser storage

## Event Scenario

1. A student arrives at the booth.
2. The student installs the PWA on a phone.
3. The student opens the installed app.
4. The student registers with name and course.
5. The app assigns a random story locally.
6. The student solves three riddle stages by scanning physical QR markers.
7. The student submits a reflection.
8. The app shows the completed screen.
9. The student returns to the booth for a stamp.

The expected play time is approximately 2-5 minutes.

## Target Users

| User | Need |
| --- | --- |
| Students | A fast, fun, mobile quest that is easy to understand during a live event. |
| Event organizers | A reliable booth flow with no backend operations during the event. |
| Future developers | Clear separation between UI, state, game logic, QR parsing, and PWA behavior. |
| Technical reviewers | Evidence that routing, QR validation, persistence, and offline behavior are handled locally. |

## Technology Stack

| Area | Implementation |
| --- | --- |
| UI | React, TypeScript, TailwindCSS, shadcn/ui-compatible components |
| Routing | TanStack Router file routes |
| State | Zustand with `persist` middleware |
| QR scanning | `@yudiel/react-qr-scanner` |
| PWA | `vite-plugin-pwa`, Workbox service worker generation |
| Build tool | Vite |
| Icons | `lucide-react`, Hugeicons in shadcn dialog close control |

## Main Features

- Mobile-only gameplay gate.
- Installed-PWA-only gameplay gate.
- Local registration with name and course.
- Random local story assignment from `src/data/quests.json`.
- Three-stage quest flow.
- Physical QR marker scanning.
- QR payload validation against `src/data/qrs.ts`.
- Per-player marker reuse prevention through `usedQRs`.
- Answer reveal based on assigned story and current stage, not QR contents.
- Reflection screen after story completion.
- Final completion screen instructing the student to return to the booth.
- Offline asset and route caching through the generated service worker.

## Important Constraint

QR codes do not contain answers. A QR code only identifies a reusable physical marker. The app derives the answer from:

```text
player session storyId + player session currentStage
```

This is what lets the same physical QR marker work for every story, every stage, and every student, while still preventing one student from reusing the same marker.
