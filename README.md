# ARG Quest: Interactive QR-Based Campus Adventure

A Progressive Web Application (PWA) that delivers a short, interactive Alternate Reality Game (ARG) experience through QR-code exploration, riddles, and story-driven quests.

## Table of Contents

- [Product Overview](#product-overview)
- [Problem Statement](#problem-statement)
- [Product Goals](#product-goals)
- [Target User Journey](#target-user-journey)
- [Core Gameplay Concept](#core-gameplay-concept)
- [Functional Requirements](#functional-requirements)
- [MVP (Minimum Viable Product)](#mvp-minimum-viable-product)
- [Technical Requirements](#technical-requirements)
- [Application Architecture](#application-architecture)
- [Data Management](#data-management)
- [Offline Strategy](#offline-strategy)
- [Security / Anti-Cheat Considerations](#security--anti-cheat-considerations)
- [Performance Requirements](#performance-requirements)
- [Future Roadmap](#future-roadmap)
- [Success Criteria](#success-criteria)

## Product Overview

| Field | Detail |
|---|---|
| Product Name | ARG Quest |
| Product Type | Interactive Campus Mini Game / Booth Activity Platform |
| Platform | Progressive Web Application (PWA) |
| Intended Users | First-year students participating in campus events, orientations, and booth activities |

### Purpose

ARG Quest is designed as a fast-paced interactive activity where students explore their surroundings, solve riddles, discover QR codes, and complete a short narrative-driven adventure within 2-5 minutes.

The application combines:

- Storytelling
- Puzzle solving
- Physical exploration
- QR technology
- Progressive Web App capabilities

to create an engaging booth experience.

## Problem Statement

Traditional booth activities often rely on:

- Printed materials
- Static explanations
- Passive interactions

which may fail to capture student attention in a crowded campus environment.

The ARG Quest system provides an active experience where participants:

1. Register their participation.
2. Receive a personalized quest.
3. Solve riddles.
4. Search for QR checkpoints.
5. Complete a short story.
6. Reflect on what they learned.
7. Receive verification/stamp from the booth.

The activity must be:

- Fast
- Easy to understand
- Mobile-friendly
- Cheating-resistant
- Offline-capable

## Product Goals

### Primary Goals

1. **Create a 2-5 minute interactive experience** — Students should finish the entire activity within a short timeframe.
2. **Encourage exploration** — Students must physically search for QR checkpoints placed around the booth/campus area.
3. **Provide personalized gameplay** — Each participant receives a unique story assignment.
4. **Prevent repeated QR usage** — A student cannot reuse the same QR checkpoint during their session.
5. **Support offline-first gameplay** — The application should continue working even without internet connectivity.

## Target User Journey

### Participant Flow

```
Open Application
      ↓
Install PWA
      ↓
Registration (Name + Course)
      ↓
Story Assignment
      ↓
Quest Begins
      ↓
Read Riddle
      ↓
Find QR Code
      ↓
Scan QR
      ↓
Receive Answer
      ↓
Submit Answer
      ↓
Unlock Next Quest
      ↓
Complete 3 Quests
      ↓
Read Final Story
      ↓
Answer Reflection
      ↓
Return to Booth
      ↓
Receive Stamp
```

## Core Gameplay Concept

Each participant receives:

- One Story
- Three Quests
- Three QR Discoveries
- One Final Reflection

### Example

**Story:** The Forgotten Garden

**Quest 1**

- Riddle: "I stand tall with branches..."
- Answer: Tree

**Student flow:**

1. Find QR
2. Scan
3. Answer revealed: Tree
4. Type Tree
5. Continue

## Functional Requirements

### Registration System

**Description:** Allows students to create a temporary player session.

**Required Information**

- Full Name
- Course / Program

**Requirements:** The system must:

- Generate a unique session ID.
- Assign a random story.
- Store progress locally.

### Quest System

**Description:** Controls the student's current objective.

Each quest contains:

- Sequence Number
- Riddle
- Answer

**Requirements:**

- Display current riddle.
- Track current quest progress.
- Unlock next quest after correct submission.
- Prevent skipping stages.

### QR Code System

**Description:** Physical QR checkpoints placed around the activity area.

**Important:** QR codes do not contain answers. They only contain unique identifiers.

Example:

```
ARG-QR-001
ARG-QR-002
ARG-QR-003
```

The application determines the correct answer using:

```
Current Story + Current Quest + QR Scan = Reveal Correct Answer
```

**QR Rules**

- **First scan** — Allowed. Example: Student scans QR-001 → System: Valid → Reveal answer.
- **Second scan** — Blocked. Example: Student scans QR-001 again → System: Already used.

### Answer System

After scanning, the application reveals the quest answer. The student must type the answer.

Example:

- Answer revealed: TREE
- Input: tree
- Validation: case insensitive
- Accepted: TREE, tree, Tree

### Story Completion System

After completing all quests, the system displays:

- Full story
- Narrative conclusion
- Reflection question

Example: "What did you learn from this journey?"

## MVP (Minimum Viable Product)

The MVP focuses only on the features required for the booth activity.

### MVP Features

1. **Registration** — User enters Name and Course. System creates a player session and story assignment.
2. **Random Story Assignment** — System randomly selects Story A, Story B, or Story C.
3. **Quest Display** — Displays current quest number, riddle, and progress.
4. **QR Scanner** — User can open camera, scan QR, and receive QR ID.
5. **QR Validation** — System checks whether the QR has been scanned before. If no, continue. If yes, reject.
6. **Answer Reveal** — After a successful scan, displays the answer (e.g., "Answer: TREE").
7. **Answer Submission** — User submits answer; system validates.
8. **Quest Progression** — Quest 1 → Quest 2 → Quest 3.
9. **Completion Screen** — Displays final story and reflection question.

### MVP Exclusions

The following are not required for MVP:

- Login accounts
- Database backend
- Leaderboards
- Multiplayer
- Analytics dashboard
- Admin panel
- Social sharing
- Advanced anti-cheat

## Technical Requirements

| Area | Choice |
|---|---|
| Frontend Framework | React |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| State Management | Zustand |
| Routing | TanStack Router |
| PWA | Vite PWA Plugin |
| QR Scanner | React QR Scanner Library |

## Application Architecture

```
React Components
      ↓
Custom Hooks
      ↓
Game Logic Layer
      ↓
Zustand Session Store
      ↓
Local Storage
      ↓
Static Story Data (JSON)
```

### Folder Structure

```
src/
  components/
    QRScanner.tsx
    AnswerInput.tsx
    RiddleCard.tsx
    ProgressCard.tsx

  hooks/
    useGame.ts

  lib/
    game.ts
    story.ts
    qr.ts

  stores/
    session.store.ts

  types/
    story.ts
    session.ts

  data/
    stories.json

  routes/
    register.tsx
    quest.tsx
    finish.tsx
```

## Data Management

Stories are stored locally.

Example:

```json
{
  "story_title": "The Forgotten Garden",
  "quests": [
    {
      "sequence": 1,
      "riddle": "I grow tall...",
      "answer": "tree"
    }
  ]
}
```

**Advantages:**

- No backend required.
- Works offline.
- Easy content updates.

## Offline Strategy

The application uses PWA technology.

**Cached:**

- Application shell
- JavaScript bundles
- CSS
- Images
- Story JSON

**Stored locally:**

- Player session
- Quest progress
- Used QR history

## Security / Anti-Cheat Considerations

### Current MVP Protection

The application prevents:

- Reusing the same QR.
- Skipping quests.
- Changing answers without validation.

### Future Improvements

Possible upgrades:

- Server validation
- Event tokens
- Time-based sessions
- Encrypted QR payloads
- Backend leaderboard

## Performance Requirements

The application should:

- Load under 3 seconds.
- Work on mobile browsers.
- Consume minimal battery.
- Avoid unnecessary re-renders.
- Use local-first state management.

## Future Roadmap

### Version 1.1

- Better animations
- Sound effects
- Better storytelling UI

### Version 1.2

Admin dashboard with the following features:

- Create stories
- Generate QR codes
- Monitor participants

## Success Criteria

The project is successful if:

- A student can finish within 2-5 minutes.
- Students understand the mechanics without assistance.
- QR scanning works reliably.
- No student can reuse scanned QR checkpoints.
- Booth staff can verify completion.
- The application works on mobile devices.

### Final MVP Definition

ARG Quest is a lightweight offline-first Progressive Web Application that transforms a simple campus booth visit into a short interactive adventure where students solve riddles, discover QR checkpoints, unlock story progression, and complete a narrative challenge.