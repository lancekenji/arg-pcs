import { createFileRoute } from "@tanstack/react-router";
import { useSessionStore } from "../stores/session.store";
import { Trophy, Award } from "lucide-react";
import { requirePhase } from "../lib/router-guard";

export const Route = createFileRoute("/completed")({
  beforeLoad() {
    requirePhase("completed");
  },

  component: CompletedPage,
});

function CompletedPage() {
  const session = useSessionStore((state) => state.session);

  return (
    <main className="min-h-screen w-screen bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 animated-blue-gradient flex items-center justify-center p-6 relative">
      <article className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/50 text-center space-y-6 relative">
        <header className="flex flex-col items-center">
          <span className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <Trophy className="w-8 h-8" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Quest Complete
          </h1>
        </header>

        <section className="space-y-4">
          <p className="text-slate-700 text-base">
            Congratulations,
            <strong className="text-slate-900 font-semibold">
              {" "}
              {session?.name ?? "Explorer"}
            </strong>
            !
          </p>

          <blockquote className="bg-cyan-50/70 border border-cyan-200/60 p-4 rounded-xl text-cyan-900 text-sm flex items-center justify-center gap-2.5 shadow-xs m-0">
            <Award className="w-5 h-5 text-cyan-600 shrink-0" />
            <span>Return to the booth to receive your stamp.</span>
          </blockquote>
        </section>

        <footer className="pt-2 border-t border-slate-200/60 text-xs font-medium text-slate-500">
          Thank you for participating.
        </footer>
      </article>
    </main>
  );
}
