import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useSessionStore } from "../stores/session.store";
import { useGame } from "../hooks/useGame";
import { validateAnswer } from "../lib/game";
import ProgressCard from "../components/custom/ProgressCard";
import RiddleCard from "../components/custom/RiddleCard";
import AnswerInput from "../components/custom/AnwerInput";
import ScannerPanel from "../components/custom/ScannerPanel";
import { QrCode, Compass } from "lucide-react";
import { useUIStore } from "../stores/ui.store";
import { requireQuest } from "../lib/router-guard";
import type { QRScanResult } from "../types/qr";

export const Route = createFileRoute("/quest")({
  beforeLoad() {
    requireQuest();
  },

  component: QuestPage,
});

function QuestPage() {
  const navigate = useNavigate();

  const game = useGame();

  const revealAnswer = useSessionStore((state) => state.revealAnswer);

  const completeStage = useSessionStore((state) => state.completeStage);
  const show = useUIStore((state) => state.show);
  const [scannerOpen, setScannerOpen] = useState(false);

  const [revealedAnswer, setRevealedAnswer] = useState<string | null>(null);

  if (!game) {
    return (
      <main className="min-h-screen w-screen bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 animated-blue-gradient flex items-center justify-center p-6 relative">
        <article className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/50 text-center">
          <header className="mb-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              No Active Quest Found
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

  const { session, story, quest, progress } = game;

  function handleScan(value: string): QRScanResult {
    const result = revealAnswer(value);

    if (!result.success) {
      return result;
    }

    setRevealedAnswer(quest.answer);

    return result;
  }

  function handleAnswer(answer: string) {
    const result = validateAnswer(session, answer);

    if (!result.success) {
      show({
        variant: "error",

        title: "Incorrect Answer",

        description: "The answer you entered doesn't match the revealed clue.",
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

      description: "A new riddle has appeared. Find a fresh QR marker.",
    });
  }

  return (
    <main className="min-h-dvh w-screen bg-linear-to-br from-cyan-300 via-sky-400 to-blue-500 animated-blue-gradient flex items-center justify-center px-4 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] relative">
      <article className="w-full max-w-xl rounded-3xl border border-white/50 bg-white/45 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-6">
        <header className="rounded-3xl border border-white/60 bg-white/85 p-5 shadow-lg shadow-cyan-950/10">
          <section className="flex items-center gap-2 text-cyan-700 font-black text-xs uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Active Expedition</span>
          </section>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">
            {story.story_title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Solve this clue, scan any unused campus marker, then enter the
            revealed answer.
          </p>
        </header>

        <section className="mt-4 space-y-4">
          <ProgressCard current={progress.current} total={progress.total} />

          <RiddleCard quest={quest} storyTitle={story.story_title} />

          {revealedAnswer && (
            <AnswerInput answer={revealedAnswer} onSubmit={handleAnswer} />
          )}

          {!revealedAnswer && (
            <nav className="pt-1">
              <button
                type="button"
                onClick={() => setScannerOpen(true)}
                className="min-h-14 w-full rounded-2xl bg-cyan-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <QrCode className="w-5 h-5" />
                Scan QR Marker
              </button>
            </nav>
          )}
        </section>
      </article>

      {scannerOpen && (
        <ScannerPanel
          onDetected={handleScan}
          onClose={() => setScannerOpen(false)}
        />
      )}
    </main>
  );
}
