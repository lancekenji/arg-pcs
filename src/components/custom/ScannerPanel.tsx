import { useCallback, useState } from "react";
import type { IScannerError } from "@yudiel/react-qr-scanner";
import { Camera, CircleAlert, LoaderCircle, QrCode, X } from "lucide-react";

import QRScanner from "./QRScanner";
import type { QRScanResult } from "@/types/qr";

type ScannerStatus =
  | "loading"
  | "ready"
  | "permission-denied"
  | "unavailable"
  | "invalid"
  | "already-used"
  | "no-session"
  | "not-quest"
  | "success";

interface ScannerPanelProps {
  onDetected(value: string): QRScanResult;
  onClose(): void;
}

const scannerMessages: Record<
  ScannerStatus,
  {
    title: string;
    description: string;
  }
> = {
  loading: {
    title: "Starting Camera",
    description: "Hold on while the scanner wakes up.",
  },
  ready: {
    title: "Scan A Quest Marker",
    description: "Point your camera at any unused Morning Walk QR marker.",
  },
  "permission-denied": {
    title: "Camera Permission Needed",
    description: "Allow camera access in your device settings, then try again.",
  },
  unavailable: {
    title: "Camera Unavailable",
    description: "The scanner could not start on this device right now.",
  },
  invalid: {
    title: "Invalid QR",
    description: "This marker is not part of the Morning Walk quest.",
  },
  "already-used": {
    title: "QR Already Used",
    description: "Find another QR marker to reveal this quest answer.",
  },
  "no-session": {
    title: "No Active Session",
    description: "Please register or start a session before scanning.",
  },
  "not-quest": {
    title: "Wrong Game Phase",
    description: "You must be in the quest phase to scan markers.",
  },
  success: {
    title: "Answer Revealed",
    description: "Scanner closing. Your clue is ready.",
  },
};

function getScannerStatus(error: IScannerError): ScannerStatus {
  if (error.kind === "permission-denied" || error.kind === "security") {
    return "permission-denied";
  }

  return "unavailable";
}

export default function ScannerPanel({
  onDetected,
  onClose,
}: ScannerPanelProps) {
  const [status, setStatus] = useState<ScannerStatus>("loading");
  const message = scannerMessages[status];
  const scannerPaused =
    status === "permission-denied" ||
    status === "unavailable" ||
    status === "success";

  const handleScan = useCallback(
    (value: string) => {
      const result = onDetected(value);

      if (!result.success) {
        setStatus(result.reason);
        return;
      }

      setStatus("success");

      window.setTimeout(() => {
        onClose();
      }, 700);
    },
    [onDetected, onClose],
  );

  const handleReady = useCallback(() => {
    setStatus((currentStatus) =>
      currentStatus === "loading" ? "ready" : currentStatus,
    );
  }, []);

  const handleError = useCallback((error: IScannerError) => {
    setStatus(getScannerStatus(error));
  }, []);

  return (
    <dialog
      aria-labelledby="scanner-title"
      aria-describedby="scanner-description"
      className="fixed inset-0 z-50 flex h-dvh w-screen max-w-none items-center justify-center bg-black/80 p-4 text-slate-900 backdrop:bg-transparent open:animate-in open:fade-in-0"
      open
    >
      <section className="grid h-full w-full max-w-md grid-rows-[auto_1fr_auto] gap-4 rounded-3xl border border-white/30 bg-white/95 p-4 shadow-2xl">
        <header className="flex items-start justify-between gap-4">
          <section>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-700">
              <QrCode className="h-4 w-4" />
              QR Scanner
            </p>
            <h2
              id="scanner-title"
              className="mt-1 text-xl font-black tracking-tight text-slate-950"
            >
              {message.title}
            </h2>
            <p
              id="scanner-description"
              className="mt-1 text-sm leading-6 text-slate-600"
            >
              {message.description}
            </p>
          </section>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close scanner"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-105 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <section className="relative min-h-0 overflow-hidden rounded-3xl bg-slate-950 shadow-inner">
          <QRScanner
            paused={scannerPaused}
            onScan={handleScan}
            onReady={handleReady}
            onError={handleError}
          />

          <section
            aria-live="polite"
            className="pointer-events-none absolute inset-x-4 top-4 rounded-2xl border border-white/20 bg-slate-950/70 p-3 text-white shadow-xl backdrop-blur-md"
          >
            <p className="flex items-center gap-2 text-sm font-bold">
              {status === "loading" && (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              )}
              {(status === "permission-denied" ||
                status === "unavailable" ||
                status === "invalid" ||
                status === "already-used" ||
                status === "no-session" ||
                status === "not-quest") && (
                <CircleAlert className="h-4 w-4 text-amber-300" />
              )}
              {(status === "ready" || status === "success") && (
                <Camera className="h-4 w-4 text-cyan-200" />
              )}
              {message.title}
            </p>
          </section>

          <aside
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-4 border-cyan-300/90 shadow-[0_0_0_999px_rgb(15_23_42_/_0.35)]"
          />
        </section>

        <footer className="grid gap-2 pb-[env(safe-area-inset-bottom)]">
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:translate-y-0 cursor-pointer"
          >
            Close Scanner
          </button>
        </footer>
      </section>
    </dialog>
  );
}
