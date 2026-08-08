import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useSessionStore } from "../stores/session.store";
import { getStory } from "../lib/story";
import { Trophy, BookOpen, Send, Sparkles } from "lucide-react";
import { requirePhase } from "../lib/router-guard";
import FloatingLogos from "@/components/custom/FloatingLogos";

export const Route = createFileRoute("/finish")({
  beforeLoad() {
    requirePhase("finish");
  },

  component: FinishPage,
});

function FinishPage() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const saveReflection = useSessionStore((state) => state.saveReflection);

  const [reflection, setReflection] = useState("");

  if (!session) {
    return (
      <main className="relative min-h-dvh w-full overflow-x-clip bg-slate-950 px-4 py-10">
        <section className="mx-auto flex min-h-[80dvh] w-full max-w-md items-center">
          <article className="w-full rounded-3xl border border-white/10 bg-white p-6 text-center shadow-2xl">
            <header>
              <Trophy className="mx-auto h-12 w-12 text-cyan-600" />

              <h1 className="mt-5 text-2xl font-black text-slate-950">
                No Active Session
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Please register or select a story to begin your expedition.
              </p>
            </header>

            <nav className="mt-6">
              <button
                type="button"
                onClick={() => navigate({ to: "/register" })}
                className="min-h-12 w-full rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-[0.98]"
              >
                Go to Register
              </button>
            </nav>
          </article>
        </section>
      </main>
    );
  }

  const story = getStory(session.storyId);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!reflection.trim()) {
      return;
    }

    saveReflection(reflection);

    navigate({
      to: "/completed",
    });
  }

  return (
    <main className="relative min-h-dvh w-full overflow-visible px-2 py-8 text-slate-950 sm:px-6 sm:py-10">
      <section className="relative mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-2xl flex-col justify-center">
        <FloatingLogos transitionKey="finish" />

        {/* HUD */}
        <header className="relative z-10 mb-4 flex items-center justify-between">
          <section
            aria-label="Game identity"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <figure className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-white/20 text-white shadow-lg shadow-cyan-950/30 backdrop-blur sm:h-11 sm:w-11">
              <img src="/pcs-logo.png" className="h-full w-full" />
            </figure>

            <section className="min-w-0">
              <p className="truncate text-[9px] font-black uppercase tracking-[0.1em] text-white sm:text-[10px] sm:tracking-[0.25em]">
                Morning Walk
              </p>
              <p className="truncate text-xs font-bold text-white">
                Expedition Complete
              </p>
            </section>
          </section>

          <aside className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/15 px-3 py-2 text-right backdrop-blur sm:px-4">
            <Trophy className="h-4 w-4 shrink-0 text-white" />
            <p className="text-[10px] font-black uppercase tracking-widest text-white sm:text-xs">
              Cleared
            </p>
          </aside>
        </header>

        {/* Main Panel */}
        <article className="relative z-10 flex flex-col rounded-[2rem] border border-white/60 bg-white shadow-2xl shadow-cyan-950/30">
          <aside
            aria-hidden="true"
            className="h-1.5 w-full rounded-t-[2rem] bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600"
          />

          <section className="flex flex-col p-5 sm:p-8">
            {/* Title */}
            <header className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-linear-to-br from-cyan-50 to-blue-50 p-5 shadow-inner sm:p-6">
              <aside
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl"
              />

              <section className="relative flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">
                <Sparkles className="h-3.5 w-3.5" />
                <p>Expedition Concluded</p>
              </section>

              <h1 className="relative mt-2 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                Journey Complete
              </h1>

              <p className="relative mt-1 text-sm font-bold text-cyan-800">
                {story.story_title}
              </p>
            </header>

            {/* Full story */}
            <section className="mt-6 rounded-3xl border -z-20 border-slate-200 bg-slate-50 p-5 sm:p-6">
              <header className="flex items-center gap-2 text-sm font-black text-slate-800">
                <BookOpen className="h-4 w-4 text-cyan-600" />
                <h2>Full Story Unlocked</h2>
              </header>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {story.full_story_after_completing_quest}
              </p>
            </section>

            {/* Reflection form */}
            <form onSubmit={handleSubmit} className="mt-6">
              <fieldset className="m-0 space-y-3 border-0 p-0 relative">
                <legend className="mb-1 text-sm font-black text-slate-950">
                  What did you learn from your journey?
                </legend>
                <img
                  src="/gopher-wondering.png"
                  className="absolute -top-11 bottom-0 animate-bounce -z-10 right-0 h-[12vh] w-[19vw]"
                  alt="gopher wondering"
                />
                <textarea
                  value={reflection}
                  onChange={(event) => setReflection(event.target.value)}
                  rows={4}
                  placeholder="Share your thoughts..."
                  className="w-full resize-none rounded-2xl z-50 border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-300 focus:bg-white focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </fieldset>

              <nav className="mt-4">
                <button
                  type="submit"
                  className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-cyan-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:translate-y-0 sm:text-base"
                >
                  <Send className="h-4 w-4 shrink-0" />
                  Complete Quest
                </button>
              </nav>
            </form>
          </section>

          {/* Footer */}
          <footer className="border-t border-slate-100 px-5 py-3 text-center sm:px-8">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">
              Pixel & Code Society • Campus Expedition
            </p>
          </footer>
        </article>
      </section>
    </main>
  );
}
