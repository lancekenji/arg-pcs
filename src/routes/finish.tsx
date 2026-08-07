import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useSessionStore } from "../stores/session.store";
import { getStory } from "../lib/story";
import { Trophy, BookOpen, Send } from "lucide-react";
import { requirePhase } from "../lib/router-guard";

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
      <main className="min-h-screen w-screen bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 animated-blue-gradient flex items-center justify-center p-6 relative">
        <article className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/50 text-center">
          <header className="mb-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              No Active Session Found
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Please register or select a story to begin your expedition.
            </p>
          </header>
          <nav className="pt-2">
            <button
              type="button"
              onClick={() => navigate({ to: "/register" })}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Go to Register
            </button>
          </nav>
        </article>
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
    <main className="min-h-screen w-screen bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 animated-blue-gradient flex items-center justify-center p-6 relative">
      <article className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/50 relative space-y-6">
        <header className="border-b border-slate-200 pb-5">
          <section className="flex items-center gap-2 text-cyan-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>Expedition Concluded</span>
          </section>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Journey Complete
          </h1>
          <p className="text-sm font-medium text-slate-600 mt-1">
            {story.story_title}
          </p>
        </header>

        <section className="space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-200/60 shadow-xs">
          <header className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <BookOpen className="w-4 h-4 text-cyan-600" />
            <h2>Full Story Unlocked</h2>
          </header>
          <p className="leading-relaxed text-slate-700 text-sm sm:text-base">
            {story.full_story_after_completing_quest}
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset className="border-0 p-0 m-0 space-y-3">
            <legend className="font-semibold text-sm text-slate-800">
              What did you learn from your journey?
            </legend>

            <textarea
              value={reflection}
              onChange={(event) => setReflection(event.target.value)}
              rows={4}
              placeholder="Share your thoughts..."
              className="w-full rounded-lg border border-slate-300 bg-white/70 p-4 resize-none outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white text-slate-800 placeholder-slate-400 text-sm transition-all"
              required
            />
          </fieldset>

          <nav className="pt-2">
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Complete Quest
            </button>
          </nav>
        </form>
      </article>
    </main>
  );
}
