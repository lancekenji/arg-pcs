import { Smartphone, WifiOff } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

export default function MobileRequired() {
  return (
    <AnimatedBackground className="flex items-center justify-center">
      <section className="mx-auto flex w-full max-w-md items-center justify-center py-6 relative z-10">
        <article className="w-full rounded-3xl border-4 border-white/70 bg-white/90 p-6 pt-14 pb-4 text-center shadow-2xl backdrop-blur-md relative mt-6 flex flex-col justify-between">
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

          <header className="flex flex-col items-center gap-4">
            <section>
              <p className="pixel-text mb-0 text-md font-black uppercase tracking-wider text-slate-950 animate-slide-reveal whitespace-nowrap">
                CCT &#8212; Pixel & Code Society
              </p>

              <p className="mt-3 text-xs font-black uppercase tracking-widest text-cyan-700">
                Morning Walk Quest
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight">
                Mobile Device Required
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This campus adventure uses your phone camera to scan QR markers.
                Please open the installed app on a mobile device.
              </p>
            </section>
          </header>

          <section className="mt-6 grid gap-3 text-left">
            <article className="flex gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
              <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
              <p className="text-sm leading-6 text-slate-700">
                Use Android or iOS so the scanner can access the rear camera.
              </p>
            </article>

            <article className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
              <p className="text-sm leading-6 text-slate-700">
                Once installed on your phone, the quest remains available
                offline during the event.
              </p>
            </article>
          </section>
        </article>
      </section>
    </AnimatedBackground>
  );
}
