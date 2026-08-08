import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Compass, LockKeyhole, QrCode, Sparkles, Target } from "lucide-react";

import { useSessionStore } from "../stores/session.store";
import { useGame } from "../hooks/useGame";
import { validateAnswer } from "../lib/game";
import { useUIStore } from "../stores/ui.store";
import { requireQuest } from "../lib/router-guard";

import AnswerInput from "../components/custom/AnwerInput";
import ScannerPanel from "../components/custom/ScannerPanel";
import type { QRScanResult } from "../types/qr";
import FloatingLogos from "@/components/custom/FloatingLogos";

export const Route = createFileRoute("/quest")({
  beforeLoad() {
    requireQuest();
  },

  component: QuestPage,
});

function QuestPage() {
  const navigate = useNavigate();
  const game = useGame();

  const activeSession = useSessionStore((state) => state.session);

  const revealAnswer = useSessionStore((state) => state.revealAnswer);

  const completeStage = useSessionStore((state) => state.completeStage);

  const show = useUIStore((state) => state.show);

  const [scannerOpen, setScannerOpen] = useState(false);
  const [revealedAnswer, setRevealedAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (activeSession?.phase === "finish") {
      void navigate({ to: "/finish", replace: true });
    }
  }, [activeSession?.phase, navigate]);

  if (!game) {
    if (activeSession?.phase === "finish") {
      return null;
    }

    return (
      <main className="min-h-dvh bg-slate-950 px-4 py-10">
        <section className="mx-auto flex min-h-[80dvh] w-full max-w-md items-center">
          <article className="w-full rounded-3xl border border-white/10 bg-white p-6 text-center shadow-2xl">
            <header>
              <Compass className="mx-auto h-12 w-12 text-cyan-600" />

              <h1 className="mt-5 text-2xl font-black text-slate-950">
                No Active Quest
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your expedition session could not be found.
              </p>
            </header>

            <nav className="mt-6">
              <button
                type="button"
                onClick={() => navigate({ to: "/register" })}
                className="min-h-12 w-full rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-[0.98]"
              >
                Start New Expedition
              </button>
            </nav>
          </article>
        </section>
      </main>
    );
  }

  const { session, story, quest, progress } = game;

  const currentStage = session.currentStage + 1;
  const totalStages = progress.total;

  function handleScan(value: string): QRScanResult {
    const result = revealAnswer(value);

    if (!result.success) {
      return result;
    }

    setRevealedAnswer(quest.answer);
    setScannerOpen(false);

    return result;
  }

  function handleAnswer(answer: string) {
    const result = validateAnswer(session, answer);

    if (!result.success) {
      show({
        variant: "error",
        title: "Incorrect Answer",
        description: "That answer doesn't match the revealed clue. Try again.",
      });

      return;
    }

    const isFinalStage = session.currentStage === progress.total - 1;

    completeStage();
    setRevealedAnswer(null);

    if (isFinalStage) {
      navigate({
        to: "/finish",
      });

      return;
    }

    show({
      variant: "success",
      title: "Quest Advanced",
      description: "New objective unlocked. Find another QR marker.",
    });
  }

  return (
    <main className="relative min-h-dvh w-full overflow-visible px-2 text-slate-950 sm:px-6">
      {" "}
      <section className="relative mx-auto flex min-h-[calc(100dvh-2.5rem)] w-full max-w-lg flex-col">
        <FloatingLogos transitionKey={session.currentStage} />
        {/* HUD */}
        <header className="relative z-10 mb-4 flex items-center justify-between">
          <section
            aria-label="Game identity"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <figure className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-950/30 sm:h-11 sm:w-11">
              <img src="/pcs-logo.png" className="h-full w-full" />
            </figure>

            <section className="min-w-0">
              <p className="truncate text-[9px] font-black uppercase tracking-widest text-white sm:text-[10px] sm:tracking-[0.25em]">
                Morning Walk
              </p>
              <p className="truncate text-xs font-bold text-white">
                Expedition Active
              </p>
            </section>
          </section>

          <aside
            aria-label={`Quest ${currentStage} of ${totalStages}`}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-right backdrop-blur"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Quest
            </p>

            <p className="font-mono text-lg font-black text-white">
              {String(currentStage).padStart(2, "0")}
              <span className="px-1 text-cyan-400">/</span>
              {String(totalStages).padStart(2, "0")}
            </p>
          </aside>
        </header>

        {/* Main Game Panel */}
        <article className="relative z-10 flex flex-1 flex-col rounded-[2rem] border border-white/60 bg-white shadow-2xl shadow-cyan-950/30">
          {" "}
          {/* Decorative top bar */}
          <section className="flex flex-1 flex-col p-5 sm:p-7">
            {/* Story identity */}
            <header>
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">
                <Target className="h-3.5 w-3.5" />
                Current Mission
              </p>

              <h1 className="mt-2 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                {story.story_title}
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Solve the riddle, locate a campus marker, and unlock the hidden
                answer.
              </p>
            </header>

            {/* Progress */}
            <section aria-label="Quest progress" className="mt-6">
              <header className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Expedition Progress
                </p>

                <p className="font-mono text-xs font-black text-cyan-700">
                  {currentStage}/{totalStages}
                </p>
              </header>

              <progress
                value={currentStage}
                max={totalStages}
                className="h-2 w-full overflow-hidden rounded-full accent-cyan-500"
              />
            </section>

            {/* Objective */}
            <section className="mt-6">
              <article className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-linear-to-br from-cyan-50 to-blue-50 p-5 shadow-inner sm:p-6">
                <aside
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-300/20 blur-2xl"
                />

                <header className="relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">
                    Phase {String(currentStage).padStart(2, "0")}
                  </p>

                  <h2 className="mt-1 text-lg font-black text-slate-950">
                    Decode the clue
                  </h2>
                </header>

                <blockquote className="relative mt-5 border-l-4 border-cyan-400 pl-4 text-lg font-bold leading-7 text-slate-800 sm:text-xl sm:leading-8">
                  {quest.riddle}
                </blockquote>
              </article>
            </section>

            {/* Action area */}
            <section className="mt-auto pt-6">
              {!revealedAnswer ? (
                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <header className="flex items-start gap-3">
                    <figure className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-cyan-300">
                      <LockKeyhole className="h-5 w-5" />
                    </figure>

                    <section>
                      <h2 className="text-sm font-black text-slate-950">
                        Answer Locked
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Find any unused QR marker around the campus to reveal
                        your answer.
                      </p>
                    </section>
                  </header>

                  <button
                    type="button"
                    onClick={() => setScannerOpen(true)}
                    className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-4 py-4 text-sm font-black text-white shadow-xl shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:translate-y-0 sm:px-6 sm:text-base"
                  >
                    <QrCode className="h-5 w-5 shrink-0" />
                  </button>
                </article>
              ) : (
                <article className="relative overflow-hidden rounded-3xl border-2 border-cyan-300 bg-slate-950 p-5 text-white shadow-xl shadow-cyan-950/20 sm:p-6">
                  <aside
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl"
                  />

                  <header className="relative flex items-center gap-3">
                    <figure className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
                      <Sparkles className="h-5 w-5" />
                    </figure>

                    <section>
                      <p className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                        Marker Decoded
                      </p>

                      <h2 className="text-lg font-black">Answer Revealed</h2>
                    </section>
                  </header>

                  <output
                    aria-label="Revealed answer"
                    className="relative mt-5 block break-words rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center font-mono text-2xl font-black uppercase tracking-[0.08em] text-cyan-300 sm:text-3xl sm:tracking-[0.12em]"
                  >
                    {revealedAnswer}
                  </output>

                  <p className="relative mt-3 text-center text-xs text-slate-400">
                    Enter the answer below to unlock the next objective.
                  </p>

                  <section className="relative mt-4">
                    <AnswerInput
                      answer={revealedAnswer}
                      onSubmit={handleAnswer}
                    />
                  </section>
                </article>
              )}
            </section>
          </section>
          {/* Footer */}
          <footer className="border-t border-slate-100 px-5 py-3 text-center sm:px-7">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">
              Pixel & Code Society • Campus Expedition
            </p>
          </footer>
        </article>
      </section>
      {scannerOpen && (
        <ScannerPanel
          onDetected={handleScan}
          onClose={() => setScannerOpen(false)}
        />
      )}
    </main>
  );
}
