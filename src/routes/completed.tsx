import { createFileRoute } from "@tanstack/react-router";
import { useSessionStore } from "../stores/session.store";
import { Sparkles } from "lucide-react";
import FloatingLogos from "@/components/custom/FloatingLogos";
import { requirePhase } from "@/lib/router-guard";

export const Route = createFileRoute("/completed")({
  beforeLoad() {
    requirePhase("completed");
  },

  component: CompletedPage,
});

function CompletedPage() {
  const session = useSessionStore((state) => state.session);
  return (
    <main className="relative min-h-dvh rounded-md overflow-visible bg-linear-to-br from-cyan-50 via-white to-blue-50 px-4 py-8 text-slate-950">
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-visible"
      />{" "}
      <FloatingLogos transitionKey="completed" />
      <section className="relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-md items-center justify-center">
        <article className="relative w-full overflow-viisble p-6">
          <aside
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl"
          />
          <header className="relative flex flex-col items-center text-center">
            <section className="relative">
              <figure className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-linear-to-br from-cyan-400 to-blue-600 shadow-xl shadow-cyan-900/20">
                <img
                  src="/pcs-logo.png"
                  className="h-full w-full"
                  alt="PCS Logo"
                />
              </figure>
              <Sparkles className="absolute -right-3 -top-2 h-6 w-6 animate-bounce text-cyan-500" />
              <Sparkles className="absolute -bottom-1 -left-4 h-5 w-5 animate-pulse text-blue-500" />
            </section>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-cyan-700">
              Expedition Complete
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Quest Complete!
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              You made it through the entire journey.
            </p>
          </header>
          <section className="mt-7 relative rounded-2xl p-4 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">
              Explorer
            </p>
            <p className="mt-1 text-lg font-black text-slate-900">
              {session?.name ?? "Explorer"}
            </p>
            <img
              src="/gopher-peeking.png"
              className="absolute w-[30%] -rotate-12 -left-2 -z-10 -bottom-9 h-[60%]"
              alt="gopher peeking"
            />
            <img
              src="/docker.png"
              className="absolute w-[30%] rotate-12 -right-2 -z-10 -bottom-8 animate-spin h-[60%]"
              alt="docker spinning"
            />
          </section>
          <section className="mt-5 rounded-2xl border-2 border-dashed border-cyan-300 bg-white p-5 text-center shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-700">
              Final Step
            </p>
            <h2 className="mt-2 text-xl font-black text-slate-950">
              Return to the Booth
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Show this completion screen to our team and receive your stamp.
            </p>
          </section>
          <footer className="mt-6 border-t border-slate-200/70 pt-4 text-center">
            <p className="text-xs font-medium text-slate-500">
              Thank you for joining the Morning Walk Quest.
            </p>
            <p className="pixel-text mt-3 text-sm font-black uppercase tracking-wider text-slate-950 animate-slide-reveal whitespace-nowrap">
              CCT &#8212; Pixel & Code Society
            </p>
          </footer>
        </article>
      </section>
    </main>
  );
}
