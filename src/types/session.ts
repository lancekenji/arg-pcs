import type { GamePhase } from "./game";

export interface PlayerSession {
  id: string;

  name: string;

  course: string;

  storyId: number;

  currentStage: number;

  usedQRs: string[];

  reflection: string;

  phase: GamePhase;
}
