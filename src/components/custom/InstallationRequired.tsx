import { Download, HelpCircle, Share, Smartphone, WifiOff } from "lucide-react";

import { getMobileBrowser, isIOS } from "@/lib/pwaDetection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePWAInstall } from "@/hooks/usePWAInstall";

function InstallInstructions() {
  const ios = isIOS();
  const browser = getMobileBrowser();

  if (ios) {
    const needsSafari = browser !== "safari";

    return (
      <>
        <p>
          {needsSafari
            ? "This browser cannot install the quest on iPhone. Open this page in Safari first."
            : "Install the quest from Safari with these steps:"}
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          {needsSafari && <li>Tap the browser menu and choose <strong>Open in Safari</strong>.</li>}
          <li>Tap Safari&apos;s <strong>Share</strong> button.</li>
          <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
          <li>Tap <strong>Add</strong>, then launch <strong>Morning Walk Quest</strong> from your home screen.</li>
        </ol>
      </>
    );
  }

  if (browser === "firefox") {
    return (
      <>
        <p>Install the quest from Firefox with these steps:</p>
        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Tap Firefox&apos;s three-dot menu.</li>
          <li>Tap <strong>Install</strong> or <strong>Add to Home screen</strong>.</li>
          <li>Confirm, then open <strong>Morning Walk Quest</strong> from your home screen.</li>
        </ol>
      </>
    );
  }

  return (
    <>
      <p>Install the quest from your browser menu with these steps:</p>
      <ol className="list-decimal space-y-2 pl-5 text-slate-700">
        <li>Tap the three-dot browser menu.</li>
        <li>Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
        <li>Confirm the installation, then open <strong>Morning Walk Quest</strong> from your home screen.</li>
      </ol>
    </>
  );
}

export default function InstallationRequired() {
  const { canInstall, install } = usePWAInstall();

  const ios = isIOS();

  return (
    <main className="min-h-dvh w-screen overflow-hidden bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 animated-blue-gradient p-4 text-slate-950 relative">
      <section className="mx-auto flex min-h-dvh w-full max-w-md items-center justify-center py-12 relative z-10">
        <article className="w-full rounded-3xl border-4 border-white/70 bg-white/90 p-6 pt-14 text-center shadow-2xl backdrop-blur-md relative mt-6">
          {/* Overflowing Logo */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-white p-2 shadow-xl flex items-center justify-center overflow-hidden">
              <img
                src="/pcs-logo.png"
                alt="PCS Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <header className="flex flex-col items-center gap-4 mt-4">
            <section>
              <p className="text-xs font-black uppercase tracking-widest text-cyan-700">
                Morning Walk Quest
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight">
                Install Required
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Install the app, then open it from your home screen to begin
                your campus adventure.
              </p>
            </section>
          </header>

          <section className="mt-6 grid gap-3 text-left">
            <article className="flex gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
              <Download className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
              <p className="text-sm leading-6 text-slate-700">
                Use your browser menu to add the app to your home screen.
              </p>
            </article>

            <article className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
              <p className="text-sm leading-6 text-slate-700">
                After installation, the quest works offline during the event.
              </p>
            </article>

            <section className="mt-2">
              {canInstall && (
                <Button
                  onClick={install}
                  className="w-full rounded-2xl bg-cyan-600 py-6 text-base font-bold shadow-lg hover:bg-cyan-700 cursor-pointer transition-all"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Install Quest App
                </Button>
              )}

              {ios && (
                <article className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-left shadow-xs">
                  <header className="flex items-center gap-2 font-bold text-orange-700">
                    <Smartphone className="h-5 w-5 shrink-0" />
                    <span>iPhone Installation</span>
                  </header>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Tap the Share button in Safari, then choose:{" "}
                    <strong className="font-semibold text-slate-900">
                      Add to Home Screen
                    </strong>
                  </p>
                </article>
              )}

              <Dialog>
                <DialogTrigger
                  render={
                    <Button
                      variant="outline"
                      className="mt-3 w-full rounded-2xl border-slate-200 bg-white py-6 text-base font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    />
                  }
                >
                  <HelpCircle className="mr-2 h-5 w-5" />
                  How to install in this browser
                </DialogTrigger>

                <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-white p-6 text-sm leading-6 sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-black text-slate-900">
                      <Share className="h-5 w-5 text-cyan-700" />
                      Install Morning Walk Quest
                    </DialogTitle>
                    <DialogDescription className="pt-2 text-sm leading-6 text-slate-600">
                      <InstallInstructions />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </section>
          </section>
        </article>
      </section>
    </main>
  );
}
