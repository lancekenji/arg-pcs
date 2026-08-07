import { MonitorX, Smartphone, WifiOff } from "lucide-react";

export default function MobileRequired() {
  return (
    <main className="min-h-dvh w-screen overflow-hidden bg-linear-to-br from-cyan-300 via-sky-400 to-blue-500 p-4 text-slate-950">
      <section className="mx-auto flex min-h-dvh w-full max-w-md items-center justify-center py-8">
        <article className="w-full rounded-3xl border-4 border-white/70 bg-white/90 p-6 text-center shadow-2xl backdrop-blur-md">
          <header className="flex flex-col items-center gap-4">
            <span className="grid h-20 w-20 place-items-center rounded-3xl bg-cyan-600 text-white shadow-xl">
              <MonitorX className="h-10 w-10" />
            </span>

            <section>
              <p className="text-xs font-black uppercase tracking-widest text-cyan-700">
                Morning Walk Quest
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight">
                Mobile Device Required
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This campus adventure uses your phone camera to scan QR
                markers. Please open the installed app on a mobile device.
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
    </main>
  );
}
