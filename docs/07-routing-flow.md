# Routing Flow

## Router

The app uses TanStack Router with file-based routes.

Router setup:

```text
src/main.tsx
```

Generated route tree:

```text
src/routeTree.gen.ts
```

Vite plugin configuration:

```ts
tanstackRouter({
  target: "react",
  autoCodeSplitting: true,
})
```

## Available Routes

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `src/routes/index.tsx` | Redirects to the current session phase route. |
| `/register` | `src/routes/register.tsx` | Student registration and session creation. |
| `/quest` | `src/routes/quest.tsx` | Active quest gameplay. |
| `/finish` | `src/routes/finish.tsx` | Full story reveal and reflection. |
| `/completed` | `src/routes/completed.tsx` | Final completion screen. |

## Root Gate

The root route (`src/routes/__root.tsx`) blocks gameplay before child routes render.

Current order:

1. If `!isMobileDevice()`, render `MobileRequired`.
2. Else if `!isStandalone()`, render `InstallationRequired`.
3. Else render route outlet and `GameDialog`.

This means:

- desktop browser access shows the mobile-required screen
- mobile browser access shows the install-required screen
- installed mobile PWA access can enter the routed app

## Route Guards

Route guards live in:

```text
src/lib/router-guard.ts
```

The mapping from phase to route is:

| Phase | Route |
| --- | --- |
| `registration` | `/register` |
| `quest` | `/quest` |
| `finish` | `/finish` |
| `completed` | `/completed` |

## Guard Functions

| Function | Behavior |
| --- | --- |
| `redirectToCurrentPhase()` | Redirects `/` to the route matching current session phase, or `/register` if no session exists. |
| `requireRegistration()` | Allows registration only when no session exists. If a session exists, redirects to that session phase. |
| `requirePhase(phase)` | Requires a session and exact phase match. Otherwise redirects to registration or the current phase route. |
| `requireQuest()` | Convenience wrapper for `requirePhase("quest")`. |

## Route-Level Protection

| Route | Guard |
| --- | --- |
| `/` | `redirectToCurrentPhase()` |
| `/register` | `requireRegistration()` |
| `/quest` | `requireQuest()` |
| `/finish` | `requirePhase("finish")` |
| `/completed` | `requirePhase("completed")` |

## Why Users Cannot Skip Phases

Manual URL changes are blocked by `beforeLoad` guards.

Examples:

- No session visiting `/quest` redirects to `/register`.
- Quest phase visiting `/finish` redirects to `/quest`.
- Finish phase visiting `/quest` redirects to `/finish`.
- Completed phase visiting `/register` redirects to `/completed`.

Browser Back also respects this because revisiting an old route runs the guard again and redirects based on the persisted `session.phase`.
