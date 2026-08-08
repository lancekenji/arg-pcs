import { useCallback, useState } from "react";
import type { IScannerError } from "@yudiel/react-qr-scanner";
import {
  Camera,
  Check,
  CircleAlert,
  LoaderCircle,
  QrCode,
  ScanLine,
  Sparkles,
  X,
} from "lucide-react";

import QRScanner from "./QRScanner";
import FloatingTechLogos from "./FloatingLogos";
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
    title: "Starting Scanner",
    description: "Preparing the quest scanner...",
  },

  ready: {
    title: "Scan Quest Marker",
    description: "Point your camera at any unused QR marker around the campus.",
  },

  "permission-denied": {
    title: "Camera Permission Needed",
    description:
      "Allow camera access in your browser settings, then try again.",
  },

  unavailable: {
    title: "Camera Unavailable",
    description: "The scanner could not start on this device right now.",
  },

  invalid: {
    title: "Invalid Marker",
    description: "This QR code is not part of the Morning Walk quest.",
  },

  "already-used": {
    title: "Marker Already Used",
    description: "You already discovered this marker. Find another one.",
  },

  "no-session": {
    title: "No Active Quest",
    description: "Start your expedition before scanning a quest marker.",
  },

  "not-quest": {
    title: "Quest Not Active",
    description: "This marker cannot be scanned during the current phase.",
  },

  success: {
    title: "Marker Decoded!",
    description: "Your quest answer has been revealed.",
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
      }, 850);
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

  const isError =
    status === "permission-denied" ||
    status === "unavailable" ||
    status === "invalid" ||
    status === "already-used" ||
    status === "no-session" ||
    status === "not-quest";

  return (
    <dialog
      open
      aria-label="Quest QR scanner"
      className="fixed inset-0 z-50 m-0 flex min-h-dvh w-full max-w-none items-center justify-center border-0 bg-transparent p-0 backdrop:bg-blue-950/30 backdrop:backdrop-blur-sm"
    >
      <article className="relative flex min-h-dvh w-full max-w-2xl flex-col overflow-hidden bg-linear-to-br from-white via-cyan-50 to-blue-50 shadow-2xl sm:min-h-0 sm:rounded-[2rem] sm:border sm:border-white/80">
        {/* Floating technology background */}
        <FloatingTechLogos />

        {/* Decorative background glow */}
        <aside
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.16),transparent_45%)]"
        />

        {/* Header */}
        <header className="relative z-30 flex items-center justify-between border-b px-5 py-4 sm:px-6">
          <section className="flex items-center gap-3">
            <figure className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-700 shadow-sm">
              {status === "success" ? (
                <Check className="h-5 w-5" />
              ) : (
                <QrCode className="h-5 w-5" />
              )}

              <figcaption className="sr-only">Quest QR scanner</figcaption>
            </figure>

            <section>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-700">
                Morning Walk
              </p>

              <h1 className="text-lg font-black tracking-tight text-slate-950">
                Quest Scanner
              </h1>
            </section>
          </section>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close scanner"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition hover:scale-105 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Scanner content */}
        <main className="relative z-20 flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
          {/* Status */}
          <section
            aria-live="polite"
            className={[
              "relative z-30 mb-4 overflow-hidden rounded-2xl border p-4 shadow-lg backdrop-blur-xl transition-all duration-300",
              status === "success"
                ? "border-cyan-300 bg-cyan-50/95"
                : isError
                  ? "border-amber-200 bg-amber-50/95"
                  : "border-white/80 bg-white/85",
            ].join(" ")}
          >
            <header className="flex items-start gap-3">
              <figure
                className={[
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  status === "success"
                    ? "bg-cyan-500 text-white"
                    : isError
                      ? "bg-amber-100 text-amber-700"
                      : "bg-cyan-100 text-cyan-700",
                ].join(" ")}
              >
                {status === "loading" && (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                )}

                {status === "ready" && <ScanLine className="h-5 w-5" />}

                {status === "success" && <Check className="h-5 w-5" />}

                {isError && <CircleAlert className="h-5 w-5" />}

                <figcaption className="sr-only">Scanner status</figcaption>
              </figure>

              <section className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Scanner Status
                </p>

                <h2 className="mt-0.5 text-sm font-black text-slate-950">
                  {message.title}
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {message.description}
                </p>
              </section>
            </header>
          </section>

          {/* Camera portal */}
          <section className="relative min-h-0 flex-1 overflow-hidden rounded-[2rem] border-4 border-white/90 bg-slate-900 shadow-2xl shadow-cyan-950/20">
            <QRScanner
              paused={scannerPaused}
              onScan={handleScan}
              onReady={handleReady}
              onError={handleError}
            />

            {/* Camera tint */}
            <aside
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-cyan-950/25 via-transparent to-white/5"
            />

            {/* Scanner targeting frame */}
            <aside
              aria-hidden="true"
              className={[
                "pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border-2 transition-all duration-500 sm:h-60 sm:w-60",
                status === "success"
                  ? "scale-110 border-cyan-300 shadow-[0_0_50px_rgba(34,211,238,0.65)]"
                  : "border-cyan-300/90 shadow-[0_0_40px_rgba(34,211,238,0.35),0_0_0_999px_rgba(8,47,73,0.18)]",
              ].join(" ")}
            />

            {/* Inner scanning frame */}
            <aside
              aria-hidden="true"
              className={[
                "pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border transition-all duration-300 sm:h-52 sm:w-52",
                status === "success"
                  ? "border-cyan-200"
                  : "animate-pulse border-cyan-200/50",
              ].join(" ")}
            />

            {/* Scanning line */}
            {status === "ready" && (
              <aside
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-40 -translate-x-1/2 animate-pulse bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.9)] sm:w-48"
              />
            )}

            {/* Success overlay */}
            {status === "success" && (
              <aside
                aria-live="assertive"
                className="absolute inset-0 flex items-center justify-center bg-cyan-950/35 backdrop-blur-[2px]"
              >
                <section className="quest-enter mx-6 rounded-3xl border border-cyan-200/50 bg-slate-950/90 px-7 py-6 text-center text-white shadow-2xl">
                  <figure className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/30">
                    <Sparkles className="h-7 w-7" />

                    <figcaption className="sr-only">
                      Quest marker decoded
                    </figcaption>
                  </figure>

                  <h2 className="mt-4 text-xl font-black">Marker Decoded!</h2>

                  <p className="mt-1 text-sm text-slate-300">
                    Your quest answer has been revealed.
                  </p>
                </section>
              </aside>
            )}

            {/* Camera label */}
            <footer className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/80 to-transparent px-5 pb-5 pt-12">
              <p className="flex items-center justify-center gap-2 text-center text-xs font-bold text-white/90">
                <Camera className="h-4 w-4 text-cyan-300" />
                Align the QR marker inside the frame
              </p>
            </footer>
          </section>

          {/* Bottom instruction */}
          <footer className="relative z-30 pt-4">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Find • Scan • Discover • Advance
            </p>
          </footer>
        </main>
      </article>
    </dialog>
  );
}
