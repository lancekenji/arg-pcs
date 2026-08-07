# Component Guide

## Registration Route

File:

```text
src/routes/register.tsx
```

Route:

```text
/register
```

Purpose:

- Collect student name and course.
- Start a persisted local session.
- Navigate to the quest route.

Props:

- None. This is a route component.

Responsibilities:

- Render registration form.
- Maintain local form state with `useState`.
- Call `startSession(name, course)`.
- Navigate to `/quest`.

Dependencies:

- `useSessionStore`
- `useNavigate`
- `requireRegistration`
- `lucide-react` icons

## Quest Route

File:

```text
src/routes/quest.tsx
```

Route:

```text
/quest
```

Purpose:

- Render active story, riddle, and progress.
- Open scanner modal.
- Reveal answer after successful QR scan.
- Validate typed answer.
- Advance stage or move to finish phase.

Props:

- None. This is a route component.

Responsibilities:

- Use `useGame()` for derived session/story/quest/progress data.
- Call `revealAnswer(rawQrValue)` when the scanner detects a QR.
- Display `quest.answer` only after a successful scan.
- Call `validateAnswer(session, answer)` on answer submit.
- Call `completeStage()` after a correct answer.
- Navigate to `/finish` after the final stage.

Dependencies:

- `useGame`
- `useSessionStore`
- `useUIStore`
- `ScannerPanel`
- `ProgressCard`
- `RiddleCard`
- `AnswerInput`
- `requireQuest`

## ScannerPanel

File:

```text
src/components/custom/ScannerPanel.tsx
```

Purpose:

- Render the scanner modal.
- Manage user-facing scanner state.
- Translate scanner and QR result states into modal messages.

Props:

| Prop | Type | Purpose |
| --- | --- | --- |
| `onDetected` | `(value: string) => QRScanResult` | Receives raw QR values from `QRScanner` and returns validation result. |
| `onClose` | `() => void` | Closes the scanner modal. |

Responsibilities:

- Show loading, ready, permission denied, unavailable, invalid, already used, no session, not quest, and success states.
- Pause scanner on terminal camera states and success.
- Close automatically shortly after success.
- Render accessible `dialog` with title and description IDs.

Dependencies:

- `QRScanner`
- `QRScanResult`
- `IScannerError`
- `lucide-react`

## QRScanner

File:

```text
src/components/custom/QRScanner.tsx
```

Purpose:

- Wrap `@yudiel/react-qr-scanner`.
- Own camera scanning behavior.
- Return raw QR string only.

Props:

| Prop | Type | Purpose |
| --- | --- | --- |
| `onScan` | `(value: string) => void` | Called with raw scanned QR text. |
| `onError` | `(error: IScannerError) => void` | Called when camera/scanner fails. |
| `onReady` | `() => void` | Called after a short startup timer. |
| `paused` | `boolean` | Pauses the scanner when needed. |

Responsibilities:

- Use environment-facing camera constraints.
- Debounce rapid duplicate scans.
- Lock scan handling briefly after a scan.
- Expose scanner errors to `ScannerPanel`.
- Stop active camera tracks during cleanup.

Non-responsibilities:

- No story lookup.
- No answer calculation.
- No QR marker validation.
- No session mutation.

Dependencies:

- `@yudiel/react-qr-scanner`
- React refs/effects

## InstallationRequired

File:

```text
src/components/custom/InstallationRequired.tsx
```

Purpose:

- Explain that the app must be installed before gameplay.
- Offer browser install prompt when available.
- Show iOS Add to Home Screen guidance.

Props:

- None.

Responsibilities:

- Render install instructions.
- Call `usePWAInstall()`.
- Render install button when `canInstall` is true.
- Render iOS-specific instructions when `isIOS()` is true.

Dependencies:

- `usePWAInstall`
- `isIOS`
- shadcn `Button`
- `lucide-react`
- `/pcs-logo.png`

## MobileRequired

File:

```text
src/components/custom/MobileRequired.tsx
```

Purpose:

- Block non-mobile access.
- Explain that a phone camera is required for the event.

Props:

- None.

Dependencies:

- `lucide-react`

## GameDialog

File:

```text
src/components/custom/GameDialog.tsx
```

Purpose:

- Render one global feedback dialog.

Props:

- None. It reads from `useUIStore`.

Responsibilities:

- Render success, warning, error, and info variants.
- Close through `useUIStore.close`.

Dependencies:

- `useUIStore`
- shadcn dialog primitives
- shadcn button
- `lucide-react`

## Quest UI Components

| Component | File | Purpose |
| --- | --- | --- |
| `ProgressCard` | `src/components/custom/ProgressCard.tsx` | Shows current quest number, total quests, and visual progress bar. |
| `RiddleCard` | `src/components/custom/RiddleCard.tsx` | Shows current story title and riddle. |
| `AnswerInput` | `src/components/custom/AnwerInput.tsx` | Shows revealed answer and collects typed answer submission. |

Note: the answer input file is currently named `AnwerInput.tsx`.
