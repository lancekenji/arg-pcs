import type { PlayerSession } from "../types/session";
import type { Quest } from "../types/story";

import type { AnswerValidationResult } from "../types/game";
import type { QRScanResult } from "../types/qr";

import { getStory } from "./story";

export function getCurrentStory(session: PlayerSession) {
  return getStory(session.storyId);
}

export function getCurrentQuest(session: PlayerSession): Quest {
  return getCurrentStory(session).quests[session.currentStage];
}

export function getCurrentAnswer(session: PlayerSession) {
  return getCurrentQuest(session).answer;
}

export function validateAnswer(
  session: PlayerSession,
  input: string,
): AnswerValidationResult {
  const answer = getCurrentAnswer(session);

  if (input.trim().toLowerCase() !== answer.trim().toLowerCase()) {
    return {
      success: false,
      reason: "wrong-answer",
    };
  }

  return {
    success: true,
  };
}

export function scanQR(session: PlayerSession, markerId: string): QRScanResult {
  if (session.usedQRs.includes(markerId)) {
    return {
      success: false,
      reason: "already-used",
    };
  }

  return {
    success: true,
    markerId,
  };
}

export function hasFinishedStory(session: PlayerSession) {
  return session.currentStage >= getCurrentStory(session).quests.length;
}

export function getProgress(session: PlayerSession) {
  return {
    current: session.currentStage + 1,

    total: getCurrentStory(session).quests.length,
  };
}
