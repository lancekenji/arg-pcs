import { create } from "zustand";

import type { DialogPayload } from "../types/ui";

interface UIStore {
  dialog: DialogPayload | null;

  show(dialog: DialogPayload): void;

  close(): void;
}

export const useUIStore = create<UIStore>((set) => ({
  dialog: null,

  show(dialog) {
    set({
      dialog,
    });
  },

  close() {
    set({
      dialog: null,
    });
  },
}));
