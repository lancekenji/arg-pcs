You are documenting an existing React TypeScript Progressive Web App.

Create complete project documentation using Markdown files.

Do not modify application code.

Analyze the current codebase and generate documentation that accurately reflects the existing implementation.

The documentation should be written for:

- future developers
- maintainers
- event organizers
- technical reviewers


====================================================
DOCUMENTATION GOAL
====================================================

Create a complete technical overview of the Morning Walk ARG Quest PWA.

Explain:

- what the application does
- how data flows
- how components communicate
- how the game logic works
- how QR scanning works
- how offline functionality works


====================================================
CREATE THESE FILES
====================================================


Create:

/docs


01-project-overview.md

02-architecture.md

03-folder-structure.md

04-game-flow.md

05-qr-system.md

06-state-management.md

07-routing-flow.md

08-pwa-installation.md

09-component-guide.md

10-testing-checklist.md



====================================================
01-project-overview.md
====================================================

Include:

- project purpose
- event scenario
- target users
- technology stack
- main features


Explain:

This is a temporary offline event application.

No backend.

No authentication.

No database.



====================================================
02-architecture.md
====================================================

Document the architecture.


Include:


High-level architecture diagram using Mermaid.


Example:


Registration

↓

Zustand Session Store

↓

Quest Engine

↓

QR Scanner

↓

Answer Validation

↓

Completion



Explain:

- UI layer
- state layer
- data layer
- utility layer
- PWA layer



====================================================
03-folder-structure.md
====================================================

Document every important folder.


Example:


src/

components/

routes/

stores/

types/

lib/

data/


Explain the responsibility of each.



====================================================
04-game-flow.md
====================================================

Document the complete student journey.


Include:


Installation

↓

Registration

↓

Story Assignment

↓

Quest Phase

↓

QR Scan

↓

Answer Reveal

↓

Reflection

↓

Completion



Explain every transition.



====================================================
05-qr-system.md
====================================================

Explain the QR architecture.


Important:


QR codes DO NOT contain answers.


QR payload:


{
 "game":"MWQ",
 "marker":"K7F9X2"
}



Explain:


QR parsing

QR validation

Marker checking

Used QR tracking

Duplicate prevention


Include example flow:


Student scans QR

↓

Payload parsed

↓

Game validated

↓

Marker checked

↓

Answer generated from story + stage



====================================================
06-state-management.md
====================================================

Document Zustand.


Explain:


Player session


Fields:


id

name

course

storyId

currentStage

usedQRs

reflection

phase



Explain persistence behavior.



====================================================
07-routing-flow.md
====================================================

Document TanStack Router.


Include:


Available routes

Route guards

Navigation restrictions


Explain:

Why users cannot manually skip phases.



====================================================
08-pwa-installation.md
====================================================

Document:


vite-plugin-pwa configuration

Service worker

Offline behavior

Installation requirement

Mobile camera requirement



Explain:


Why normal browser access is restricted.



====================================================
09-component-guide.md
====================================================

Document important components:


Registration

Quest

ScannerPanel

QRScanner

InstallationRequired



For each:


Purpose

Props

Responsibilities

Dependencies



====================================================
10-testing-checklist.md
====================================================

Create a complete QA checklist.


Include:


PWA testing

QR testing

Game flow testing

Mobile testing

Offline testing

Event simulation



====================================================
DOCUMENT STYLE
====================================================


Use:

Clear headings

Tables where useful

Mermaid diagrams

Code examples

Technical explanations


Do not create vague documentation.

Documentation must describe the actual implementation.

If something does not exist in the codebase, do not document it as existing.