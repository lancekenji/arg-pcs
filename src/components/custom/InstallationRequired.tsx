import { Download, Smartphone, WifiOff } from "lucide-react";

import { isIOS } from "@/lib/pwaDetection";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/usePWAInstall";

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
            </section>
          </section>
        </article>
      </section>
    </main>
  );
}
