import { redirect } from "@tanstack/react-router";

import { useSessionStore } from "../stores/session.store";
import type { GamePhase } from "../types/game";
import type { PlayerSession } from "../types/session";

const phaseRoutes: Record<
  GamePhase,
  "/register" | "/quest" | "/finish" | "/completed"
> = {
  registration: "/register",
  quest: "/quest",
  finish: "/finish",
  completed: "/completed",
};

function getPhaseRoute(session: PlayerSession | null) {
  return session ? phaseRoutes[session.phase] : "/register";
}

export function redirectToCurrentPhase() {
  throw redirect({
    to: getPhaseRoute(useSessionStore.getState().session),
  });
}

export function requireRegistration() {
  const session = useSessionStore.getState().session;

  if (session) {
    throw redirect({
      to: getPhaseRoute(session),
    });
  }
}

export function requirePhase(phase: GamePhase) {
  const session = useSessionStore.getState().session;

  if (!session) {
    throw redirect({
      to: "/register",
    });
  }

  if (session.phase !== phase) {
    throw redirect({
      to: getPhaseRoute(session),
    });
  }
}

export function requireQuest() {
  requirePhase("quest");
}
