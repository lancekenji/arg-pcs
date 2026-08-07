import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";

import { useUIStore } from "../../stores/ui.store";

export default function GameDialog() {
  const dialog = useUIStore((state) => state.dialog);
  const close = useUIStore((state) => state.close);

  if (!dialog) {
    return null;
  }

  const icon = {
    success: <CircleCheck className="h-8 w-8 text-green-600 shrink-0" />,
    error: <CircleX className="h-8 w-8 text-red-600 shrink-0" />,
    warning: <CircleAlert className="h-8 w-8 text-yellow-600 shrink-0" />,
    info: <Info className="h-8 w-8 text-cyan-600 shrink-0" />,
  }[dialog.variant];

  return (
    <Dialog open onOpenChange={close}>
      <DialogContent>
        <header className="flex items-center gap-4">
          {icon}
          <DialogHeader>
            <DialogTitle>{dialog.title}</DialogTitle>
            <DialogDescription>{dialog.description}</DialogDescription>
          </DialogHeader>
        </header>

        <DialogFooter>
          <Button onClick={close} className="cursor-pointer">
            {dialog.buttonText ?? "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
