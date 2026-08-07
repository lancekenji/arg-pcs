# Testing Checklist

Use this checklist before the live Morning Walk event.

## Build and Static Checks

- [ ] Run `pnpm build`.
- [ ] Confirm TypeScript completes successfully.
- [ ] Confirm Vite production build completes successfully.
- [ ] Run `pnpm lint`.
- [ ] Review lint warnings and confirm no new critical warnings were introduced.
- [ ] Confirm `dist/manifest.webmanifest` is generated.
- [ ] Confirm `dist/sw.js` is generated.

## PWA Installation

- [ ] Open the app on Android Chrome before installation.
- [ ] Confirm `InstallationRequired` is shown.
- [ ] Confirm install button appears when `beforeinstallprompt` is available.
- [ ] Install the app.
- [ ] Launch from the installed app icon.
- [ ] Confirm gameplay routes are accessible after installation.
- [ ] Open the app on iOS Safari before installation.
- [ ] Confirm iOS Add to Home Screen instructions are shown.
- [ ] Add to Home Screen.
- [ ] Launch from the home screen icon.
- [ ] Confirm standalone mode is detected.

## Mobile Requirement

- [ ] Open the app on a desktop browser.
- [ ] Confirm `MobileRequired` is shown.
- [ ] Confirm registration and gameplay are not visible on desktop.
- [ ] Test on at least one Android phone.
- [ ] Test on at least one iPhone if iOS support is needed for the event.

## Registration Flow

- [ ] Start with no existing session.
- [ ] Confirm `/` redirects to `/register`.
- [ ] Submit empty form and confirm browser validation blocks submission.
- [ ] Enter name and course.
- [ ] Tap `Start Journey`.
- [ ] Confirm app navigates to `/quest`.
- [ ] Refresh the app and confirm the session persists.

## Story Assignment

- [ ] Register multiple fresh sessions using `reset()` during developer testing or by clearing storage.
- [ ] Confirm different `storyId` values can be assigned.
- [ ] Confirm quest page displays the assigned story title.
- [ ] Confirm riddles correspond to the assigned story.

## QR Payload Testing

Generate or prepare QR codes containing exactly these JSON payloads:

```json
{"game":"MWQ","marker":"K7F9X2"}
```

```json
{"game":"MWQ","marker":"P4M8ZT"}
```

```json
{"game":"MWQ","marker":"V9Q3LK"}
```

```json
{"game":"MWQ","marker":"H6R2WD"}
```

```json
{"game":"MWQ","marker":"N8C5YA"}
```

Checklist:

- [ ] Scan a valid marker and confirm answer reveals.
- [ ] Confirm the revealed answer matches assigned story + current stage.
- [ ] Confirm the QR payload text is not displayed as the answer.
- [ ] Scan invalid JSON and confirm invalid QR state.
- [ ] Scan JSON missing `game` and confirm invalid QR state.
- [ ] Scan JSON missing `marker` and confirm invalid QR state.
- [ ] Scan JSON with wrong `game` and confirm invalid QR state.
- [ ] Scan JSON with unknown marker and confirm invalid QR state.

## Marker Reuse Testing

- [ ] Scan a valid marker on quest stage 1.
- [ ] Confirm the marker ID is added to `session.usedQRs`.
- [ ] Try scanning the same marker again during the same session.
- [ ] Confirm the scanner shows QR already used.
- [ ] Scan a different marker and confirm it works.
- [ ] Complete a stage.
- [ ] Try to use a previously used marker on the next stage.
- [ ] Confirm it remains rejected for that player.
- [ ] Start a separate fresh session.
- [ ] Confirm the same physical marker can be used by the new session.

## Quest Flow

- [ ] Confirm quest progress starts at `1 / 3`.
- [ ] Confirm answer input is hidden before scanning.
- [ ] Scan a valid unused marker.
- [ ] Confirm scanner modal closes after success.
- [ ] Confirm answer input appears.
- [ ] Submit an incorrect answer.
- [ ] Confirm global error dialog appears.
- [ ] Submit the correct answer.
- [ ] Confirm progress advances to the next quest.
- [ ] Confirm a success dialog appears for non-final stages.
- [ ] Complete all stages.
- [ ] Confirm final correct answer navigates to `/finish`.

## Finish and Reflection

- [ ] Confirm `/finish` shows the assigned story title.
- [ ] Confirm full story text is visible.
- [ ] Try submitting an empty reflection.
- [ ] Confirm required textarea validation blocks submission.
- [ ] Enter reflection text.
- [ ] Submit reflection.
- [ ] Confirm app navigates to `/completed`.
- [ ] Confirm reflection is stored in the persisted session.

## Completion

- [ ] Confirm `/completed` congratulates the student by name.
- [ ] Confirm screen instructs the student to return to the booth for a stamp.
- [ ] Refresh the page and confirm completed state persists.

## Route Guard Testing

- [ ] With no session, visit `/quest`; confirm redirect to `/register`.
- [ ] With no session, visit `/finish`; confirm redirect to `/register`.
- [ ] With no session, visit `/completed`; confirm redirect to `/register`.
- [ ] During quest phase, manually visit `/finish`; confirm redirect to `/quest`.
- [ ] During quest phase, manually visit `/completed`; confirm redirect to `/quest`.
- [ ] During finish phase, manually visit `/quest`; confirm redirect to `/finish`.
- [ ] During completed phase, manually visit `/register`; confirm redirect to `/completed`.
- [ ] Use browser Back after phase changes and confirm guards return to the current phase.

## Scanner and Camera

- [ ] Open scanner modal.
- [ ] Confirm camera permission prompt appears if permission was not already granted.
- [ ] Grant permission and confirm camera preview appears.
- [ ] Deny permission and confirm permission denied state.
- [ ] Close scanner and confirm camera indicator turns off.
- [ ] Reopen scanner and confirm camera starts again.
- [ ] Hold the same QR in view and confirm duplicate rapid callbacks do not advance multiple states.
- [ ] Test in low-light event-like conditions.
- [ ] Test with printed QR markers at expected booth/campus distance.

## Offline Testing

- [ ] Install the PWA while online.
- [ ] Launch installed app once while online.
- [ ] Turn on airplane mode.
- [ ] Relaunch the installed app.
- [ ] Confirm registration loads.
- [ ] Complete a full quest offline.
- [ ] Confirm QR scanning still works offline.
- [ ] Refresh or close/reopen app offline and confirm session persists.
- [ ] Confirm images/icons needed for the experience load offline.

## Event Simulation

- [ ] Prepare five printed QR markers.
- [ ] Run at least three complete student sessions on different phones.
- [ ] Confirm each phone can use the same physical markers independently.
- [ ] Confirm one phone cannot reuse a marker within the same session.
- [ ] Confirm average completion time is within 2-5 minutes.
- [ ] Confirm booth staff can identify the final completed screen quickly.
- [ ] Confirm the final screen remains visible if the student locks/unlocks the phone.
- [ ] Confirm app remains usable when cellular data and Wi-Fi are disabled after installation.
