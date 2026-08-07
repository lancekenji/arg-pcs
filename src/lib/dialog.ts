import { useUIStore } from "../stores/ui.store";

import type { DialogPayload } from "../types/ui";

export function openDialog(dialog: DialogPayload) {
  useUIStore.getState().show(dialog);
}
