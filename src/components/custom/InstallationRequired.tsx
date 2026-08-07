import { Download, Smartphone, WifiOff } from "lucide-react";
import {
  Code,
  Cpu,
  Terminal,
  Shield,
  Database,
  CpuIcon,
  Binary,
  Workflow,
  Network,
  Braces,
  Command,
} from "lucide-react";

import { isIOS } from "@/lib/pwaDetection";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export default function InstallationRequired() {
  const { canInstall, install } = usePWAInstall();

  const ios = isIOS();

  return (
    <main className="min-h-dvh w-screen overflow-hidden bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 animated-blue-gradient p-4 text-slate-950 relative">
      {/* Floating & Corner-Traveling Tech Icons Animation Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <span className="absolute animate-[travelTopLeft_12s_ease-in-out_infinite] text-white">
          <Binary className="w-10 h-10" />
        </span>
        <span className="absolute animate-[travelTopRight_15s_ease-in-out_infinite] text-white">
          <Network className="w-12 h-12" />
        </span>
        <span className="absolute animate-[travelBottomLeft_14s_ease-in-out_infinite] text-white">
          <Workflow className="w-10 h-10" />
        </span>
        <span className="absolute animate-[travelBottomRight_16s_ease-in-out_infinite] text-white">
          <Command className="w-12 h-12" />
        </span>
        <span className="absolute top-[15%] left-[20%] animate-bounce duration-1000 text-white">
          <Code className="w-10 h-10" />
        </span>
        <span className="absolute top-[25%] right-[22%] animate-pulse text-white">
          <Terminal className="w-14 h-14" />
        </span>
        <span className="absolute bottom-[20%] left-[30%] animate-bounce text-white duration-700">
          <Cpu className="w-16 h-16" />
        </span>
        <span className="absolute bottom-[25%] right-[18%] animate-pulse text-white">
          <Shield className="w-12 h-12" />
        </span>
        <span className="absolute top-[45%] left-[8%] animate-bounce text-white duration-1000">
          <Database className="w-10 h-10" />
        </span>
        <span className="absolute top-[55%] right-[10%] animate-pulse text-white">
          <CpuIcon className="w-14 h-14" />
        </span>
        <span className="absolute top-[80%] left-[45%] animate-bounce text-white duration-900">
          <Braces className="w-10 h-10" />
        </span>
      </div>

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
