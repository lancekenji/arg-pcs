import { useSessionStore } from "./session.store";

export const useSession = () => useSessionStore((state) => state.session);

export const useCurrentStage = () =>
  useSessionStore((state) => state.session?.currentStage ?? 0);

export const usePhase = () => useSessionStore((state) => state.session?.phase);
