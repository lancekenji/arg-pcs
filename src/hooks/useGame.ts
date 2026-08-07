import { useMemo } from "react";

import { useSessionStore } from "../stores/session.store";

import { getCurrentQuest, getCurrentStory, getProgress } from "../lib/game";

export function useGame() {
  const session = useSessionStore((state) => state.session);

  const game = useMemo(() => {
    if (!session) {
      return null;
    }

    return {
      session,

      story: getCurrentStory(session),

      quest: getCurrentQuest(session),

      progress: getProgress(session),
    };
  }, [session]);

  return game;
}
