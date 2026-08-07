import { create } from "zustand";
import { persist } from "zustand/middleware";

import { scanQR } from "../lib/game";
import { validateQR } from "../lib/qr";
import { getRandomStory, getStory } from "../lib/story";
import type { QRScanResult } from "../types/qr";
import type { PlayerSession } from "../types/session";

interface SessionStore {
  session: PlayerSession | null;

  startSession: (name: string, course: string) => void;

  revealAnswer: (rawQrValue: string) => QRScanResult;

  completeStage: () => void;

  unlockFinish: () => void;

  saveReflection: (value: string) => void;

  reset: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      session: null,

      startSession(name, course) {
        set({
          session: {
            id: crypto.randomUUID(),

            name,

            course,

            storyId: getRandomStory(),

            currentStage: 0,

            usedQRs: [],

            reflection: "",

            phase: "quest",
          },
        });
      },

      revealAnswer(rawQrValue) {
        const session = get().session;

        if (!session) {
          return {
            success: false,
            reason: "no-session",
          };
        }

        if (session.phase !== "quest") {
          return {
            success: false,
            reason: "not-quest",
          };
        }

        const validation = validateQR(rawQrValue);

        if (!validation.success) {
          return validation;
        }

        const result = scanQR(session, validation.markerId);

        if (!result.success) {
          return result;
        }

        set({
          session: {
            ...session,

            usedQRs: [...session.usedQRs, result.markerId],
          },
        });

        return result;
      },

      completeStage() {
        const session = get().session;

        if (!session || session.phase !== "quest") {
          return;
        }

        const nextStage = session.currentStage + 1;
        const story = getStory(session.storyId);

        set({
          session: {
            ...session,

            currentStage: nextStage,

            phase: nextStage >= story.quests.length ? "finish" : "quest",
          },
        });
      },

      unlockFinish() {
        const session = get().session;

        if (!session) {
          return;
        }

        set({
          session: {
            ...session,

            phase: "finish",
          },
        });
      },
      saveReflection(value) {
        const session = get().session;

        if (!session) {
          return;
        }

        set({
          session: {
            ...session,

            reflection: value,

            phase: "completed",
          },
        });
      },
      reset() {
        set({
          session: null,
        });
      },
    }),

    {
      name: "arg-session",
    },
  ),
);
